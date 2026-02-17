import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, MapPin, AlertTriangle, Menu, X, Heart, Phone, BarChart2, User, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import Button from './ui/Button';

const BottomNav = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    const links = [
        { to: '/', icon: Home, label: 'Home' },
        { to: '/help', icon: MapPin, label: 'Map' },
        { to: '/report', icon: AlertTriangle, label: 'Report' },
        { action: toggleMenu, icon: Menu, label: 'Menu', active: isMenuOpen },
    ];

    const menuItems = [
        { to: '/stories', icon: Heart, label: 'Survivor Stories', color: 'text-pink-600', bg: 'bg-pink-50' },
        { to: '/contacts', icon: Phone, label: 'Emergency Contacts', color: 'text-green-600', bg: 'bg-green-50' },
        { to: '/dashboard', icon: BarChart2, label: 'Data Dashboard', color: 'text-blue-600', bg: 'bg-blue-50' },
    ];

    return (
        <>
            {/* Bottom Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 z-50 flex justify-between items-center shadow-[0_-5px_10px_rgba(0,0,0,0.05)] safe-area-bottom">
                {links.map((link) => {
                    const isActive = link.to ? location.pathname === link.to : link.active;

                    return link.to ? (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={clsx(
                                "flex flex-col items-center gap-1 transition-colors relative min-w-[3.5rem]",
                                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavIndicator"
                                    className="absolute -top-3 w-8 h-1 bg-primary rounded-full"
                                />
                            )}
                            <link.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{link.label}</span>
                        </Link>
                    ) : (
                        <button
                            key="menu"
                            onClick={link.action}
                            className={clsx(
                                "flex flex-col items-center gap-1 transition-colors relative min-w-[3.5rem]",
                                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavIndicator"
                                    className="absolute -top-3 w-8 h-1 bg-primary rounded-full px-4"
                                />
                            )}
                            <link.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{link.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[45] md:hidden backdrop-blur-sm"
                        />

                        {/* Sheet */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 bg-white z-[60] rounded-t-3xl p-6 pb-24 md:hidden shadow-2xl"
                        >
                            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-slate-800">Menu</h3>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500">
                                    <X size={20} />
                                </button>
                            </div>

                            {user && (
                                <div className="bg-slate-50 p-4 rounded-2xl mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{user.username}</p>
                                            <p className="text-xs text-slate-500">Logged In</p>
                                        </div>
                                    </div>
                                    <button onClick={handleLogout} className="text-red-500 p-2 hover:bg-red-50 rounded-full transition">
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            )}

                            <div className="space-y-3">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.to}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-98"
                                    >
                                        <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center", item.bg, item.color)}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-semibold text-slate-700">{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            {!user && (
                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">Login</Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full">Sign Up</Button>
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default BottomNav;
