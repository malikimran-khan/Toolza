import { useState } from 'react';
import { Copy, Check, Trash2, ExternalLink, MousePointerClick, Link2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Link } from '../lib/api';

interface LinkTableProps {
  links: Link[];
  onDelete: (id: string) => void;
}

export default function LinkTable({ links, onDelete }: LinkTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentDomain = window.location.hostname === 'localhost' 
    ? 'localhost:5174' 
    : window.location.hostname;

  const handleCopy = async (link: Link) => {
    const url = `${window.location.protocol}//${currentDomain}/r/${link.subdomain}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(link._id);
      toast.success('Copied!', {
        style: { background: '#111', color: '#fff', fontWeight: 'bold' }
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-10 opacity-50">
        <Link2 className="w-10 h-10 mx-auto mb-2 text-gray-300" />
        <p className="text-sm font-bold">No links created yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="w-full text-left">
        <thead className="text-[10px] uppercase tracking-widest font-black text-gray-400 border-b border-gray-50">
          <tr>
            <th className="pb-4">Link Name</th>
            <th className="pb-4">Clicks</th>
            <th className="pb-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {links.map((link) => (
            <tr key={link._id} className="group transition-colors hover:bg-gray-50/50">
              <td className="py-4 pr-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-black">/r/{link.subdomain}</span>
                  <span className="text-[10px] font-bold text-gray-400 truncate max-w-[150px]">
                    {link.originalUrl.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              </td>
              <td className="py-4">
                <div className="flex items-center gap-1 text-[11px] font-black text-orange">
                  <MousePointerClick className="w-3 h-3" />
                  {link.clickCount}
                </div>
              </td>
              <td className="py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleCopy(link)}
                    className="p-2 rounded-xl hover:bg-orange/10 text-orange transition-all"
                  >
                    {copiedId === link._id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => onDelete(link._id)}
                    className="p-2 rounded-xl hover:bg-primary/10 text-primary transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
