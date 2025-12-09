import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import ParentDashboard from './screens/ParentDashboard';
import LiveMapScreen from './screens/LiveMapScreen';
import ChildStatusScreen from './screens/ChildStatusScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import DriversManagement from './screens/admin/DriversManagement';
import ParentsManagement from './screens/admin/ParentsManagement';
import FleetManagement from './screens/admin/FleetManagement';
import SchoolDashboard from './screens/SchoolDashboard';
import StudentsManagement from './screens/admin/StudentsManagement';
import DriverDashboard from './screens/DriverDashboard';
import Layout from './components/Layout';

// A wrapper to handle layout conditionally
const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen text-slate-900 font-sans bg-gray-50">
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Parent Routes */}
            <Route path="/dashboard" element={<ParentDashboard />} />
            <Route path="/map/:childId" element={<LiveMapScreen />} />
            <Route path="/status/:childId" element={<ChildStatusScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            
            {/* School Admin Routes */}
            <Route path="/admin/dashboard" element={<SchoolDashboard />} />
            <Route path="/admin/students" element={<StudentsManagement />} />
            <Route path="/admin/drivers" element={<DriversManagement />} />
            <Route path="/admin/parents" element={<ParentsManagement />} />
            <Route path="/admin/fleet" element={<FleetManagement />} />
            
            {/* Driver Routes */}
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
          </Routes>
        </Layout>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;