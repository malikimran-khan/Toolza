import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { authApi } from '../lib/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  if (!isOpen) return null;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await authApi.login(formData.email, formData.password);
        toast.success('Welcome back!');
      } else {
        await authApi.register(formData.name, formData.email, formData.password);
        toast.success('Account created!');
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (response: any) => {
    setIsLoading(true);
    try {
      await authApi.googleLogin(response.credential);
      toast.success('Logged in with Google!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative my-auto w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="p-8 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-black tracking-tighter mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
              <span className="gradient-text">.</span>
            </h2>
            <p className="text-text-dim font-bold text-sm">
              {isLogin ? 'Sign in to access all tools' : 'Join us to convert and mask URLs'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder-gray-300 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder-gray-300 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder-gray-300 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black text-gray-300">
              <span className="px-4 bg-white">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
             <GoogleLogin 
               onSuccess={handleGoogleSuccess}
               onError={() => toast.error('Google sign in failed')}
               theme="outline"
               shape="pill"
               width="336"
             />
          </div>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-8 text-sm font-bold text-gray-400 hover:text-primary transition-colors"
          >
            {isLogin ? (
              <>Don't have an account? <span className="text-primary">Sign up</span></>
            ) : (
              <>Already have an account? <span className="text-primary">Sign in</span></>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
