import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  icon,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Primary: Black background, Yellow text (High contrast)
    primary: "bg-black hover:bg-slate-800 text-yellow-400 focus:ring-black shadow-md border-2 border-transparent",
    // Secondary: Yellow background, Black text
    secondary: "bg-yellow-400 hover:bg-yellow-500 text-black focus:ring-yellow-400 shadow-md border-2 border-transparent",
    // Outline: Black border, Black text
    outline: "border-2 border-slate-900 bg-transparent hover:bg-yellow-50 text-slate-900 focus:ring-slate-900",
    // Ghost: Subtle hover
    ghost: "hover:bg-yellow-100 text-slate-900 hover:text-black",
    // Danger: Red background
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs uppercase tracking-wider",
    md: "px-5 py-2.5 text-sm uppercase tracking-wide",
    lg: "px-6 py-3.5 text-base uppercase tracking-wide",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;