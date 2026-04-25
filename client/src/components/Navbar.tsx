import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Link2, Zap } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
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

          <div className="hidden md:flex items-center gap-8">
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
            <Link
              to="/dashboard"
              className="btn-primary px-6 py-3 rounded-xl text-xs active:scale-95"
            >
              Get Started
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black transition-transform active:scale-90">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-50 p-6 space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block text-lg font-black ${isActive(link.to) ? 'text-primary' : 'text-gray-400'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="btn-primary block w-full py-4 rounded-2xl text-center text-sm"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
