import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Phone, FileText } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { MOCK_DRIVERS } from '../../constants';
import { Driver } from '../../types';

const DriversManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Driver>>({});

  const handleOpenModal = (driver?: Driver) => {
    if (driver) {
      setEditingDriver(driver);
      setFormData(driver);
    } else {
      setEditingDriver(null);
      setFormData({ status: 'active', photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}` });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingDriver) {
      setDrivers(drivers.map(d => d.id === editingDriver.id ? { ...d, ...formData } as Driver : d));
    } else {
      const newDriver: Driver = {
        id: `d${Date.now()}`,
        ...formData as Driver,
      };
      setDrivers([...drivers, newDriver]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this driver?')) {
        setDrivers(drivers.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-xl font-black text-black uppercase tracking-tight">Drivers Management</h2>
            <p className="text-sm text-slate-500 font-medium">Manage school bus drivers</p>
        </div>
        <Button variant="secondary" icon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          Add Driver
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {drivers.map(driver => (
          <Card key={driver.id} className="relative group">
             <div className="flex items-start gap-4">
                <img src={driver.photoUrl} alt={driver.name} className="w-16 h-16 rounded-xl bg-slate-100 border-2 border-slate-200" />
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-slate-900 truncate">{driver.name}</h3>
                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                        <Phone size={14} />
                        <span>{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-0.5">
                        <FileText size={14} />
                        <span className="truncate">{driver.licenseNumber}</span>
                    </div>
                </div>
             </div>
             
             <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${driver.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {driver.status}
                </span>
                <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(driver)} className="p-2 text-slate-400 hover:text-black hover:bg-slate-100 rounded-lg transition-colors">
                        <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(driver.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
             </div>
          </Card>
        ))}
      </div>

      {/* Simple Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-yellow-400 px-6 py-4 flex justify-between items-center border-b-2 border-black">
                    <h3 className="font-black text-black uppercase">{editingDriver ? 'Edit Driver' : 'Add New Driver'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-black hover:bg-white/20 p-1 rounded">✕</button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                        <input 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none" 
                            value={formData.name || ''} 
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                        <input 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none" 
                            value={formData.phone || ''} 
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">License Number</label>
                        <input 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none" 
                            value={formData.licenseNumber || ''} 
                            onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                        <select 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none"
                            value={formData.status || 'active'}
                            onChange={e => setFormData({...formData, status: e.target.value as any})}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>Save Driver</Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default DriversManagement;