import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
  highlight?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, noPadding = false, highlight = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden
        border-l-4 ${highlight ? 'border-l-yellow-400 border-r border-t border-b border-r-slate-200 border-t-slate-200 border-b-slate-200' : 'border-l-transparent border border-slate-200'}
        ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''} 
        ${className}
      `}
    >
      <div className={noPadding ? '' : 'p-5'}>
        {children}
      </div>
    </div>
  );
};

export default Card;