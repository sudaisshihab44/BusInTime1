import React from 'react';
import { Bell, MapPin, AlertTriangle, Info, Calendar } from 'lucide-react';
import Card from '../components/Card';
import { MOCK_NOTIFICATIONS } from '../constants';
import { NotificationItem } from '../types';

const NotificationsScreen: React.FC = () => {
  
  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
        case 'pickup': return <MapPin size={20} className="text-black" />;
        case 'drop': return <MapPin size={20} className="text-green-600" />;
        case 'alert': return <Bell size={20} className="text-yellow-600" />;
        case 'delay': return <AlertTriangle size={20} className="text-red-500" />;
        default: return <Info size={20} className="text-slate-500" />;
    }
  };

  const getBgColor = (type: NotificationItem['type']) => {
     switch (type) {
        case 'pickup': return 'bg-yellow-400';
        case 'drop': return 'bg-green-100';
        case 'alert': return 'bg-yellow-100';
        case 'delay': return 'bg-red-100';
        default: return 'bg-slate-100';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black text-black uppercase tracking-tight">Recent Alerts</h2>
        <button className="text-xs font-bold text-black border-b-2 border-yellow-400 hover:bg-yellow-50 px-2 py-1 transition-colors">Mark all read</button>
      </div>

      {MOCK_NOTIFICATIONS.map((notif) => (
        <Card key={notif.id} className={`transition-all hover:bg-yellow-50/50 ${!notif.read ? 'border-l-4 border-l-yellow-400' : ''}`}>
           <div className="flex gap-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border-2 border-transparent ${getBgColor(notif.type)}`}>
                  {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                  <div className="flex items-start justify-between">
                      <h3 className={`font-bold text-slate-900 ${!notif.read ? 'text-lg' : ''}`}>{notif.title}</h3>
                      <span className="text-xs text-slate-400 whitespace-nowrap ml-2 font-medium">{notif.timestamp}</span>
                  </div>
                  <p className={`mt-1 text-slate-600 text-sm leading-relaxed ${!notif.read ? 'font-medium text-black' : ''}`}>
                    {notif.message}
                  </p>
                  
                  {notif.type === 'general' && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">
                          <Calendar size={14} />
                          <span>School Admin</span>
                      </div>
                  )}
              </div>
           </div>
        </Card>
      ))}

      <div className="pt-8 text-center text-slate-400 text-sm font-medium">
        <p>No more notifications from St. Aloysius School</p>
      </div>
    </div>
  );
};

export default NotificationsScreen;