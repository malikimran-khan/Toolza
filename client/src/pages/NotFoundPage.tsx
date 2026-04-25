import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-6 animate-float">
          <AlertTriangle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-6xl font-black gradient-text mb-3">404</h1>
        <h2 className="text-xl font-bold text-text mb-2">Page Not Found</h2>
        <p className="text-text-secondary text-sm mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-orange hover:from-primary-dark hover:to-orange-dark text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
