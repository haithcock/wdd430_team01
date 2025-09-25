import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'w-26 h-12 bg-gradient-to-r from-[#FB923C] to-[#EF4444] text-white font-medium rounded-lg shadow hover:opacity-90 transition',
        className,
      )}
    >
      {children}
    </button>
  );
}