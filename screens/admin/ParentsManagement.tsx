import React, { useState } from 'react';
import { Check, X, Mail, Phone, MoreHorizontal, Plus, Trash2, Edit2 } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { MOCK_PARENTS } from '../../constants';
import { Parent } from '../../types';

const ParentsManagement: React.FC = () => {
  const [parents, setParents] = useState<Parent[]>(MOCK_PARENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [formData, setFormData] = useState<Partial<Parent>>({});

  const handleStatusChange = (id: string, status: Parent['status']) => {
    setParents(parents.map(p => p.id === id ? { ...p, status } : p));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this parent account?')) {
        setParents(parents.filter(p => p.id !== id));
    }
  };

  const handleOpenModal = (parent?: Parent) => {
    if (parent) {
      setEditingParent(parent);
      setFormData(parent);
    } else {
      setEditingParent(null);
      setFormData({ status: 'pending', childrenIds: [] });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) return;

    if (editingParent) {
      setParents(parents.map(p => p.id === editingParent.id ? { ...p, ...formData } as Parent : p));
    } else {
      const newParent: Parent = {
        id: `p${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        childrenIds: [],
        status: formData.status as Parent['status'] || 'pending',
      };
      setParents([...parents, newParent]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
            <h2 className="text-xl font-black text-black uppercase tracking-tight">Parent Accounts</h2>
            <p className="text-sm text-slate-500 font-medium">Approve and manage parent access</p>
        </div>
        <Button variant="secondary" icon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          Invite Parent
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Name</th>
                        <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Contact Info</th>
                        <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Children</th>
                        <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Status</th>
                        <th className="p-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {parents.map(parent => (
                        <tr key={parent.id} className="hover:bg-yellow-50/50 transition-colors group">
                            <td className="p-4 font-bold text-slate-900">{parent.name}</td>
                            <td className="p-4">
                                <div className="flex flex-col text-sm text-slate-600 gap-1">
                                    <div className="flex items-center gap-2"><Mail size={14}/> {parent.email}</div>
                                    <div className="flex items-center gap-2"><Phone size={14}/> {parent.phone}</div>
                                </div>
                            </td>
                            <td className="p-4 text-sm font-medium text-slate-900">
                                {parent.childrenIds.length > 0 ? `${parent.childrenIds.length} Linked` : 'None'}
                            </td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase
                                    ${parent.status === 'approved' ? 'bg-green-100 text-green-700' : 
                                      parent.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                    }
                                `}>
                                    {parent.status}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {parent.status === 'pending' && (
                                        <>
                                            <button 
                                                onClick={() => handleStatusChange(parent.id, 'approved')}
                                                className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200" title="Approve">
                                                <Check size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleStatusChange(parent.id, 'rejected')}
                                                className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200" title="Reject">
                                                <X size={16} />
                                            </button>
                                        </>
                                    )}
                                    <button onClick={() => handleOpenModal(parent)} className="p-1.5 text-slate-400 hover:text-black hover:bg-slate-100 rounded">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(parent.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

       {/* Parent Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-yellow-400 px-6 py-4 flex justify-between items-center border-b-2 border-black">
                    <h3 className="font-black text-black uppercase">{editingParent ? 'Edit Parent' : 'Invite Parent'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-black hover:bg-white/20 p-1 rounded">✕</button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                        <input 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none" 
                            value={formData.name || ''} 
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            placeholder="e.g. Anil Rao"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                        <input 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none" 
                            value={formData.email || ''} 
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            placeholder="parent@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                        <input 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none" 
                            value={formData.phone || ''} 
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            placeholder="+91 99999 00000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Account Status</label>
                        <select 
                            className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-black outline-none"
                            value={formData.status || 'pending'}
                            onChange={e => setFormData({...formData, status: e.target.value as any})}
                        >
                            <option value="pending">Pending Approval</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>
                        {editingParent ? 'Save Changes' : 'Send Invite'}
                    </Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ParentsManagement;