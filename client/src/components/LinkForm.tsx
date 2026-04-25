import { useState } from 'react';
import { Link2, Globe, Loader2, Sparkles, Send } from 'lucide-react';

interface LinkFormProps {
  onSubmit: (subdomain: string, originalUrl: string) => Promise<void>;
}

export default function LinkForm({ onSubmit }: LinkFormProps) {
  const [subdomain, setSubdomain] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Automatically detect domain for preview
  const currentDomain = window.location.hostname === 'localhost' 
    ? 'localhost:5174' 
    : window.location.hostname;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!subdomain.trim() || !originalUrl.trim()) {
      setError('Please fill in both fields');
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(subdomain.toLowerCase().trim(), originalUrl.trim());
      setSubdomain('');
      setOriginalUrl('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange" />
          Custom Name
        </label>
        <div className="relative group">
          <input
            type="text"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            placeholder="e.g., numan"
            className="input-field w-full pl-4 pr-12 text-black font-medium"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
            /r/{subdomain || '...'}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-orange" />
          Target URL
        </label>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="e.g., https://imran.vercel.app"
          className="input-field w-full text-black"
        />
      </div>

      {subdomain && (
        <div className="p-4 rounded-2xl bg-orange/5 border border-orange/10 animate-fade-in">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Generated URL Preview</p>
          <p className="text-sm font-bold text-black break-all">
            {currentDomain}/r/<span className="text-primary">{subdomain}</span>
          </p>
        </div>
      )}

      {error && <p className="text-xs font-bold text-primary animate-fade-in">⚠️ {error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm active:scale-95 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Generate Masked Link</>}
      </button>
    </form>
  );
}
