import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import BookButton from './BookButton';

const SampleSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');
      setSent(true);
      setEmail('');
      if (data.status === 'exists') {
        toast({
          title: 'Already registered',
          description: 'Chapter One is on its way to this email.',
        });
      } else {
        toast({
          title: 'Check your inbox',
          description: 'Chapter One, Little Yama, is on its way.',
        });
      }
    } catch (error) {
      toast({
        title: 'Could not sign you up',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="sample" className="scroll-mt-20 bg-stonepage band-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="page-heading">Read Chapter One before you buy</h2>
        <p className="text-lg text-lapis/90 max-w-2xl mb-8">
          Enter your email and we will send Chapter One, “Little Yama”, today.
          We will also tell you when Book 2 is ready.
        </p>

        {sent ? (
          <p className="text-lg text-lapis border-l-4 border-carnelian pl-5 max-w-2xl">
            It's on its way — check your inbox for Chapter One. If it doesn't
            arrive in a few minutes, look in spam or try again.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <label htmlFor="sample-email" className="sr-only">
              Email address
            </label>
            <Input
              id="sample-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="min-h-[44px] bg-white/60 border-2 border-lapis/40 text-lapis placeholder:text-lapis/50"
            />
            <BookButton type="submit" disabled={isSubmitting} className="sm:shrink-0">
              {isSubmitting ? 'Sending…' : 'Send me Chapter One'}
            </BookButton>
          </form>
        )}
      </div>
    </section>
  );
};

export default SampleSection;
