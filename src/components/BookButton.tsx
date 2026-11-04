import React from 'react';
import { cn } from '@/lib/utils';

interface BookButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'outline-ember';
  href?: string;
  children: React.ReactNode;
}

const buttonStyles =
  'inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 font-sans font-semibold text-base rounded-none transition-colors duration-200 text-center disabled:opacity-60 disabled:cursor-not-allowed';

const variantStyles: Record<NonNullable<BookButtonProps['variant']>, string> = {
  primary: 'bg-carnelian text-white hover:bg-carnelian/85',
  outline: 'border-2 border-lapis text-lapis hover:bg-lapis hover:text-stonepage',
  'outline-ember': 'border-2 border-ember text-ember hover:bg-ember hover:text-lapis',
};

const BookButton = ({
  variant = 'primary',
  href,
  className,
  children,
  ...props
}: BookButtonProps) => {
  const classes = cn(buttonStyles, variantStyles[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default BookButton;
