import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Clock, MapPin, ListChecks, CalendarX, Phone } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { MOCK_CHILDREN } from '../constants';

const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_CHILDREN.map((child) => (
          <Card key={child.id} highlight className="relative overflow-visible group flex flex-col h-full">
            {/* Child Header Info */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                    <img 
                    src={child.avatarUrl} 
                    alt={child.name} 
                    className="w-16 h-16 border-4 border-yellow-100 rounded-full shadow-md bg-yellow-50"
                    />
                    <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white ${
                        child.status === 'boarded' ? 'bg-green-500' :
                        child.status === 'in-transit' ? 'bg-yellow-500' :
                        child.status === 'dropped' ? 'bg-slate-400' : 'bg-blue-500'
                    }`} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-black">{child.name}</h3>
                  <p className="text-sm font-bold text-slate-500">{child.grade}</p>
                  <p className="text-xs text-slate-400 font-medium">{child.school}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-2 mb-1 text-slate-500">
                  <Bus size={14} className="text-yellow-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Bus No</span>
                </div>
                <p className="font-bold text-black">{child.busNumber}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                 <div className="flex items-center gap-2 mb-1 text-slate-500">
                  <Clock size={14} className="text-yellow-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Pickup</span>
                </div>
                <p className="font-bold text-black">{child.nextPickupTime}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-3">
              <Button 
                fullWidth 
                variant="primary" 
                onClick={() => navigate(`/map/${child.id}`)}
                icon={<MapPin size={18} />}
              >
                Track Live Bus
              </Button>
              <div className="grid grid-cols-2 gap-3">
                 <Button 
                    fullWidth 
                    size="sm"
                    variant="outline" 
                    onClick={() => navigate(`/status/${child.id}`)}
                    icon={<ListChecks size={16} />}
                  >
                    Log
                  </Button>
                  <Button 
                    fullWidth 
                    size="sm"
                    variant="outline"
                    className="border-red-100 text-red-600 hover:bg-red-50"
                    onClick={() => setShowLeaveModal(true)}
                    icon={<CalendarX size={16} />}
                  >
                    Leave
                  </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {/* Add Child Placeholder */}
        <button className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-slate-300 rounded-xl hover:bg-yellow-50 hover:border-yellow-400 transition-all text-slate-400 hover:text-yellow-600 gap-3 group">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 group-hover:bg-yellow-200 transition-colors">
                <span className="text-3xl font-light text-slate-400 group-hover:text-yellow-700">+</span>
            </div>
            <span className="font-bold uppercase tracking-wide">Add Child</span>
        </button>
      </div>

       {/* Apply Leave Modal */}
       {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-yellow-400 px-6 py-4 flex justify-between items-center border-b-2 border-black">
                    <h3 className="font-black text-black uppercase">Apply for Leave</h3>
                    <button onClick={() => setShowLeaveModal(false)} className="text-black hover:bg-white/20 p-1 rounded">✕</button>
                </div>
                <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-600">Bus driver will be notified that your child will not be boarding.</p>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Select Date</label>
                        <input type="date" className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none" />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Reason (Optional)</label>
                        <textarea className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none h-20"></textarea>
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                    <Button variant="ghost" onClick={() => setShowLeaveModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => setShowLeaveModal(false)}>Submit</Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;