import React from 'react';
import { Bus } from 'lucide-react';

interface LogoProps {
  className?: string;
  showSlogan?: boolean;
  variant?: 'light' | 'dark'; // light = dark text, dark = light text
}

const Logo: React.FC<LogoProps> = ({ className = '', showSlogan = false, variant = 'light' }) => {
  const inTextColor = variant === 'light' ? 'text-black' : 'text-white';
  const sloganColor = variant === 'light' ? 'text-slate-800' : 'text-slate-300';
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Icon Container - White Circle with Black Border */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-3 bg-white rounded-full shadow-lg border-4 border-black overflow-hidden">
        {/* Using a filled bus icon to match the solid look in the image */}
        <div className="relative z-10">
             <Bus size={42} className="text-black" strokeWidth={1.5} fill="black" />
             {/* Small white details to simulate windows if needed, but outline+fill works well for glyph look */}
        </div>
      </div>
      
      {/* Text Branding */}
      <div className="text-center">
        <h1 className="text-2xl font-black uppercase tracking-tighter leading-none flex items-center gap-1.5 justify-center">
          <span className="text-[#FFC107]">BUS</span>
          <span className={inTextColor}>IN</span>
          <span className="text-[#FFC107]">TIME</span>
        </h1>
        {showSlogan && (
          <p className={`text-[0.65rem] font-bold mt-1.5 ${sloganColor} tracking-wide italic`}>
            "Tracking Safety, Inspiring Trust"
          </p>
        )}
      </div>
    </div>
  );
};

export default Logo;