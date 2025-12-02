import React, { useState } from 'react';
import { Bus as BusIcon, MapPin, Settings, Plus, X, Trash2, Navigation } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { MOCK_BUSES, MOCK_ROUTES, MOCK_DRIVERS } from '../../constants';
import { Bus, Route } from '../../types';

const FleetManagement: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>(MOCK_BUSES);
  
  // Bus Modal State
  const [isBusModalOpen, setIsBusModalOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [busFormData, setBusFormData] = useState<Partial<Bus>>({});

  // Route Modal State
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  // --- Bus Handlers ---
  const handleOpenBusModal = (bus?: Bus) => {
    if (bus) {
      setEditingBus(bus);
      setBusFormData(bus);
    } else {
      setEditingBus(null);
      setBusFormData({ status: 'active', capacity: 30 });
    }
    setIsBusModalOpen(true);
  };

  const handleSaveBus = () => {
    if (!busFormData.registrationNumber) return;

    if (editingBus) {
        setBuses(buses.map(b => b.id === editingBus.id ? { ...b, ...busFormData } as Bus : b));
    } else {
        const newBus: Bus = {
            id: `b${Date.now()}`,
            registrationNumber: busFormData.registrationNumber,
            capacity: busFormData.capacity || 30,
            routeId: busFormData.routeId || '',
            driverId: busFormData.driverId || '',
            status: busFormData.status as Bus['status'] || 'active'
        };
        setBuses([...buses, newBus]);
    }
    setIsBusModalOpen(false);
  };

  const handleDeleteBus = (id: string) => {
      if(window.confirm("Remove this bus from the fleet?")) {
          setBuses(buses.filter(b => b.id !== id));
      }
  };

  // --- Route Handlers ---
  const handleViewRoute = (routeId: string) => {
      const route = MOCK_ROUTES.find(r => r.id === routeId);
      if (route) {
          setSelectedRoute(route);
          setIsRouteModalOpen(true);
      } else {
          alert('Route details not found for this mock data.');
      }
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
            <h2 className="text-xl font-black text-black uppercase tracking-tight">Fleet & Routes</h2>
            <p className="text-sm text-slate-500 font-medium">Manage buses and route details</p>
        </div>
        <Button variant="secondary" icon={<Plus size={18} />} onClick={() => handleOpenBusModal()}>
          Add Bus
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {buses.map(bus => (
            <Card key={bus.id} className="group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-yellow-400 shrink-0">
                            <BusIcon size={24} />
                         </div>
                         <div className="min-w-0">
                             <h3 className="text-lg font-black text-slate-900 truncate">{bus.registrationNumber}</h3>
                             <p className="text-sm font-medium text-slate-500">Cap: {bus.capacity}</p>
                         </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${bus.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {bus.status}
                    </span>
                </div>

                <div className="space-y-3 flex-1">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 truncate">
                            <MapPin size={16} className="text-yellow-600 shrink-0" />
                            <span className="truncate">{bus.routeId ? MOCK_ROUTES.find(r => r.id === bus.routeId)?.name || bus.routeId : 'Unassigned'}</span>
                        </div>
                        {bus.routeId && (
                            <button onClick={() => handleViewRoute(bus.routeId)} className="text-xs font-bold text-blue-600 hover:underline shrink-0 ml-2">
                                View
                            </button>
                        )}
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 truncate">
                             <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600 shrink-0">D</span>
                            <span className="truncate">{bus.driverId ? MOCK_DRIVERS.find(d => d.id === bus.driverId)?.name || bus.driverId : 'Unassigned'}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                     <Button variant="outline" size="sm" fullWidth icon={<Settings size={14}/>} onClick={() => handleOpenBusModal(bus)}>
                        Edit
                     </Button>
                     <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50" onClick={() => handleDeleteBus(bus.id)}>
                        <Trash2 size={16}/>
                     </Button>
                </div>
            </Card>
        ))}
      </div>

      {/* Bus Modal */}
      {isBusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-yellow-400 px-6 py-4 flex justify-between items-center border-b-2 border-black">
                    <h3 className="font-black text-black uppercase">{editingBus ? 'Edit Bus' : 'Add New Bus'}</h3>
                    <button onClick={() => setIsBusModalOpen(false)} className="text-black hover:bg-white/20 p-1 rounded">✕</button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Registration Number</label>
                        <input 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none" 
                            value={busFormData.registrationNumber || ''} 
                            onChange={e => setBusFormData({...busFormData, registrationNumber: e.target.value})}
                            placeholder="KA-19-..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Capacity</label>
                            <input 
                                type="number"
                                className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none" 
                                value={busFormData.capacity || ''} 
                                onChange={e => setBusFormData({...busFormData, capacity: parseInt(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                             <select 
                                className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none"
                                value={busFormData.status || 'active'}
                                onChange={e => setBusFormData({...busFormData, status: e.target.value as any})}
                            >
                                <option value="active">Active</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Assign Route</label>
                        <select 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none"
                            value={busFormData.routeId || ''}
                            onChange={e => setBusFormData({...busFormData, routeId: e.target.value})}
                        >
                            <option value="">-- No Route Assigned --</option>
                            {MOCK_ROUTES.map(route => (
                                <option key={route.id} value={route.id}>{route.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Assign Driver</label>
                        <select 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none"
                            value={busFormData.driverId || ''}
                            onChange={e => setBusFormData({...busFormData, driverId: e.target.value})}
                        >
                            <option value="">-- No Driver Assigned --</option>
                            {MOCK_DRIVERS.map(driver => (
                                <option key={driver.id} value={driver.id}>{driver.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                    <Button variant="ghost" onClick={() => setIsBusModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveBus}>Save Bus</Button>
                </div>
            </div>
        </div>
      )}

      {/* Route Details Modal */}
      {isRouteModalOpen && selectedRoute && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 h-[80vh] flex flex-col">
                <div className="bg-slate-900 px-6 py-4 flex justify-between items-center border-b border-slate-800">
                    <div>
                        <h3 className="font-bold text-yellow-400 text-lg uppercase">{selectedRoute.name}</h3>
                        <p className="text-slate-400 text-xs">Total Stops: {selectedRoute.stops.length}</p>
                    </div>
                    <button onClick={() => setIsRouteModalOpen(false)} className="text-white hover:bg-white/20 p-1 rounded">✕</button>
                </div>
                <div className="flex-1 overflow-y-auto p-0">
                    {/* Map Placeholder */}
                    <div className="h-48 bg-slate-100 relative mb-4 border-b border-slate-200">
                         <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                             <div className="text-center">
                                 <Navigation className="mx-auto mb-2 opacity-50" size={32}/>
                                 <span className="text-xs font-bold uppercase tracking-widest">Route Map Preview</span>
                             </div>
                         </div>
                    </div>

                    <div className="px-6 pb-6 space-y-4">
                        <h4 className="font-bold text-black uppercase text-sm border-b pb-2">Stop Sequence</h4>
                        <div className="space-y-4">
                            {selectedRoute.stops.map((stop, index) => (
                                <div key={stop.id} className="flex gap-4 relative">
                                    {index !== selectedRoute.stops.length - 1 && (
                                        <div className="absolute left-[11px] top-6 bottom-[-16px] w-0.5 bg-slate-200"></div>
                                    )}
                                    <div className="w-6 h-6 rounded-full bg-black text-yellow-400 flex items-center justify-center text-xs font-bold shrink-0 z-10 ring-4 ring-white">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{stop.name}</p>
                                        <p className="text-xs text-slate-500 font-mono">{stop.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50">
                    <Button fullWidth variant="primary" onClick={() => setIsRouteModalOpen(false)}>Close</Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default FleetManagement;