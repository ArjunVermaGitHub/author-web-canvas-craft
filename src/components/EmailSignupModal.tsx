
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import BookButton from './BookButton';

interface EmailSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmailSignupModal = ({ open, onOpenChange }: EmailSignupModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock API call - in a real app, this would connect to your backend
      // Simulating API latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success handling
      toast({
        title: "Success!",
        description: "You've been added to our reading club mailing list.",
      });
      
      // Reset form and close modal
      setEmail('');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-book-dark border border-book-gold/20">
        <DialogHeader>
          <DialogTitle className="text-book-gold font-serif text-2xl">Join Our Reading Club</DialogTitle>
          <DialogDescription className="text-book-light/80">
            Enter your email to receive updates about new releases, author events, and exclusive content.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-book-light">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="bg-book-medium/50 border-book-gold/30 text-book-light focus-visible:ring-book-gold"
              required
            />
          </div>
          
          <div className="flex justify-center pt-2">
            <BookButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Join Reading Club"}
            </BookButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailSignupModal;
