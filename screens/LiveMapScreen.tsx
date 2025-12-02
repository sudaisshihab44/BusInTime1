import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Navigation, Clock, ShieldCheck, RefreshCw, Layers, Compass, Crosshair, Map as MapIcon, Satellite, MapPin } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { MOCK_CHILDREN, MOCK_STOPS } from '../constants';

const LiveMapScreen: React.FC = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const child = MOCK_CHILDREN.find(c => c.id === childId) || MOCK_CHILDREN[0];
  
  const [eta, setEta] = useState('12 mins');
  const [distance, setDistance] = useState('4.2 km');
  const [speed, setSpeed] = useState(42);
  const [isRefreshed, setIsRefreshed] = useState(false);
  // Defaulting to 'satellite' view as per request
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('satellite');
  const [showTraffic, setShowTraffic] = useState(false);
  const [address, setAddress] = useState('Falnir Road, Mangalore - 575001');

  // Animation State
  const [busPosition, setBusPosition] = useState({ x: 100, y: 100 });
  const [progress, setProgress] = useState(0);

  // Mangalore Route Coordinates (simulated for SVG)
  const routePath = "M100,100 L200,250 L350,220 L450,400 L650,350 L800,200";

  // Simulate Bus Movement along SVG path
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const newP = p >= 100 ? 0 : p + 0.2;
        // Basic interpolation for demo (in real app, use getPointAtLength on SVG path)
        // Here we just mock movement logic roughly along the path concept
        return newP;
      });
      // Vary speed slightly
      setSpeed(Math.floor(40 + Math.random() * 5));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Calculate bus position based on progress (Simplified Logic for Demo)
  // In a real app, this would use the Google Maps API marker animation
  const getPositionOnPath = (pct: number) => {
     // Hardcoded keypoints matching the path M100,100 L200,250 L350,220 L450,400 L650,350 L800,200
     if (pct < 20) return { x: 100 + (pct/20)*100, y: 100 + (pct/20)*150 };
     if (pct < 40) return { x: 200 + ((pct-20)/20)*150, y: 250 - ((pct-20)/20)*30 };
     if (pct < 60) return { x: 350 + ((pct-40)/20)*100, y: 220 + ((pct-40)/20)*180 };
     if (pct < 80) return { x: 450 + ((pct-60)/20)*200, y: 400 - ((pct-60)/20)*50 };
     return { x: 650 + ((pct-80)/20)*150, y: 350 - ((pct-80)/20)*150 };
  };

  const currentPos = getPositionOnPath(progress);

  const handleRefresh = () => {
    setIsRefreshed(true);
    // Simulate data fetch
    setTimeout(() => {
        setIsRefreshed(false);
        setAddress("Kankanady Bypass, Mangalore");
    }, 1500);
  };

  const handleCallDriver = () => {
    window.location.href = "tel:1234567890";
  };

  const isSatellite = mapType === 'satellite';

  return (
    <div className="relative h-[calc(100vh-80px)] w-full bg-gray-200 overflow-hidden flex flex-col">
      
      {/* MAP LAYER */}
      <div className={`absolute inset-0 transition-colors duration-500 ${isSatellite ? 'bg-[#020617]' : 'bg-[#e5e7eb]'}`}>
        
        {/* Satellite Background Gradient if active */}
        {isSatellite && (
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e293b_0%,_#020617_100%)]"></div>
        )}

        {/* Map Pattern / Tiles */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
             }} 
        />
        
        {/* Interactive SVG Map Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
            
            {/* Geofence Zone */}
            <circle cx="200" cy="250" r="80" fill={isSatellite ? 'rgba(255,255,255,0.05)' : 'rgba(255,193,7,0.1)'} stroke={isSatellite ? 'rgba(255,255,255,0.2)' : '#FFC107'} strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-slow"/>

            {/* Route Polyline (Outline/Glow) */}
            <path 
                d={routePath} 
                fill="none" 
                stroke={isSatellite ? 'rgba(0,0,0,0.8)' : 'white'} 
                strokeWidth="14" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            {/* Route Polyline (Main) */}
            <path 
                d={routePath} 
                fill="none" 
                stroke={isSatellite ? 'rgba(255,255,255,0.3)' : '#000000'} 
                strokeWidth="8" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
             {/* Traveled Path (Yellow/Cyan) */}
             <path 
                d={routePath} 
                fill="none" 
                stroke={isSatellite ? '#FFC107' : '#FFC107'} 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                strokeDasharray="1000"
                strokeDashoffset={1000 - (progress * 10)}
                className={isSatellite ? 'drop-shadow-[0_0_8px_rgba(255,193,7,0.8)]' : ''}
            />

            {/* Stops Markers */}
            {[
                {x: 100, y: 100, name: 'Start'}, 
                {x: 200, y: 250, name: 'Kankanady'}, 
                {x: 450, y: 400, name: 'Bejai'},
                {x: 800, y: 200, name: 'School'}
            ].map((stop, i) => (
                <g key={i}>
                    <circle cx={stop.x} cy={stop.y} r="6" fill={isSatellite ? "#1e293b" : "white"} stroke={isSatellite ? "white" : "black"} strokeWidth="2" />
                </g>
            ))}

            {/* BUS MARKER (Animated) */}
            <g style={{ transform: `translate(${currentPos.x}px, ${currentPos.y}px)` }} className="transition-transform duration-75 ease-linear">
                {/* Ping Effect */}
                <circle r="40" fill={isSatellite ? "#FFC107" : "#FFC107"} opacity="0.3" className="animate-ping" />
                {/* Bus Icon Body */}
                <circle r="22" fill="#FFC107" stroke={isSatellite ? "white" : "black"} strokeWidth="3" className="shadow-2xl" />
                {/* Bus Vector */}
                <g transform="translate(-12, -12) scale(1)">
                     <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M7 17h6.5" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <circle cx="5.5" cy="17.5" r="2.5" fill="black"/>
                     <circle cx="15.5" cy="17.5" r="2.5" fill="black"/>
                </g>
            </g>
        </svg>

        {/* Floating Stop Labels */}
        <div className="absolute top-[260px] left-[200px] -translate-x-1/2 bg-white/90 backdrop-blur px-2 py-1 rounded shadow text-[10px] font-bold border border-gray-300">Kankanady</div>
        <div className="absolute top-[410px] left-[450px] -translate-x-1/2 bg-white/90 backdrop-blur px-2 py-1 rounded shadow text-[10px] font-bold border border-gray-300">Bejai Main Rd</div>
        <div className="absolute top-[180px] left-[800px] -translate-x-1/2 bg-black text-[#FFC107] px-2 py-1 rounded shadow text-[10px] font-bold border border-yellow-500">St. Aloysius</div>
      </div>

      {/* --- UI OVERLAYS --- */}

      {/* Top Bar: Navigation & Status */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-start bg-gradient-to-b from-black/40 to-transparent">
         <button 
           onClick={() => navigate(-1)} 
           className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-black border border-gray-200 active:scale-95 transition-transform"
         >
           <ArrowLeft size={20} strokeWidth={2.5} />
         </button>

         <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-2">
                 {/* Map Type Toggle */}
                 <button 
                    onClick={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
                    className={`w-10 h-10 rounded-lg shadow-lg flex items-center justify-center active:scale-95 transition-transform border border-white/20 ${isSatellite ? 'bg-black/50 text-blue-400 backdrop-blur-md' : 'bg-white text-gray-700'}`}
                 >
                    {mapType === 'standard' ? <Satellite size={20}/> : <MapIcon size={20}/>}
                 </button>
                 
                 {/* Traffic Toggle */}
                 <button 
                    onClick={() => setShowTraffic(!showTraffic)}
                    className={`w-10 h-10 rounded-lg shadow-lg flex items-center justify-center active:scale-95 transition-transform border border-white/20 ${showTraffic ? 'bg-green-500 text-white' : isSatellite ? 'bg-black/50 text-white backdrop-blur-md' : 'bg-white text-gray-700'}`}
                 >
                    <Layers size={20}/>
                 </button>
            </div>
            
            {/* Live Indicator */}
            <div className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-md flex items-center gap-2 text-xs font-bold text-green-700 border border-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                LIVE GPS
            </div>
         </div>
      </div>

      {/* Right Side Controls */}
      <div className="absolute bottom-64 right-4 flex flex-col gap-3 z-10">
         <button className={`w-10 h-10 rounded-lg shadow-lg flex items-center justify-center active:scale-95 border border-white/20 ${isSatellite ? 'bg-black/50 text-white backdrop-blur-md' : 'bg-white text-gray-700'}`}>
             <Compass size={20} />
         </button>
         <button className={`w-10 h-10 rounded-lg shadow-lg flex items-center justify-center active:scale-95 border border-white/20 ${isSatellite ? 'bg-black/50 text-blue-400 backdrop-blur-md' : 'bg-white text-blue-600'}`}>
             <Crosshair size={20} />
         </button>
      </div>

      {/* Bottom Sheet - Details */}
      <div className="mt-auto relative z-20 bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-300">
          
          {/* Refresh Fab */}
          <div className="absolute -top-6 right-6">
              <button 
                onClick={handleRefresh}
                className={`w-12 h-12 bg-black text-[#FFC107] rounded-full shadow-xl flex items-center justify-center border-4 border-white active:scale-95 transition-transform ${isRefreshed ? 'animate-spin' : ''}`}
              >
                  <RefreshCw size={20} strokeWidth={3} />
              </button>
          </div>

          <div className="p-6 pb-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                  <div>
                      <h2 className="text-xl font-black uppercase text-black">On Route</h2>
                      <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mt-1">
                          <MapPin size={14} className="text-[#FFC107] fill-black" /> 
                          {address}
                      </p>
                  </div>
                  <div className="text-right">
                      <p className="text-3xl font-black text-black">{eta}</p>
                      <p className="text-xs font-bold text-green-600 uppercase tracking-wide bg-green-100 px-2 py-0.5 rounded-full inline-block">On Time</p>
                  </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Speed</p>
                      <p className="text-lg font-black text-black">{speed} <span className="text-xs font-medium text-gray-400">km/h</span></p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Distance</p>
                      <p className="text-lg font-black text-black">{distance}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Next Stop</p>
                      <p className="text-lg font-black text-black leading-none mt-1">Bejai</p>
                  </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    onClick={handleCallDriver}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                      <Phone size={18} className="mr-2"/> Call Driver
                  </Button>
                  <Button 
                    variant="primary" 
                    fullWidth 
                    className="bg-black text-[#FFC107] hover:bg-gray-900"
                  >
                      <Navigation size={18} className="mr-2"/> Directions
                  </Button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default LiveMapScreen;