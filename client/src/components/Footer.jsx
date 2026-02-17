import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-white text-xl font-bold">HerChoice</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering survivors, protecting women. A safe space to find help, report incidents, and connect with a supportive community.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/help" className="hover:text-primary transition-colors">Find Help</a></li>
              <li><a href="/contacts" className="hover:text-primary transition-colors">Emergency Contacts</a></li>
              <li><a href="/report" className="hover:text-primary transition-colors">Report Incident</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/stories" className="hover:text-primary transition-colors">Survivor Stories</a></li>
              <li><a href="/dashboard" className="hover:text-primary transition-colors">Data Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} HerChoice. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
