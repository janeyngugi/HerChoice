import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, HeartHandshake, Phone, AlertTriangle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const [sosActive, setSosActive] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-8 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-3xl"></div>
        {/* Additional blob for desktop balance */}
        <div className="hidden md:block absolute bottom-[10%] right-[20%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 pt-8 md:pt-12 relative z-10">

        <div className="md:grid md:grid-cols-12 md:gap-12 md:items-center">
          {/* Left Column (Desktop) / Top Section (Mobile) - SOS & Header */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start mb-12 md:mb-0">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center md:text-left mb-8 md:mb-12"
            >
              <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
                Are you in an <span className="text-danger">emergency?</span>
              </h1>
              <p className="text-slate-500 text-base md:text-lg max-w-md mx-auto md:mx-0">
                Press the button below for immediate help. We will contact emergency services and your trusted contacts.
              </p>
            </motion.div>

            {/* SOS Button */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative mb-8 md:mb-0"
            >
              {/* Pulse Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-danger/10 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-danger/20 rounded-full animate-pulse"></div>

              <a href="tel:1195" className="relative z-10 block">
                <button
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-xl shadow-red-500/40 flex flex-col items-center justify-center text-white transition-transform active:scale-95 hover:scale-105 group"
                >
                  <span className="text-4xl md:text-5xl font-black tracking-wider mb-2">SOS</span>
                  <Phone className="h-6 w-6 md:h-8 md:w-8 animate-bounce" />
                </button>
              </a>
            </motion.div>

            {/* Status Card (Mobile location: Bottom, here for Desktop visual flow if needed, but keeping separate for now) */}
          </div>

          {/* Right Column (Desktop) / Bottom Section (Mobile) - Quick Actions */}
          <div className="md:col-span-7 w-full max-w-md md:max-w-none mx-auto">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full mb-8"
            >
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shrink-0"></div>
                <p className="text-sm font-medium text-slate-600">
                  You are in a safe zone. <br />
                  <span className="text-xs text-slate-400">Location tracking active for emergency response.</span>
                </p>
              </div>
            </motion.div>

            <h2 className="text-xl font-bold text-slate-800 mb-6 hidden md:block">Quick Actions</h2>

            {/* Quick Actions Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 w-full"
            >
              <Link to="/help" className="col-span-1">
                <motion.div variants={itemVariants} whileTap={{ scale: 0.98 }} whileHover={{ y: -5 }} className="h-full">
                  <Card className="h-full flex flex-col items-center justify-center p-6 md:p-8 bg-white border-none shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="bg-primary/10 p-3 md:p-4 rounded-full mb-3 md:mb-4 text-primary">
                      <MapPin size={24} className="md:w-8 md:h-8" />
                    </div>
                    <span className="font-bold text-slate-700 md:text-lg">Find Safe Places</span>
                    <p className="text-xs text-slate-400 mt-2 text-center hidden md:block">Locate nearby shelters and hospitals</p>
                  </Card>
                </motion.div>
              </Link>

              <Link to="/report" className="col-span-1">
                <motion.div variants={itemVariants} whileTap={{ scale: 0.98 }} whileHover={{ y: -5 }} className="h-full">
                  <Card className="h-full flex flex-col items-center justify-center p-6 md:p-8 bg-white border-none shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="bg-accent/10 p-3 md:p-4 rounded-full mb-3 md:mb-4 text-accent">
                      <AlertTriangle size={24} className="md:w-8 md:h-8" />
                    </div>
                    <span className="font-bold text-slate-700 md:text-lg">Report Incident</span>
                    <p className="text-xs text-slate-400 mt-2 text-center hidden md:block">Anonymously report gender-based violence</p>
                  </Card>
                </motion.div>
              </Link>

              <Link to="/contacts" className="col-span-1">
                <motion.div variants={itemVariants} whileTap={{ scale: 0.98 }} whileHover={{ y: -5 }} className="h-full">
                  <Card className="h-full flex flex-col items-center justify-center p-6 md:p-8 bg-white border-none shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="bg-secondary/10 p-3 md:p-4 rounded-full mb-3 md:mb-4 text-secondary">
                      <Users size={24} className="md:w-8 md:h-8" />
                    </div>
                    <span className="font-bold text-slate-700 md:text-lg">My Contacts</span>
                    <p className="text-xs text-slate-400 mt-2 text-center hidden md:block">Manage emergency contacts</p>
                  </Card>
                </motion.div>
              </Link>

              <Link to="/stories" className="col-span-1">
                <motion.div variants={itemVariants} whileTap={{ scale: 0.98 }} whileHover={{ y: -5 }} className="h-full">
                  <Card className="h-full flex flex-col items-center justify-center p-6 md:p-8 bg-white border-none shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="bg-purple-100 p-3 md:p-4 rounded-full mb-3 md:mb-4 text-purple-600">
                      <HeartHandshake size={24} className="md:w-8 md:h-8" />
                    </div>
                    <span className="font-bold text-slate-700 md:text-lg">Community</span>
                    <p className="text-xs text-slate-400 mt-2 text-center hidden md:block">Read survivor stories and support others</p>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;

