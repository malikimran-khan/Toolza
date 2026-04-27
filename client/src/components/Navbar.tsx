import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, ChevronDown, Link2, Image as ImageIcon, FileText, User as UserIcon, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { authApi } from '../lib/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('toolza_token'));
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(!!localStorage.getItem('toolza_token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    authApi.logout();
    setIsAuth(false);
    window.location.reload(); // Hard refresh to clear all states
  };

  const handleAuthSuccess = () => {
    setIsAuth(true);
    setIsOpen(false);
  };


  const tools = [
    { to: '/tools/url-mask', label: 'URL Masking', icon: Link2 },
    { to: '/tools/image-convert', label: 'Image Converter', icon: ImageIcon },
    { to: '/tools/pdf-tools', label: 'PDF & Word', icon: FileText },
  ];

  const navLinks = [
    { to: '/', label: 'Overview' },
    { to: '/links', label: 'My Links' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95 shadow-lg">
              <Zap className="w-5 h-5 text-primary fill-primary" />
            </div>
            <span className="text-2xl font-black text-black tracking-tighter">
              Toolza<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {/* Tools Dropdown */}
            <div className="relative">
              <button 
                onMouseEnter={() => setShowTools(true)}
                className="flex items-center gap-1 text-sm font-black text-gray-400 hover:text-black transition-colors"
              >
                Tools <ChevronDown className={`w-4 h-4 transition-transform ${showTools ? 'rotate-180' : ''}`} />
              </button>
              
              {showTools && (
                <div 
                  onMouseLeave={() => setShowTools(false)}
                  className="absolute top-full -left-4 w-56 pt-6 animate-fade-in"
                >
                  <div className="glass-card p-2 bg-white shadow-xl shadow-black/5">
                    {tools.map((tool) => (
                      <Link
                        key={tool.to}
                        to={tool.to}
                        onClick={() => setShowTools(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all ${
                          isActive(tool.to) ? 'bg-primary/5 text-primary' : 'text-gray-400 hover:bg-gray-50 hover:text-black'
                        }`}
                      >
                        <tool.icon className="w-4 h-4" />
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-black transition-colors ${
                  isActive(link.to) ? 'text-primary' : 'text-gray-400 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuth ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-black text-xs font-black hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-gray-400 hover:text-primary hover:bg-primary/5 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary px-6 py-3 rounded-xl text-xs active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black transition-transform active:scale-90">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-50 p-6 space-y-4 animate-fade-in shadow-xl">
          <div className="pb-4 border-b border-gray-50">
            <p className="text-[10px] uppercase font-black text-gray-300 tracking-widest mb-4">Our Tools</p>
            {tools.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 py-3 text-lg font-black text-gray-400 active:text-primary"
              >
                <tool.icon className="w-5 h-5" />
                {tool.label}
              </Link>
            ))}
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-black text-gray-400"
            >
              {link.label}
            </Link>
          ))}
          
          {isAuth ? (
             <div className="space-y-3 pt-4">
               <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="btn-primary block w-full py-4 rounded-2xl text-center text-sm"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-4 rounded-2xl border border-gray-100 text-gray-400 font-bold text-sm"
              >
                Logout
              </button>
             </div>
          ) : (
            <button
              onClick={() => { setShowAuthModal(true); setIsOpen(false); }}
              className="btn-primary block w-full py-4 rounded-2xl text-center text-sm"
            >
              Sign In
            </button>
          )}
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onSuccess={handleAuthSuccess}
      />
    </nav>
  );
}
