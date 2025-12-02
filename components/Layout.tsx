import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, MapPin, Bell, LogOut, Users, Bus, UserCog, LayoutDashboard, Route as RouteIcon, ShieldAlert } from 'lucide-react';
import { Role } from '../types';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentRole = (): Role => {
      if (location.pathname.startsWith('/admin')) return 'admin';
      if (location.pathname.startsWith('/driver')) return 'driver';
      return 'parent';
  };

  const role = getCurrentRole();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    navigate('/login');
  };

  // Menu Definitions
  const parentItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { label: 'Notifications', icon: <Bell size={20} />, path: '/notifications' },
  ];

  const adminItems = [
    { label: 'Monitor', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { label: 'Drivers', icon: <UserCog size={20} />, path: '/admin/drivers' },
    { label: 'Parents', icon: <Users size={20} />, path: '/admin/parents' },
    { label: 'Fleet & Routes', icon: <Bus size={20} />, path: '/admin/fleet' },
  ];

  const driverItems = [
    { label: 'My Route', icon: <RouteIcon size={20} />, path: '/driver/dashboard' },
    { label: 'Notifications', icon: <Bell size={20} />, path: '/notifications' },
  ];

  const getMenuItems = () => {
      switch(role) {
          case 'admin': return adminItems;
          case 'driver': return driverItems;
          default: return parentItems;
      }
  };

  const getUserProfile = () => {
      switch(role) {
          case 'admin': return { name: 'School Admin', role: 'Administrator', img: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin' };
          case 'driver': return { name: 'Manjunath', role: 'Bus Driver', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manju' };
          default: return { name: 'Ravi Kumar', role: 'Parent', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi' };
      }
  };

  const user = getUserProfile();

  const getPageTitle = () => {
    if (location.pathname.includes('/admin/dashboard')) return 'School Monitor';
    if (location.pathname.includes('/admin/drivers')) return 'Drivers';
    if (location.pathname.includes('/admin/parents')) return 'Parents';
    if (location.pathname.includes('/admin/fleet')) return 'Fleet';
    if (location.pathname.includes('/driver/dashboard')) return 'My Trip';
    if (location.pathname.includes('dashboard')) return 'My Children';
    if (location.pathname.includes('map')) return 'Live Tracking';
    if (location.pathname.includes('status')) return 'Trip Status';
    if (location.pathname.includes('notifications')) return 'Alerts';
    return 'Bus In Time';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-[#FFC107] border-b-2 border-black shadow-sm md:hidden">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="p-2 -ml-2 text-black rounded-lg hover:bg-black/10">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-black text-black uppercase tracking-tight">{getPageTitle()}</h1>
        </div>
        <div className="w-8 h-8 overflow-hidden border-2 border-black rounded-full bg-white">
             <img src={user.img} alt="Profile" />
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - BLACK BACKGROUND */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white border-r-2 border-black shadow-2xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shadow-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-center pt-8 pb-6 border-b border-gray-800">
             <Logo variant="dark" />
             <button onClick={closeSidebar} className="absolute top-4 right-4 text-gray-500 md:hidden hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* User Profile Summary */}
          <div className="px-6 py-6 border-b border-gray-800 bg-gray-900/50">
            <div className="flex items-center gap-3">
              <img 
                src={user.img} 
                alt="Profile" 
                className="w-10 h-10 border-2 border-[#FFC107] rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-white">{user.name}</p>
                <p className="text-xs truncate text-[#FFC107] font-medium uppercase tracking-wide">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Main Menu</p>
            {getMenuItems().map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#FFC107] text-black shadow-lg shadow-yellow-900/20'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}

            {role === 'driver' && (
                <div className="mt-8 px-4">
                    <button className="w-full flex items-center justify-center gap-2 bg-red-600 text-white p-4 rounded-xl font-bold hover:bg-red-700 shadow-lg active:scale-95 transition-all animate-pulse">
                        <ShieldAlert size={20} />
                        SOS EMERGENCY
                    </button>
                </div>
            )}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-800 bg-black">
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-bold text-gray-400 transition-colors rounded-xl hover:bg-gray-800 hover:text-white"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto pt-14 md:pt-0 bg-gray-50">
         {/* Desktop Header */}
         <div className="hidden px-8 py-6 md:block bg-white border-b border-gray-200 mb-6 sticky top-0 z-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-black uppercase tracking-tight">{getPageTitle()}</h1>
                    <p className="text-gray-500 font-medium text-sm">Real-time School Bus Tracking System</p>
                </div>
                <div className="flex gap-4 items-center">
                     <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        System Online
                     </div>
                     <button className="p-2 text-black bg-[#FFC107] rounded-full hover:bg-yellow-400 transition-colors relative shadow-md">
                        <Bell size={20}/>
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                     </button>
                </div>
            </div>
         </div>
         
        <div className="px-4 pb-10 md:px-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;