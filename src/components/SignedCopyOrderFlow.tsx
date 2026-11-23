import { afterInteraction, trackClarityEvent } from '@/lib/clarity';
import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { CreditCard, LockKeyhole, Truck } from 'lucide-react';
import { messageFromPrefill } from '@/lib/homeConversion';
import { CHECKOUT_FIELDS, mergePostalAddress, normalizeMobile, parsePostalLocation, type CheckoutField, type PostalLocation } from '@/lib/checkoutDetails';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import BookButton from './BookButton';
import { BOOK_TITLE, TOTAL_PRICE, PAYEE_NAME, UPI_ID } from '@/config/book';
import { trackPurchaseClick, trackOrderSaved } from '@/lib/purchase';
import { buildUpiPayLink } from '@/lib/upi';
import { loadRazorpay, trackConfirmedPurchase, type RazorpayOrder, type RazorpayPayment } from '@/lib/razorpayCheckout';

const orderSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  address: z.string().trim().min(10, 'Please enter your full address').max(300, 'Address is too long'),
  pincode: z.string().trim().regex(/^[1-9]\d{5}$/, 'Enter a valid 6-digit pincode'),
  message: z.string().trim().max(200, 'Message is too long (max 200 characters)').optional(),
});

type Step = 'details' | 'payment' | 'done';
const completedFields = new Set<string>();

const inputClass =
  'bg-card border border-ember/40 text-stonepage placeholder:text-stonepage/50 focus-visible:ring-ember min-h-[44px]';

interface SignedCopyOrderFlowProps {
  placement?: string;
  paymentPlacement?: string;
  initialMessage?: string;
}

