import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FindHelp from './pages/FindHelp';
import ReportIncident from './pages/ReportIncident';
import Stories from './pages/Stories';
import Contacts from './pages/Contacts';
import Dashboard from './pages/Dashboard';
import Education from './pages/Education';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import BottomNav from './components/BottomNav';
import QuickExitButton from './components/QuickExitButton';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans pt-16 pb-16 md:pb-0">
          <Navbar />
          <QuickExitButton />
          <main className="flex-grow bg-slate-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/help" element={<FindHelp />} />
              <Route path="/report" element={<ReportIncident />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/education" element={<Education />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
