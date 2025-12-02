import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, ArrowRight, User, Shield, Briefcase } from 'lucide-react';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { Role } from '../types';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('parent');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      switch(selectedRole) {
          case 'admin':
              navigate('/admin/dashboard');
              break;
          case 'driver':
              navigate('/driver/dashboard');
              break;
          default:
              navigate('/dashboard');
              break;
      }
    }, 800);
  };

  const roles: { id: Role; label: string; icon: React.ReactNode }[] = [
      { id: 'parent', label: 'Parent', icon: <User size={18} /> },
      { id: 'driver', label: 'Driver', icon: <Bus size={18} /> },
      { id: 'admin', label: 'Admin', icon: <Shield size={18} /> },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#FFC107]">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden border-4 border-black relative">
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-black -mr-12 -mt-12 rotate-45"></div>

        <div className="pt-12 pb-8 px-8 sm:px-10">
          <Logo showSlogan className="mb-8" />

          <div className="mb-8 p-1 bg-gray-100 rounded-xl flex border border-gray-200">
              {roles.map(role => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-black uppercase tracking-wide rounded-lg transition-all ${
                        selectedRole === role.id 
                        ? 'bg-black text-[#FFC107] shadow-lg' 
                        : 'text-gray-400 hover:text-black'
                    }`}
                  >
                      {role.icon}
                      {role.label}
                  </button>
              ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-2 text-xs font-bold text-black uppercase tracking-wider">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === 'admin' ? 'admin@school.edu' : 'user@example.com'}
                className="w-full px-4 py-3.5 transition-all border-2 border-gray-200 outline-none rounded-xl focus:border-black focus:ring-0 text-black placeholder:text-gray-400 font-medium bg-gray-50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-bold text-black uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs font-bold text-gray-500 hover:text-black">Forgot Password?</a>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 transition-all border-2 border-gray-200 outline-none rounded-xl focus:border-black focus:ring-0 text-black placeholder:text-gray-400 font-medium bg-gray-50"
              />
            </div>

            <Button 
              type="submit" 
              fullWidth 
              size="lg" 
              variant="primary"
              disabled={isLoading}
              className="mt-6 shadow-xl py-4 text-lg"
            >
              {isLoading ? 'Signing In...' : 'Login Now'}
              {!isLoading && <ArrowRight size={20} className="ml-2" />}
            </Button>
          </form>
        </div>
        
        <div className="bg-gray-50 py-4 text-center border-t border-gray-100">
            <p className="text-xs font-medium text-gray-400">
                Protected by Google Cloud Security
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;