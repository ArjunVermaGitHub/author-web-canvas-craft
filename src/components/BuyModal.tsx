import React, { useState } from 'react';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import BookButton from './BookButton';
import phonepeQr from '@/assets/phonepe-qr.png.asset.json';
import { BOOK_TITLE, BOOK_PRICE, SHIPPING_PRICE, TOTAL_PRICE, PAYEE_NAME } from '@/config/book';

interface BuyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const orderSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  address: z.string().trim().min(10, 'Please enter your full address').max(300, 'Address is too long'),
  pincode: z.string().trim().regex(/^[1-9]\d{5}$/, 'Enter a valid 6-digit pincode'),
});

type Step = 'details' | 'payment' | 'done';

const BuyModal = ({ open, onOpenChange }: BuyModalProps) => {
  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const { toast } = useToast();

  const reset = () => {
    setStep('details');
    setName('');
    setPhone('');
    setAddress('');
    setPincode('');
    setOrderId('');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) reset();
    onOpenChange(open);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = orderSchema.safeParse({ name, phone, address, pincode });
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
        body: JSON.stringify({ name, phone, address, pincode, amount: TOTAL_PRICE }),
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

  const inputClass = 'bg-book-medium/50 border-book-gold/30 text-book-light focus-visible:ring-book-gold';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-book-dark border border-book-gold/20 max-h-[90vh] overflow-y-auto">
        {step === 'details' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-book-gold font-serif text-2xl">Order Your Copy</DialogTitle>
              <DialogDescription className="text-book-light/80">
                {BOOK_TITLE} — ₹{BOOK_PRICE} + ₹{SHIPPING_PRICE} shipping
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDetailsSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="buyer-name" className="text-book-light">Full Name</Label>
                <Input id="buyer-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputClass} required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-phone" className="text-book-light">Mobile Number</Label>
                <Input id="buyer-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" className={inputClass} required maxLength={10} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-address" className="text-book-light">Delivery Address</Label>
                <Textarea id="buyer-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House/flat, street, area, city, state" className={inputClass} required maxLength={300} rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-pincode" className="text-book-light">Pincode</Label>
                <Input id="buyer-pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="6-digit pincode" className={inputClass} required maxLength={6} />
              </div>
              <div className="flex justify-center pt-2">
                <BookButton type="submit">Continue to Payment</BookButton>
              </div>
            </form>
          </>
        )}

        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-book-gold font-serif text-2xl">Pay with PhonePe</DialogTitle>
              <DialogDescription className="text-book-light/80">
                Scan the QR with your PhonePe app and pay ₹{TOTAL_PRICE} to {PAYEE_NAME}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="bg-book-medium/40 rounded-lg p-4 text-book-light text-sm space-y-1">
                <div className="flex justify-between"><span>Book</span><span>₹{BOOK_PRICE}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>₹{SHIPPING_PRICE}</span></div>
                <div className="flex justify-between border-t border-book-gold/30 pt-2 font-serif text-book-gold text-base">
                  <span>Total</span><span>₹{TOTAL_PRICE}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <img src={phonepeQr.url} alt="PhonePe QR code" className="w-56 rounded-lg border border-book-gold/30 bg-white p-2" />
              </div>
              <p className="text-book-light/70 text-sm text-center">
                After paying, tap the button below so we can save your order and ship your book.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <BookButton variant="outline" onClick={() => setStep('details')} disabled={isSubmitting}>
                  Back
                </BookButton>
                <BookButton onClick={handlePaid} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving order...' : "I've Paid"}
                </BookButton>
              </div>
            </div>
          </>
        )}

        {step === 'done' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-book-gold font-serif text-2xl">Order Received!</DialogTitle>
              <DialogDescription className="text-book-light/80">
                Thank you, {name.split(' ')[0]}. Your order has been saved.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4 text-book-light">
              <p>
                We'll verify your payment of ₹{TOTAL_PRICE} on PhonePe and ship your copy of{' '}
                <span className="text-book-gold">{BOOK_TITLE}</span> to your address.
              </p>
              {orderId && (
                <p className="text-sm text-book-light/70">
                  Order reference: <span className="text-book-amber">{orderId}</span>
                </p>
              )}
              <div className="flex justify-center pt-2">
                <BookButton onClick={() => handleOpenChange(false)}>Done</BookButton>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BuyModal;
