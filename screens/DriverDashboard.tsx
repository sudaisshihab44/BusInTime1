import React, { useState } from 'react';
import { MapPin, Users, Navigation, Phone, CheckCircle2, XCircle, Play, Square, Bus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { MOCK_TRIP_STUDENTS, MOCK_STOPS } from '../constants';
import { TripStudent } from '../types';

const DriverDashboard: React.FC = () => {
  const [isTripActive, setIsTripActive] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(2); // Simulating being at 3rd stop
  const [students, setStudents] = useState<TripStudent[]>(MOCK_TRIP_STUDENTS);

  const currentStop = MOCK_STOPS[currentStopIndex];
  const nextStop = MOCK_STOPS[currentStopIndex + 1];

  const toggleTrip = () => setIsTripActive(!isTripActive);

  const handleAttendance = (studentId: string, status: TripStudent['status']) => {
      setStudents(students.map(s => s.id === studentId ? { ...s, status } : s));
  };

  const currentStopStudents = students.filter(s => s.stopId === currentStop.id);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Trip Control Header */}
      <Card className={`border-2 ${isTripActive ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-slate-50'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${isTripActive ? 'bg-green-500 text-white' : 'bg-slate-400 text-slate-100'}`}>
                      <Navigation size={24} />
                  </div>
                  <div>
                      <h2 className="text-lg font-black text-slate-900 uppercase">Route: RT-FALNIR</h2>
                      <p className="text-sm font-medium text-slate-500">{isTripActive ? 'Trip in Progress' : 'Trip Not Started'}</p>
                  </div>
              </div>
              <Button 
                size="lg" 
                variant={isTripActive ? 'danger' : 'primary'} 
                onClick={toggleTrip}
                className="w-full md:w-auto shadow-lg"
                icon={isTripActive ? <Square size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}
              >
                  {isTripActive ? 'End Trip' : 'Start Trip'}
              </Button>
          </div>
      </Card>

      {isTripActive ? (
        <>
            {/* Current Stop Card */}
            <div className="bg-black text-yellow-400 rounded-2xl p-6 shadow-2xl relative overflow-hidden border-2 border-yellow-400">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 opacity-80">
                            <span className="px-2 py-0.5 rounded bg-yellow-400 text-black text-xs font-bold uppercase">Current Stop</span>
                            <span className="text-sm font-mono">{currentStop.time}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none mb-1">{currentStop.name}</h1>
                        <p className="text-slate-400 font-medium text-sm flex items-center gap-1">
                            <MapPin size={14}/> Next: {nextStop ? nextStop.name : 'End of Route'}
                        </p>
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto">
                         <Button className="flex-1 md:flex-none bg-yellow-400 text-black border-none hover:bg-yellow-500">
                             <Navigation size={18} className="mr-2"/> Navigate
                         </Button>
                         <Button className="flex-1 md:flex-none bg-slate-800 text-white border-slate-700 hover:bg-slate-700">
                             Skip Stop
                         </Button>
                    </div>
                </div>
            </div>

            {/* Students at this stop */}
            <div>
                <h3 className="text-lg font-black text-black uppercase mb-3 flex items-center gap-2">
                    <Users size={20}/>
                    Students to Pickup ({currentStopStudents.length})
                </h3>
                
                {currentStopStudents.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                        {currentStopStudents.map(student => (
                            <div key={student.id} className="bg-white p-4 rounded-xl border-2 border-slate-100 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={student.avatarUrl} alt={student.name} className="w-12 h-12 rounded-full border-2 border-slate-100 bg-slate-50"/>
                                    <div>
                                        <p className="font-bold text-slate-900">{student.name}</p>
                                        <p className="text-xs text-slate-500 font-bold">{student.grade}</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2">
                                    {student.status === 'pending' ? (
                                        <>
                                            <button onClick={() => handleAttendance(student.id, 'boarded')} className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 border border-green-200">
                                                <CheckCircle2 size={24} />
                                            </button>
                                            <button onClick={() => handleAttendance(student.id, 'absent')} className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 border border-red-200">
                                                <XCircle size={24} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className={`px-3 py-1 rounded-lg font-bold text-sm uppercase border ${
                                            student.status === 'boarded' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                        }`}>
                                            {student.status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-bold">
                        No students scheduled for this stop.
                    </div>
                )}
            </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-slate-100 text-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-6">
                <Bus size={48} />
            </div>
            <h2 className="text-2xl font-black text-black uppercase mb-2">Ready to Start?</h2>
            <p className="text-slate-500 max-w-sm mb-8">Start the trip to begin tracking location and managing student attendance.</p>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;