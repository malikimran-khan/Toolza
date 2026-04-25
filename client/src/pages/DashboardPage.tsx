import { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, Link2, Activity, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import LinkForm from '../components/LinkForm';
import LinkTable from '../components/LinkTable';
import { linkApi, type Link } from '../lib/api';

export default function DashboardPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const response = await linkApi.getAll();
      setLinks(response.data);
    } catch (error) {
      console.error('Failed to fetch links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCreateLink = async (subdomain: string, originalUrl: string) => {
    const response = await linkApi.create(subdomain, originalUrl);
    setLinks((prev) => [response.data, ...prev]);
    toast.success('Link Generated!', {
      style: { background: '#111', color: '#fff', fontWeight: 'bold' }
    });
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await linkApi.delete(id);
      setLinks((prev) => prev.filter((l) => l._id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Error deleting');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-black tracking-tighter mb-2">
              Dashboard<span className="text-primary">.</span>
            </h1>
            <p className="text-gray-400 font-bold text-sm">Manage your masked URLs and track performance.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="glass-card px-6 py-4 flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-lg"><Link2 className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-lg font-black leading-none">{links.length}</p>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mt-1">Links</p>
              </div>
            </div>
            <div className="glass-card px-6 py-4 flex items-center gap-4">
              <div className="bg-orange/10 p-2 rounded-lg"><TrendingUp className="w-5 h-5 text-orange" /></div>
              <div>
                <p className="text-lg font-black leading-none">{links.reduce((s, l) => s + l.clickCount, 0)}</p>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mt-1">Clicks</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="glass-card p-8 sticky top-24 border-primary/20">
              <h2 className="text-xl font-black text-black mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" /> Create New
              </h2>
              <LinkForm onSubmit={handleCreateLink} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <h2 className="text-xl font-black text-black mb-8 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange" /> Recent Activity
              </h2>
              {isLoading ? (
                <div className="py-20 text-center font-bold text-gray-300 animate-pulse">Loading...</div>
              ) : (
                <LinkTable links={links} onDelete={handleDeleteLink} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
