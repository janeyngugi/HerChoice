import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Phone, BookOpen, BarChart2, LogOut, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Button from './ui/Button';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className="flex items-center gap-1.5 text-slate-600 hover:text-primary font-medium transition-colors"
    >
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-full group-hover:scale-105 transition-transform">
              <Heart className="h-6 w-6 text-primary fill-primary/20" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HerChoice
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center space-x-8">
            <NavLink to="/help" icon={MapPin}>Find Help</NavLink>
            <NavLink to="/report" icon={BookOpen}>Report</NavLink>
            <NavLink to="/stories" icon={Heart}>Stories</NavLink>
            <NavLink to="/education" icon={BookOpen}>Education</NavLink>
            <NavLink to="/contacts" icon={Phone}>Contacts</NavLink>
            <NavLink to="/dashboard" icon={BarChart2}>Dashboard</NavLink>

            <div className="pl-4 border-l border-slate-200 flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <User size={16} />
                    </div>
                    {user.username}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut size={16} className="mr-2" /> Logout
                  </Button>
                  <Link to="/report">
                    <Button variant="danger" size="sm">I Need Help</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Profile Icon (Optional, maybe just keep logo for now) */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <Link to="/dashboard" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <User size={20} />
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
