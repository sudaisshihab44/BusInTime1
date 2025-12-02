import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, ArrowLeft } from 'lucide-react';
import Card from '../components/Card';
import { MOCK_CHILDREN, MOCK_STOPS } from '../constants';

const ChildStatusScreen: React.FC = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const child = MOCK_CHILDREN.find(c => c.id === childId) || MOCK_CHILDREN[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
         <button onClick={() => navigate(-1)} className="p-2 hover:bg-yellow-100 rounded-lg text-black transition-colors">
            <ArrowLeft size={24} />
         </button>
         <div>
            <h2 className="text-xl font-black text-black uppercase tracking-tight">Status Log</h2>
            <p className="text-sm text-slate-500 font-medium">Tracking for {child.name}</p>
         </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Status Summary Card */}
        <div className="md:col-span-1">
            <Card className="text-center h-full flex flex-col items-center justify-center p-8 bg-black border-2 border-yellow-400 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                 
                 <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-4 text-black shadow-lg shadow-yellow-400/20">
                     <Clock size={40} />
                 </div>
                 <h3 className="text-3xl font-black mb-1 uppercase tracking-tight text-yellow-400">On Time</h3>
                 <p className="opacity-80 font-medium text-slate-300">{child.busNumber}</p>
                 <div className="mt-8 py-2 px-6 bg-slate-900 border border-slate-800 rounded-full text-sm font-bold text-yellow-400">
                    45 km/h
                 </div>
            </Card>
        </div>

        {/* Timeline */}
        <div className="md:col-span-2">
            <Card className="h-full">
                <div className="relative pl-4 border-l-2 border-slate-100 space-y-8 my-2 ml-2">
                    {MOCK_STOPS.map((stop, index) => {
                        const isPassed = stop.status === 'passed';
                        const isCurrent = stop.status === 'current';
                        
                        return (
                            <div key={stop.id} className="relative pl-8">
                                {/* Dot Indicator */}
                                <div className={`absolute -left-[27px] top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10
                                    ${isPassed ? 'bg-black' : isCurrent ? 'bg-yellow-400 ring-4 ring-yellow-100 scale-110' : 'bg-slate-200'}
                                `}>
                                    {isPassed && <CheckCircle2 size={12} className="text-yellow-400" />}
                                </div>

                                <div className={`transition-all ${isCurrent ? 'opacity-100 scale-100' : isPassed ? 'opacity-60' : 'opacity-40'}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className={`font-bold text-lg ${isCurrent ? 'text-black' : 'text-slate-900'}`}>{stop.name}</h4>
                                        <span className="text-sm font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{stop.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider
                                            ${isPassed ? 'bg-slate-100 text-slate-600' : isCurrent ? 'bg-black text-yellow-400' : 'bg-slate-50 text-slate-400'}
                                        `}>
                                            {stop.status}
                                        </span>
                                        {isCurrent && <span className="flex items-center gap-1 text-xs text-red-500 font-bold animate-pulse">
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span> Live
                                        </span>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default ChildStatusScreen;