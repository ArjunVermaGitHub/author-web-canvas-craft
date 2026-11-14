import React, { useRef, useState } from 'react';
import { z } from 'zod';
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

const inputClass =
  'bg-card border border-ember/40 text-stonepage placeholder:text-stonepage/50 focus-visible:ring-ember min-h-[44px]';

interface SignedCopyOrderFlowProps {
  placement?: string;
  paymentPlacement?: string;
}

const SignedCopyOrderFlow = ({ placement = 'buy', paymentPlacement = 'buy_payment' }: SignedCopyOrderFlowProps) => {
  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [payTapped, setPayTapped] = useState(false);
  const [razorpay, setRazorpay] = useState<RazorpayOrder | null>(null);
  const [paymentState, setPaymentState] = useState<'opening' | 'incomplete' | 'verifying' | 'confirmed'>('opening');
  const [paymentError, setPaymentError] = useState('');
  const paymentBusy = useRef(false);
  const confirmed = useRef(false);
  const submitBusy = useRef(false);
  const successfulPayment = useRef<RazorpayPayment | null>(null);
  const [isTouchDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  const { toast } = useToast();

  const upiLink = buildUpiPayLink(UPI_ID, PAYEE_NAME, TOTAL_PRICE, orderId);

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
      phone,
      address,
      pincode,
      message: message || undefined,
    });
    if (!result.success) {
      toast({
        title: 'Please check your details',
        description: result.error.issues[0].message,
        variant: 'destructive',
      });
      return;
    }
    submitBusy.current = true;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          pincode,
          message: message.trim() || undefined,
          amount: TOTAL_PRICE,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');
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
  <form onSubmit={handleDetailsSubmit} className="space-y-5">
    <div className="space-y-2">
      <Label htmlFor="buyer-name" className="text-stonepage">Full name</Label>
      <Input id="buyer-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputClass} required maxLength={100} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="buyer-email" className="text-stonepage">Email <span className="text-stonepage/60 text-base">(for order updates)</span></Label>
      <Input id="buyer-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="buyer-phone" className="text-stonepage">Mobile number</Label>
      <Input id="buyer-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" className={inputClass} required maxLength={10} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="buyer-address" className="text-stonepage">Delivery address</Label>
      <Textarea id="buyer-address" autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House/flat, street, area, city, state" className={inputClass} required maxLength={300} rows={3} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="buyer-pincode" className="text-stonepage">Pincode</Label>
      <Input id="buyer-pincode" inputMode="numeric" autoComplete="postal-code" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="6-digit pincode" className={inputClass} required maxLength={6} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="buyer-message" className="text-stonepage">
        Message from the author <span className="text-stonepage/60 text-base">(optional)</span>
      </Label>
      <Textarea id="buyer-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="A short note the author will handwrite inside your copy" className={inputClass} maxLength={200} rows={2} />
    </div>
    <div className="pt-2">
      <BookButton type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? 'Saving order…' : `Continue to payment — ₹${TOTAL_PRICE}`}
      </BookButton>
    </div>
  </form>
)}

{step === 'payment' && razorpay && (
  <div className="space-y-5" aria-live="polite">
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
  <div className="space-y-5">
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
      Thank you, {name.split(' ')[0]}. {razorpay ? `We've received your payment of ₹${TOTAL_PRICE} and will` : `We'll verify your payment of ₹${TOTAL_PRICE} and`}
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
