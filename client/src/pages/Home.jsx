import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, HeartHandshake, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">You Are Not Alone</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          We provide a safe space to find help, report incidents, and connect with survivors. Your voice matters.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/help" className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
            Find Immediate Help
          </Link>
          <Link to="/report" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition">
            Report Anonymous
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-purple-50 p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-purple-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Safe Reporting</h3>
            <p className="text-gray-600">
              Report incidents anonymously. Your data helps identify patterns and protect others without revealing your identity.
            </p>
          </div>
          
          <div className="bg-pink-50 p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition">
             <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="text-pink-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Get Support</h3>
            <p className="text-gray-600">
              Connect with nearby shelters, hospitals, and therapy centers. We bridge the gap to essential services.
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition">
             <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-blue-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Community</h3>
            <p className="text-gray-600">
              Read stories from other survivors. You are part of a strong community of resilience and hope.
            </p>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">In immediate danger?</h2>
        <p className="mb-6 text-gray-300">Call the National Helpline immediately.</p>
        <a href="tel:1195" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold text-lg transition">
           Call 1195 Now <ArrowRight size={20} />
        </a>
      </div>
    </div>
  );
};

export default Home;
