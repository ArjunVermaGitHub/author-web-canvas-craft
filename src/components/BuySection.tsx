import React, { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import BookButton from './BookButton';
import { BOOK_TITLE, BOOK_PRICE, SHIPPING_PRICE, TOTAL_PRICE, PAYEE_NAME } from '@/config/book';

const AMAZON_URL = 'https://amzn.in/d/0igsWonn';

const AMAZON_STORES: [string, string][] = [
  ['United States', 'https://www.amazon.com/dp/9358987448'],
  ['United Kingdom', 'https://www.amazon.co.uk/dp/9358987448'],
  ['Canada', 'https://www.amazon.ca/dp/9358987448'],
  ['Australia', 'https://www.amazon.com.au/dp/9358987448'],
  ['Germany', 'https://www.amazon.de/dp/9358987448'],
  ['France', 'https://www.amazon.fr/dp/9358987448'],
  ['Italy', 'https://www.amazon.it/dp/9358987448'],
  ['Spain', 'https://www.amazon.es/dp/9358987448'],
  ['Japan', 'https://www.amazon.co.jp/dp/9358987448'],
  ['Singapore', 'https://www.amazon.sg/dp/9358987448'],
  ['Netherlands', 'https://www.amazon.nl/dp/9358987448'],
  ['Sweden', 'https://www.amazon.se/dp/9358987448'],
  ['Poland', 'https://www.amazon.pl/dp/9358987448'],
  ['Belgium', 'https://www.amazon.com.be/dp/9358987448'],
];

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
  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const { toast } = useToast();

  const handleDetailsSubmit = (e: React.FormEvent) => {
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
    setStep('payment');
  };

  const handlePaid = async () => {
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
      setStep('done');
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
                  <BookButton type="submit" className="w-full sm:w-auto">
                    Continue to payment — ₹{TOTAL_PRICE}
                  </BookButton>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <div className="space-y-5">
                <div className="border border-ember/40 p-4 text-stonepage space-y-1">
                  <div className="flex justify-between"><span>Book</span><span>₹{BOOK_PRICE}</span></div>
                  <div className="flex justify-between"><span>Shipping within India</span><span>₹{SHIPPING_PRICE}</span></div>
                  <div className="flex justify-between border-t border-ember/40 pt-2 font-serif text-ember text-lg">
                    <span>Total</span><span>₹{TOTAL_PRICE}</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <img src="/phonepe-qr.png" alt={`PhonePe QR code for ${PAYEE_NAME}`} className="w-56 bg-stonepage p-2" />
                </div>
                <p className="text-stonepage/80 text-center">
                  Scan the QR with your PhonePe app and pay ₹{TOTAL_PRICE} to {PAYEE_NAME}.
                  Then tap the button below so we can save your order and ship your copy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <BookButton variant="outline-ember" onClick={() => setStep('details')} disabled={isSubmitting} className="flex-1">
                    Back
                  </BookButton>
                  <BookButton onClick={handlePaid} disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? 'Saving order…' : "I've paid on PhonePe"}
                  </BookButton>
                </div>
              </div>
            )}

            {step === 'done' && (
              <div className="space-y-4 border-l-4 border-ember pl-5">
                <h3 className="text-2xl font-serif text-ember">Order received</h3>
                <p>
                  Thank you, {name.split(' ')[0]}. We'll verify your payment of ₹{TOTAL_PRICE} on
                  PhonePe and ship your signed copy of {BOOK_TITLE} to your address.
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
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Order from Amazon India
            </BookButton>
            <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 border-t-2 border-ember/40 pt-4">
              {AMAZON_STORES.map(([country, url]) => (
                <li key={country}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
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