const SignedCopyOrderFlow = ({ placement = 'buy', paymentPlacement = 'buy_payment', initialMessage }: SignedCopyOrderFlowProps) => {
  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState(initialMessage ?? '');
  const [messageExpanded, setMessageExpanded] = useState(Boolean(initialMessage));
  const [errors, setErrors] = useState<Partial<Record<CheckoutField, string>>>({});
  const [postalResult, setPostalResult] = useState<{ pin: string; location: PostalLocation } | null>(null);
  const location = postalResult?.pin === pincode ? postalResult.location : null;
  const formRef = useRef<HTMLFormElement>(null);
  const lastFieldTouched = useRef<CheckoutField>('phone');
  const submitted = useRef(false);
  const abandoned = useRef(false);
  const messageEdited = useRef(false);
  useEffect(() => {
    setMessage(current => messageFromPrefill(current, initialMessage, messageEdited.current));
  }, [initialMessage]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [payTapped, setPayTapped] = useState(false);
  const [razorpay, setRazorpay] = useState<RazorpayOrder | null>(null);
  const [paymentState, setPaymentState] = useState<'opening' | 'incomplete' | 'verifying' | 'confirmed'>('opening');
  const [paymentError, setPaymentError] = useState('');
  const paymentBusy = useRef(false);
  const confirmed = useRef(false);
  const submitBusy = useRef(false);
  const checkoutStarted = useRef(false);
  const successfulPayment = useRef<RazorpayPayment | null>(null);
  const [isTouchDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  const { toast } = useToast();

  const upiLink = buildUpiPayLink(UPI_ID, PAYEE_NAME, TOTAL_PRICE, orderId);

  useEffect(() => {
    setPostalResult(null);
    if (!/^[1-9]\d{5}$/.test(pincode)) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    void (async () => {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${encodeURIComponent(pincode)}`, { signal: controller.signal });
        if (!response.ok) return;
        const detected = parsePostalLocation(await response.json());
        if (detected && !controller.signal.aborted) setPostalResult({ pin: pincode, location: detected });
      } catch { /* Delivery details can always be entered manually. */ }
      finally { window.clearTimeout(timeout); }
    })();
    return () => { controller.abort(); window.clearTimeout(timeout); };
  }, [pincode]);

  useEffect(() => {
    const abandon = () => {
      if (!checkoutStarted.current || submitted.current || abandoned.current) return;
      abandoned.current = true;
      trackPurchaseClick('CheckoutAbandon', `${placement}_${lastFieldTouched.current}`);
    };
    const onVisibility = () => { if (document.visibilityState === 'hidden') abandon(); };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', abandon);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', abandon);
    };
  }, [placement]);

  const markFieldDone = (field: CheckoutField) => {
    const key = `rk-checkout-field:${field}`;
    if (completedFields.has(key)) return;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch { /* In-memory guard remains available when storage is disabled. */ }
    completedFields.add(key);
    trackPurchaseClick('CheckoutFieldDone', `${placement}_${field}`);
  };

  const validateField = (field: CheckoutField, value: string, showError: boolean) => {
    const normalized = field === 'phone' ? normalizeMobile(value) : field === 'address' ? mergePostalAddress(value, location) : value;
    const parsed = orderSchema.shape[field].safeParse(normalized);
    if (showError) setErrors(current => ({ ...current, [field]: parsed.success ? undefined : parsed.error.issues[0]?.message }));
    if (parsed.success && value.trim()) markFieldDone(field);
  };

  const fieldProps = (field: CheckoutField, value: string) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `buyer-${field}-error` : undefined,
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Let submit validate atomically so removing an error cannot move the button between pointer-down and click.
      if (event.relatedTarget instanceof HTMLButtonElement && event.relatedTarget.type === 'submit') return;
      validateField(field, value, true);
    },
  });
  const fieldError = (field: CheckoutField) => errors[field] && (
    <p id={`buyer-${field}-error`} className="text-destructive text-sm" aria-live="polite">{errors[field]}</p>
  );

  const handleCheckoutStarted = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) || target.readOnly) return;
    const field = CHECKOUT_FIELDS.find(item => target.id === `buyer-${item}`);
    if (!field) return;
    lastFieldTouched.current = field;
    if (event.type === 'input') validateField(field, target.value, false);
    if (checkoutStarted.current) return;
    checkoutStarted.current = true;
    trackPurchaseClick('CheckoutStarted', placement);
  };

  const handlePayTap = () => {
    setPayTapped(true);
    trackPurchaseClick('UpiAppClick', paymentPlacement);
  };

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      toast({ title: 'UPI ID copied', description: UPI_ID });
    } catch {
      toast({ title: 'Could not copy', description: `Please note the UPI ID: ${UPI_ID}`, variant: 'destructive' });
    }
  };

  const verifyPayment = async (payment: RazorpayPayment, reference: string) => {
    if (confirmed.current) return;
    paymentBusy.current = true;
    successfulPayment.current = payment;
    setPaymentState('verifying');
    setPaymentError('');
    try {
      const response = await fetch('/api/razorpay-verify', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payment),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'Could not confirm payment. Please try again.');
      confirmed.current = true;
      setPaymentState('confirmed');
      trackConfirmedPurchase(reference, TOTAL_PRICE, BOOK_TITLE);
      setStep('done');
    } catch (error) {
      setPaymentState('incomplete');
      setPaymentError(error instanceof Error ? error.message : 'Could not confirm payment. Please try again.');
    } finally {
      paymentBusy.current = false;
    }
  };

  const openCheckout = async (paymentOrder: RazorpayOrder, reference: string) => {
    if (paymentBusy.current || confirmed.current) return;
    // If money was authorized/captured, retry verification rather than charging again.
    if (successfulPayment.current) return verifyPayment(successfulPayment.current, reference);
    paymentBusy.current = true;
    setPaymentState('opening');
    setPaymentError('');
    const incomplete = () => {
      if (confirmed.current || successfulPayment.current) return;
      paymentBusy.current = false;
      setPaymentState('incomplete');
    };
    try {
      await loadRazorpay();
      const Checkout = window.Razorpay;
      if (!Checkout) throw new Error('Payment not completed');
      const checkout = new Checkout({
        key: paymentOrder.keyId, order_id: paymentOrder.orderId, amount: paymentOrder.amount, currency: 'INR',
        name: 'Raghav Kartikeya', description: `Signed copy — ${BOOK_TITLE}`,
        prefill: { name: name.trim(), email: email.trim(), contact: phone.trim() },
        theme: { color: '#e07a30' },
        handler: payment => { void verifyPayment(payment, reference); },
        modal: { ondismiss: incomplete },
      });
      checkout.on('payment.failed', incomplete);
      checkout.open();
      afterInteraction(() => trackClarityEvent('checkout_started'));
    } catch {
      incomplete();
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitBusy.current) return;
    const result = orderSchema.safeParse({
      name,
      email,
      phone: normalizeMobile(phone),
      address: mergePostalAddress(address, location),
      pincode,
      message: message || undefined,
    });
    if (!result.success) {
      const nextErrors: Partial<Record<CheckoutField, string>> = {};
      for (const issue of result.error.issues) {
        const field = CHECKOUT_FIELDS.find(item => item === issue.path[0]);
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      const firstInvalid = CHECKOUT_FIELDS.find(field => nextErrors[field]);
      if (firstInvalid) {
        trackPurchaseClick('CheckoutError', `${placement}_${firstInvalid}`);
        const input = formRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#buyer-${firstInvalid}`);
        input?.scrollIntoView({ block: 'center', behavior: 'auto' });
        input?.focus({ preventScroll: true });
      }
      return;
    }
    setErrors({});
    for (const field of CHECKOUT_FIELDS) { if (result.data[field]?.trim()) markFieldDone(field); }
    submitBusy.current = true;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          address: result.data.address,
          pincode: result.data.pincode,
          message: result.data.message || undefined,
          amount: TOTAL_PRICE,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');
      submitted.current = true;
      setOrderId(data.orderId || '');
      trackOrderSaved(placement, TOTAL_PRICE, data.orderId || undefined);
      setStep('payment');
      if (data.razorpay) {
        setRazorpay(data.razorpay);
        void openCheckout(data.razorpay, data.orderId);
      }
    } catch (error) {
      toast({
        title: 'Could not save your order',
        description:
          error instanceof Error
            ? error.message
            : 'Please try again. If you have already paid, contact us with your payment screenshot.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      submitBusy.current = false;
    }
  };

  return (
    <>
{step === 'details' && (
  <form ref={formRef} noValidate onSubmit={handleDetailsSubmit} onFocusCapture={handleCheckoutStarted} onInputCapture={handleCheckoutStarted} className="space-y-4 min-w-0">
    <div className="space-y-2">
      <Label htmlFor="buyer-phone" className="text-stonepage">{placement === 'home' ? 'Mobile (for delivery updates on WhatsApp)' : 'Mobile number'}</Label>
      <Input id="buyer-phone" type="tel" inputMode="numeric" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" className={inputClass} required maxLength={24} {...fieldProps('phone', phone)} />
      {fieldError('phone')}
    </div>
    <div className="space-y-2">
      <Label htmlFor="buyer-name" className="text-stonepage">Full name</Label>
      <Input id="buyer-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputClass} required maxLength={100} {...fieldProps('name', name)} />
      {fieldError('name')}
    </div>
    <div className="space-y-2">
      <Label htmlFor="buyer-email" className="text-stonepage">Email (for your receipt)</Label>
      <Input id="buyer-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} required {...fieldProps('email', email)} />
      {fieldError('email')}
    </div>
    <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3">
      <div className="space-y-2 min-w-0">
        <Label htmlFor="buyer-pincode" className="text-stonepage">Pincode</Label>
        <Input id="buyer-pincode" inputMode="numeric" autoComplete="postal-code" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="6-digit pincode" className={inputClass} required maxLength={6} {...fieldProps('pincode', pincode)} />
        {fieldError('pincode')}
      </div>
      <div className="space-y-2 min-w-0">
        <Label htmlFor="buyer-city" className="text-stonepage">City, State</Label>
        <div className="relative">
          <Textarea id="buyer-city" readOnly tabIndex={-1} rows={2} value={location ? `✓ ${location.district}, ${location.state}` : ''} aria-live="polite" className={`${inputClass} resize-none text-sm leading-5 min-h-[44px] py-1`} />
        </div>
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="buyer-address" className="text-stonepage">House / flat, street, area</Label>
      <Textarea id="buyer-address" autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Flat 4B, Sea View Apts, Linking Road, Bandra West" className={inputClass} required maxLength={300} rows={2} {...fieldProps('address', address)} />
      {fieldError('address')}
    </div>
    {messageExpanded || Boolean(message) || Boolean(initialMessage) ? <div className="space-y-2">
      <Label htmlFor="buyer-message" className="text-stonepage">
        Message from the author <span className="text-stonepage/60 text-base">(optional)</span>
      </Label>
      <Textarea id="buyer-message" value={message} onChange={(e) => { messageEdited.current = true; setMessage(e.target.value); }} placeholder="A short note the author will handwrite inside your copy" className={inputClass} maxLength={200} rows={2} {...fieldProps('message', message)} />
      {fieldError('message')}
    </div> : <BookButton type="button" variant="outline" className="border-0 px-0 py-1 justify-start text-left text-sm font-normal" aria-expanded={false} aria-controls="buyer-message" onClick={() => setMessageExpanded(true)}>+ Add a message for the author to handwrite (optional)</BookButton>}
    <div className="pt-2 space-y-3">
      <p className="text-xs text-secondary leading-5">
        <LockKeyhole size={13} className="inline-block align-text-bottom mr-1" aria-hidden="true" />Secure payment by Razorpay · <CreditCard size={13} className="inline-block align-text-bottom mr-1" aria-hidden="true" />UPI / GPay / PhonePe / cards · <Truck size={13} className="inline-block align-text-bottom mr-1" aria-hidden="true" />Delivered in 5 days
      </p>
      <BookButton type="submit" className={placement === 'home' ? 'w-full min-h-12 gap-2' : 'w-full sm:w-auto'} disabled={isSubmitting}>
        {placement === 'home' && <LockKeyhole size={18} aria-hidden="true" />}
        {isSubmitting ? 'Saving order…' : placement === 'home' ? `Pay ₹${TOTAL_PRICE} securely` : `Continue to payment — ₹${TOTAL_PRICE}`}
      </BookButton>
    </div>
  </form>
)}

{step === 'payment' && razorpay && (
  <div data-checkout-step="payment" className="space-y-5" aria-live="polite">
    <p>Pay securely by UPI, card or netbanking via Razorpay</p>
    <div className="border-l-4 border-ember pl-4">
      <p>Your Order ID</p><p className="font-serif text-3xl text-ember tracking-wide">{orderId}</p>
    </div>
    <p>Total: ₹{TOTAL_PRICE}</p>
    {paymentState === 'incomplete' ? (
      <><h3 className="font-serif text-2xl">Payment not completed</h3>
        {paymentError && <p role="alert">{paymentError}</p>}
        <BookButton onClick={() => void openCheckout(razorpay, orderId)}>Try payment again</BookButton>
      </>
    ) : <p>{paymentState === 'verifying' ? 'Confirming payment…' : 'Opening secure checkout…'}</p>}
  </div>
)}

{step === 'payment' && !razorpay && (
  <div data-checkout-step="payment" className="space-y-5">
    {orderId && (
      <div className="border-l-4 border-ember pl-4">
        <p className="text-stonepage/80 text-base">Your Order ID</p>
        <p className="font-serif text-3xl text-ember tracking-wide">{orderId}</p>
        <p className="font-semibold">Please write this Order ID in the payment note (remarks) of your UPI app</p>
      </div>
    )}
    <div className="border border-ember/40 p-4 text-stonepage">
      <div className="flex justify-between font-serif text-ember text-lg">
        <span>Total</span><span>₹{TOTAL_PRICE}</span>
      </div>
    </div>
    {isTouchDevice && (
      <div className="space-y-2">
        <BookButton href={upiLink} onClick={handlePayTap} className="w-full">
          Pay ₹{TOTAL_PRICE} with any UPI app
        </BookButton>
        {payTapped && (
          <p className="text-stonepage/80 text-center">
            After paying in your UPI app, come back here and tap 'I've paid'.
          </p>
        )}
      </div>
    )}
    <div className="flex justify-center">
      <img src="/phonepe-qr.png" alt={`PhonePe QR code for ${PAYEE_NAME}`} className="w-56 bg-background p-2" />
    </div>
    <p className="text-stonepage/80 text-center">
      {isTouchDevice ? (
        <>
          Paying from another phone or device? Scan this QR with any UPI app and pay
          ₹{TOTAL_PRICE} to {PAYEE_NAME}. Then tap the button below so we can verify your
          payment and ship your copy.
        </>
      ) : (
        <>
          Scan this QR with any UPI app (PhonePe, Google Pay, Paytm or your bank's app)
          and pay ₹{TOTAL_PRICE} to {PAYEE_NAME}. Then tap the button below so we can
          verify your payment and ship your copy.
        </>
      )}
    </p>
    {isTouchDevice && (
      <div className="space-y-2 text-center">
        <p className="text-stonepage/80">
          No UPI app opens? Scan this QR from another device, or pay ₹{TOTAL_PRICE} to {UPI_ID}.
        </p>
        <BookButton variant="outline-ember" onClick={handleCopyUpiId} className="min-h-[44px]">
          Copy UPI ID
        </BookButton>
      </div>
    )}
    <div className="flex flex-col sm:flex-row gap-3">
      <BookButton onClick={() => setStep('done')} className="flex-1">
        I've paid
      </BookButton>
    </div>
  </div>
)}

{step === 'done' && (
  <div className="space-y-4 border-l-4 border-ember pl-5">
    <h3 className="text-2xl font-serif text-ember">Order received</h3>
    <p>
      Thank you, {name.split(' ')[0]}. {razorpay ? `We've received your payment of ₹${TOTAL_PRICE} and will` : `We'll verify your payment of ₹${TOTAL_PRICE} and`}{' '}
      ship your signed copy of {BOOK_TITLE} to your address.
    </p>
    {orderId && (
      <p className="text-stonepage/80 text-base">
        Order reference: <span className="text-ember font-semibold">{orderId}</span>
      </p>
    )}
  </div>
)}
    </>
  );
};

export default SignedCopyOrderFlow;
