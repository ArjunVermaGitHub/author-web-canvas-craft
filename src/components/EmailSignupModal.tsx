
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
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
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

    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      if (data.status === 'exists') {
        toast({
          title: "Already Registered",
          description: "This email is already in our reading club.",
        });
      } else {
        toast({
          title: "Success!",
          description: "You've been added to our reading club mailing list.",
        });
      }
      
      setEmail('');
      setName('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error signing up:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again later.",
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
          <DialogTitle className="text-book-gold font-serif text-2xl">Join Our Mailing List</DialogTitle>
          <DialogDescription className="text-book-light/80">
            Enter your details to receive updates about new releases, author events, and exclusive content.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-book-light">Name</Label>
            <Input 
              id="name" 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="bg-book-medium/50 border-book-gold/30 text-book-light focus-visible:ring-book-gold"
              required
            />
          </div>

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
              {isSubmitting ? "Signing up..." : "Join Now"}
            </BookButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailSignupModal;
