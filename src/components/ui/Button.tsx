import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  
  return (
    <button className={`btn ${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
