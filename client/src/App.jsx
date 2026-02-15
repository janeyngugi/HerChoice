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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow bg-slate-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/help" element={<FindHelp />} />
            <Route path="/report" element={<ReportIncident />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
