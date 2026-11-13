import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import BookButton from './BookButton';
import { SAMPLE_CHAPTERS_URL } from '@/config/book';

const SampleSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
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
      const delivered = data.emailSent === true;
      setEmailSent(delivered);
      setSent(true);
      setEmail('');
      if (data.status === 'exists') {
        toast({
          title: 'Already registered',
          description: "You're on the list. The sample link is also available above.",
        });
      } else if (delivered) {
        toast({
          title: 'Check your inbox',
          description: 'The first two chapters are on their way.',
        });
      } else {
        toast({
          title: "You're on the list",
          description: 'The sample link is also available above.',
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
    <section id="sample" className="scroll-mt-20 bg-background band-section">
      <div className="site-container">
        <h2 className="page-heading">Read the first two chapters before you buy</h2>
        <p className="text-lg text-lapis/90 max-w-2xl mb-8">
          Enter your email and we will send the first two chapters today.
          We will also tell you when Book 2 is ready.
        </p>
        <p className="mb-8">
          <a
            href={SAMPLE_CHAPTERS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-carnelian font-semibold underline underline-offset-4 hover:text-lapis transition-colors min-h-[44px] inline-flex items-center"
          >
            Read the first two chapters free
          </a>
        </p>

        {sent ? (
          <p className="text-lg text-lapis border-l-4 border-carnelian pl-5 max-w-2xl">
            {emailSent
              ? "Check your inbox for the first two chapters. If they don't arrive in a few minutes, look in spam."
              : "You're on the list. The sample link is also available above."}
          </p>
        ) : (
          <>
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
              className="min-h-[44px] bg-card border-2 border-lapis/40 text-lapis placeholder:text-lapis/50"
            />
            <BookButton type="submit" disabled={isSubmitting} className="sm:shrink-0">
              {isSubmitting ? 'Sending…' : 'Send me the first two chapters'}
            </BookButton>
          </form>
          <p className="text-base text-lapis/80 max-w-xl mt-4">
            By signing up you agree to get the sample and occasional news about
            the books. Reply to any email to unsubscribe.
          </p>
          </>
        )}
      </div>
    </section>
  );
};

export default SampleSection;
