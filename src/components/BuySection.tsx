import React, { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import BookButton from './BookButton';
import { BOOK_TITLE, TOTAL_PRICE, PAYEE_NAME, UPI_ID } from '@/config/book';
import { AMAZON_STORES } from '@/config/amazon';
import { getBrowserAmazonStore, selectEbookUrl, trackPurchaseClick, trackOrderSaved } from '@/lib/purchase';
import { buildUpiPayLink } from '@/lib/upi';

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
  'bg-white/5 border border-ember/40 text-stonepage placeholder:text-stonepage/50 focus-visible:ring-ember min-h-[44px]';

const BuySection = () => {
  const [amazon] = useState(getBrowserAmazonStore);
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
  const [isTouchDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  const { toast } = useToast();

  const upiLink = buildUpiPayLink(UPI_ID, PAYEE_NAME, TOTAL_PRICE, orderId);

  const handlePayTap = () => {
    setPayTapped(true);
    trackPurchaseClick('UpiAppClick', 'buy_payment');
  };

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      toast({ title: 'UPI ID copied', description: UPI_ID });
    } catch {
      toast({ title: 'Could not copy', description: `Please note the UPI ID: ${UPI_ID}`, variant: 'destructive' });
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      trackOrderSaved('buy', TOTAL_PRICE, data.orderId || undefined);
      setStep('payment');
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
    }
  };

  return (
    <section id="buy" className="scroll-mt-20 bg-lapis text-stonepage band-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="band-heading">Order a signed copy</h2>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-14">
          <div>
            {step === 'details' && (
              <form onSubmit={handleDetailsSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="buyer-name" className="text-stonepage">Full name</Label>
                  <Input id="buyer-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputClass} required maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyer-email" className="text-stonepage">Email <span className="text-stonepage/60 text-base">(for order updates)</span></Label>
                  <Input id="buyer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyer-phone" className="text-stonepage">Mobile number</Label>
                  <Input id="buyer-phone" type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" className={inputClass} required maxLength={10} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyer-address" className="text-stonepage">Delivery address</Label>
                  <Textarea id="buyer-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House/flat, street, area, city, state" className={inputClass} required maxLength={300} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyer-pincode" className="text-stonepage">Pincode</Label>
                  <Input id="buyer-pincode" inputMode="numeric" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="6-digit pincode" className={inputClass} required maxLength={6} />
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

            {step === 'payment' && (
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
                  <img src="/phonepe-qr.png" alt={`PhonePe QR code for ${PAYEE_NAME}`} className="w-56 bg-stonepage p-2" />
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
                  Thank you, {name.split(' ')[0]}. We'll verify your payment of ₹{TOTAL_PRICE} and
                  ship your signed copy of {BOOK_TITLE} to your address.
                </p>
                {orderId && (
                  <p className="text-stonepage/80 text-base">
                    Order reference: <span className="text-ember font-semibold">{orderId}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="lg:border-l-2 lg:border-ember/40 lg:pl-16">
            <h3 className="text-2xl md:text-3xl font-serif text-ember mb-4">
              Prefer a bookstore?
            </h3>
            <p className="text-lg leading-relaxed text-stonepage/90 mb-8">
              Print copies are stocked at Sapna Book House, Gangarams,
              Higginbothams and The Bookworm in several major Indian cities.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif text-ember mb-4">
              Outside India
            </h3>
            <p className="text-lg leading-relaxed text-stonepage/90 mb-6">
              Order on Amazon in 15 countries, including the US, UK, Canada,
              Australia, Germany and Japan.
            </p>
            <BookButton
              variant="outline-ember"
              href={amazon.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPurchaseClick('AmazonClick', 'buy', amazon.store)}
            >
              Order from Amazon India
            </BookButton>
            <a
              href={selectEbookUrl(amazon.store)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackPurchaseClick('EbookClick', 'buy', amazon.store === 'India' ? undefined : amazon.store)}
              className="mt-3 flex w-fit items-center min-h-[44px] text-ember underline underline-offset-4 hover:text-stonepage focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
            >
              Buy the ebook
            </a>
            <p className="mt-3 text-stonepage/60 text-base">
              As an Amazon Associate I earn from qualifying purchases.
            </p>
            <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 border-t-2 border-ember/40 pt-4">
              {AMAZON_STORES.map(([country, url]) => (
                <li key={country}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPurchaseClick('AmazonClick', 'country_list', country)}
                    className="inline-flex items-center min-h-[44px] text-ember underline underline-offset-4 hover:text-stonepage focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                  >
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuySection;
