import { useState, useEffect } from 'react';
import { Link2, Search, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import LinkTable from '../components/LinkTable';
import { linkApi, type Link } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('toolza_token')) {
      toast.error('Please sign in to view your links');
      navigate('/');
    }
  }, []);


  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const response = await linkApi.getAll();
      setLinks(response.data);
      setFilteredLinks(response.data);
    } catch (error) {
      console.error('Failed to fetch links:', error);
      toast.error('Failed to load links');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLinks(links);
      return;
    }
    const query = searchQuery.toLowerCase();
    setFilteredLinks(
      links.filter(
        (link) =>
          link.subdomain.toLowerCase().includes(query) ||
          link.originalUrl.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, links]);

  const handleDeleteLink = async (id: string) => {
    try {
      await linkApi.delete(id);
      setLinks((prev) => prev.filter((l) => l._id !== id));
      toast.success('Link deleted', {
        icon: '🗑️',
        style: {
          background: '#ffffff',
          color: '#111111',
          border: '1px solid #E9ECEF',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      });
    } catch {
      toast.error('Failed to delete link');
    }
  };

  return (
    <div className="min-h-screen bg-bg-soft pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-orange/10 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text">My Links</h1>
            </div>
            <p className="text-text-secondary text-sm ml-[52px]">
              All your generated URLs in one place
            </p>
          </div>

          <button
            onClick={fetchLinks}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2.5 card text-sm font-medium text-text-secondary hover:text-text hover:border-border-dark transition-all duration-200 self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-text-light" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or URL..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl text-text placeholder-text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Links Table */}
        <div className="card-elevated p-6 sm:p-7 animate-fade-in-up" style={{ animationDelay: '160ms' }}>
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-xs text-text-muted">Loading your links...</p>
              </div>
            </div>
          ) : (
            <>
              {searchQuery && (
                <p className="text-sm text-text-muted mb-4">
                  Showing {filteredLinks.length} of {links.length} links
                </p>
              )}
              <LinkTable links={filteredLinks} onDelete={handleDeleteLink} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
