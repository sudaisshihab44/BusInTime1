import React from 'react';
import { Bus, Users, AlertTriangle, MapPin, CheckCircle, Satellite, Radio } from 'lucide-react';
import Card from '../components/Card';
import { MOCK_BUSES, MOCK_ROUTES } from '../constants';

const SchoolDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-black text-yellow-400 rounded-xl shadow-lg border-2 border-black">
           <div className="flex items-center gap-2 mb-2 opacity-80">
              <Bus size={18} />
              <span className="text-xs font-bold uppercase">Total Buses</span>
           </div>
           <p className="text-3xl font-black">12</p>
           <p className="text-xs text-yellow-400/70 mt-1">10 Active • 2 Maint</p>
        </div>
        <div className="p-4 bg-white text-black rounded-xl shadow-sm border-2 border-slate-100">
           <div className="flex items-center gap-2 mb-2 text-slate-500">
              <Users size={18} />
              <span className="text-xs font-bold uppercase">Students</span>
           </div>
           <p className="text-3xl font-black">450</p>
           <p className="text-xs text-green-600 font-bold mt-1">92% Boarded</p>
        </div>
        <div className="p-4 bg-white text-black rounded-xl shadow-sm border-2 border-slate-100">
           <div className="flex items-center gap-2 mb-2 text-slate-500">
              <AlertTriangle size={18} className="text-red-500" />
              <span className="text-xs font-bold uppercase">Alerts</span>
           </div>
           <p className="text-3xl font-black">3</p>
           <p className="text-xs text-slate-400 mt-1">2 Delays • 1 SOS</p>
        </div>
        <div className="p-4 bg-white text-black rounded-xl shadow-sm border-2 border-slate-100">
           <div className="flex items-center gap-2 mb-2 text-slate-500">
              <CheckCircle size={18} className="text-green-500" />
              <span className="text-xs font-bold uppercase">On Time</span>
           </div>
           <p className="text-3xl font-black">8</p>
           <p className="text-xs text-slate-400 mt-1">Buses running on schedule</p>
        </div>
      </div>

      {/* Live Fleet Map - Satellite View */}
      <div className="relative h-96 bg-[#020617] rounded-2xl border-2 border-black overflow-hidden group shadow-2xl">
          {/* Satellite Base Layer */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e293b_0%,_#020617_100%)]"></div>
          
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
             }} 
          />
          
          {/* Grid Overlay for Tech feel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* Map Vector Paths (Roads) - Light styling for Satellite Mode */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              {/* Secondary Roads */}
              <path d="M0,150 Q400,100 800,300 T1600,200" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <path d="M200,600 Q500,400 600,0" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <path d="M800,600 L700,400 L900,100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              
              {/* Main Roads / Routes */}
              <path d="M-100,100 C100,100 200,250 350,220 S 450,400 650,350 S 900,200 1200,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" strokeLinecap="round" />
              <path d="M100,600 C200,500 300,450 450,400" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" strokeLinecap="round" />
              <path d="M600,600 L650,350 L800,50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" strokeLinecap="round" />
              
              {/* Active Route Highlight (Cyan Glow) */}
              <path d="M-100,100 C100,100 200,250 350,220 S 450,400 650,350 S 900,200 1200,100" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" className="opacity-60 blur-[2px]" />
              <path d="M-100,100 C100,100 200,250 350,220 S 450,400 650,350 S 900,200 1200,100" fill="none" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />
          </svg>
          
          {/* UI Controls Overlay */}
          <div className="absolute top-4 left-4 z-10">
               <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3 text-white shadow-xl">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                    <Satellite size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">View Mode</p>
                    <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                         <p className="text-xs font-black uppercase tracking-wide text-white">Satellite Live</p>
                    </div>
                  </div>
               </div>
          </div>

          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
               <button className="w-10 h-10 bg-slate-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white border border-white/10 hover:bg-slate-800 transition-colors">
                  <span className="text-lg font-bold">+</span>
               </button>
               <button className="w-10 h-10 bg-slate-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white border border-white/10 hover:bg-slate-800 transition-colors">
                  <span className="text-lg font-bold">-</span>
               </button>
          </div>

          {/* Simulated Bus Pins with Glow Effects for Night Mode */}
          <div className="absolute top-1/2 left-1/2 -translate-x-10 -translate-y-10 group-hover:translate-x-2 transition-transform duration-700 z-20">
              <div className="relative">
                  {/* Pulse Effect */}
                  <div className="absolute -inset-8 bg-yellow-500/20 rounded-full animate-pulse"></div>
                  <div className="absolute -inset-2 bg-yellow-500/40 rounded-full blur-sm"></div>
                  
                  {/* Marker Body */}
                  <div className="w-12 h-12 bg-[#FFC107] rounded-full border-[3px] border-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform cursor-pointer relative z-10">
                      <Bus size={20} className="text-black fill-black"/>
                  </div>
                  
                  {/* Label */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md text-[#FFC107] text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap border border-yellow-500/30 shadow-xl flex items-center gap-2">
                      <Radio size={10} className="animate-pulse" />
                      KA-19-B-101
                  </div>
              </div>
          </div>

          {/* Second Bus */}
          <div className="absolute top-1/3 left-1/3 group-hover:-translate-y-2 transition-transform duration-1000 z-20">
               <div className="relative">
                   <div className="absolute -inset-2 bg-green-500/30 rounded-full blur-sm"></div>
                  <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg relative z-10 hover:scale-110 transition-transform">
                       <Bus size={16} className="text-white fill-white"/>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap border border-white/10">
                      Bus 205
                  </div>
               </div>
          </div>

          {/* Third Bus */}
          <div className="absolute bottom-1/4 right-1/4 group-hover:-translate-x-2 transition-transform duration-500 z-20">
               <div className="relative">
                  <div className="absolute -inset-4 bg-yellow-400/10 rounded-full animate-ping delay-300"></div>
                  <div className="w-8 h-8 bg-[#FFC107] rounded-full border-2 border-white flex items-center justify-center shadow-lg relative z-10">
                       <Bus size={14} className="text-black"/>
                  </div>
               </div>
          </div>
      </div>

      {/* Active Trips List */}
      <div className="grid gap-6 md:grid-cols-2">
          <Card>
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-lg uppercase">Active Routes</h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                  {MOCK_ROUTES.map(route => (
                      <div key={route.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-500">
                                  <MapPin size={20} />
                              </div>
                              <div>
                                  <p className="font-bold text-sm text-slate-900">{route.name}</p>
                                  <p className="text-xs text-slate-500 font-medium">Bus KA-19-B-101</p>
                              </div>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded">On Time</span>
                      </div>
                  ))}
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                        <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-lg border border-red-200 flex items-center justify-center text-red-500">
                                  <AlertTriangle size={20} />
                              </div>
                              <div>
                                  <p className="font-bold text-sm text-slate-900">Route 3 - Bejai</p>
                                  <p className="text-xs text-red-600 font-medium">Traffic Delay (+15m)</p>
                              </div>
                          </div>
                          <span className="px-2 py-1 bg-red-200 text-red-800 text-xs font-bold uppercase rounded">Late</span>
                  </div>
              </div>
          </Card>

          <Card>
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-lg uppercase">Recent Activity</h3>
              </div>
              <div className="space-y-4 relative pl-2">
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
                  {[
                      { time: '2m ago', msg: 'Bus KA-19-B-101 reached St. Aloysius.', type: 'success' },
                      { time: '15m ago', msg: 'SOS Alert from Driver Manjunath (Route 2).', type: 'danger' },
                      { time: '30m ago', msg: 'Heavy traffic reported at Hampankatta.', type: 'warning' },
                      { time: '1h ago', msg: 'Route 1 started from Kankanady.', type: 'info' }
                  ].map((log, i) => (
                      <div key={i} className="flex gap-3 relative z-10">
                          <div className={`w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0 
                              ${log.type === 'success' ? 'bg-green-500' : log.type === 'danger' ? 'bg-red-500' : log.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-500'}
                          `}></div>
                          <div>
                              <p className="text-sm font-medium text-slate-800">{log.msg}</p>
                              <p className="text-xs text-slate-400 font-bold">{log.time}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </Card>
      </div>
    </div>
  );
};

export default SchoolDashboard;