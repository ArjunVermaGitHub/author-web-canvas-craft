
import React from 'react';
import { cn } from '@/lib/utils';

interface BookButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

const BookButton = ({ 
  variant = 'default', 
  className, 
  children, 
  ...props 
}: BookButtonProps) => {
  return (
    <button
      className={cn(
        "font-serif py-2 px-6 rounded-md transition-all duration-300 text-center inline-block",
        variant === 'default' 
          ? "bg-book-gold hover:bg-book-amber text-book-dark" 
          : "border-2 border-book-gold text-book-gold hover:bg-book-gold/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default BookButton;
