import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, MapPin, Phone, BookOpen, BarChart2, LogOut, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-brand-accent" />
              <span className="ml-2 text-xl font-bold text-gray-800">HerChoice</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/help" className="text-gray-600 hover:text-brand-purple flex items-center gap-1">
              <MapPin size={18} /> Find Help
            </Link>
            <Link to="/report" className="text-gray-600 hover:text-brand-purple flex items-center gap-1">
              <BookOpen size={18} /> Report
            </Link>
            <Link to="/stories" className="text-gray-600 hover:text-brand-purple flex items-center gap-1">
              <Heart size={18} /> Stories
            </Link>
            <Link to="/contacts" className="text-gray-600 hover:text-brand-purple flex items-center gap-1">
              <Phone size={18} /> Contacts
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-brand-purple flex items-center gap-1">
              <BarChart2 size={18} /> Dashboard
            </Link>

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <span className="text-gray-700 font-medium flex items-center gap-1">
                  <User size={16} /> {user.username}
                </span>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 flex items-center gap-1">
                  <LogOut size={18} /> Logout
                </button>
                <Link to="/report" className="bg-brand-accent text-white px-4 py-2 rounded-md hover:bg-pink-600 transition">
                  I Need Help
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-4">
                <Link to="/login" className="text-gray-600 hover:text-brand-purple font-medium">Login</Link>
                <Link to="/register" className="bg-brand-purple text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-purple"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/help" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50" onClick={toggleMenu}>Find Help</Link>
            <Link to="/report" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50" onClick={toggleMenu}>Report Incident</Link>
            <Link to="/stories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50" onClick={toggleMenu}>Stories</Link>
            <Link to="/contacts" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50" onClick={toggleMenu}>Emergency Contacts</Link>
            <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50" onClick={toggleMenu}>Data Dashboard</Link>
            {user ? (
              <>
                <div className="border-t border-gray-100 my-2"></div>
                <span className="block px-3 py-2 text-base font-medium text-gray-500">Logged in as {user.username}</span>
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-100 my-2"></div>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50" onClick={toggleMenu}>Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-brand-purple font-bold hover:bg-purple-50" onClick={toggleMenu}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
