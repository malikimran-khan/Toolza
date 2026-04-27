import { useState } from 'react';
import { FileText, Upload, Download, Loader2, Plus, X, Globe, Sparkles, ListOrdered } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

type ToolType = 'img-to-pdf' | 'pdf-to-word' | 'pdf-to-img' | 'merge-pdf';

export default function PdfToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolType>('img-to-pdf');
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const tools = [
    { id: 'img-to-pdf', label: 'Image to PDF', icon: Upload },
    { id: 'pdf-to-word', label: 'PDF to Word', icon: FileText },
    { id: 'pdf-to-img', label: 'PDF to Image', icon: Globe },
    { id: 'merge-pdf', label: 'Merge PDFs', icon: ListOrdered },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (activeTool === 'pdf-to-word' || activeTool === 'pdf-to-img') {
        setFiles([newFiles[0]]); // Only one file for these
      } else {
        setFiles([...files, ...newFiles]);
      }
      setResultUrl(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    
    // Check for authentication
    const token = localStorage.getItem('toolza_token');
    if (!token) {
      toast.error('Account required. Please sign in to use this service.', {
        icon: '🔒',
        duration: 4000
      });
      return;
    }

    setIsProcessing(true);
    
    const formData = new FormData();
    let endpoint = '';

    if (activeTool === 'img-to-pdf') {
      files.forEach(f => formData.append('images', f));
      endpoint = '/api/pdf/from-images';
    } else if (activeTool === 'pdf-to-word') {
      formData.append('pdf', files[0]);
      endpoint = '/api/pdf/to-word';
    } else if (activeTool === 'pdf-to-img') {
      formData.append('pdf', files[0]);
      endpoint = '/api/pdf/to-images';
    } else if (activeTool === 'merge-pdf') {
      files.forEach(f => formData.append('pdfs', f));
      endpoint = '/api/pdf/merge';
    }

    try {
      const response = await axios.post(endpoint, formData, { 
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setResultUrl(url);
      toast.success('Done!');
    } catch (e: any) {
      if (e.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('toolza_token');
      } else {
        toast.error('Processing failed');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-black tracking-tighter mb-2">
            PDF Toolkit<span className="text-primary">.</span>
          </h1>
          <p className="text-gray-400 font-bold text-sm">Professional PDF & Word conversion engine.</p>
        </header>

        {/* Tool Switcher */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTool(t.id as ToolType); setFiles([]); setResultUrl(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTool === t.id 
                ? 'bg-black text-white shadow-xl shadow-black/10 scale-105' 
                : 'bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-10 border-primary/10">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[30px] p-12 hover:border-primary/30 transition-all relative group cursor-pointer">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  multiple={activeTool === 'img-to-pdf' || activeTool === 'merge-pdf'}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
                <div className="w-16 h-16 rounded-[24px] bg-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-black text-black">Click to upload or drag files</p>
                <p className="text-[10px] uppercase font-black text-gray-300 tracking-widest mt-2">
                  {activeTool === 'img-to-pdf' ? 'Multiple Images' : 'PDF Document'}
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-8 space-y-2 animate-fade-in">
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-4">Selected Files ({files.length})</p>
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-4 min-w-0">
                        <FileText className="w-5 h-5 text-gray-300 shrink-0" />
                        <span className="text-xs font-bold text-black truncate">{file.name}</span>
                      </div>
                      <button onClick={() => removeFile(i)} className="p-2 text-gray-300 hover:text-primary transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {files.length > 0 && (
                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="btn-primary w-full py-5 rounded-2xl mt-8 flex items-center justify-center gap-2 text-sm active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Convert Now'}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8 bg-black text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
               <h3 className="text-sm font-black mb-4 flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-primary" /> Info
               </h3>
               <p className="text-[11px] font-bold text-gray-400 leading-relaxed">
                 {activeTool === 'pdf-to-word' 
                   ? 'Uses AI-powered conversion to preserve layout and text flow.' 
                   : 'Secure server-side processing. All files are deleted after conversion.'}
               </p>
            </div>

            {resultUrl && (
              <div className="glass-card p-8 border-success/20 animate-fade-in-up">
                <p className="text-[10px] uppercase font-black text-primary tracking-widest mb-6">Processing Complete</p>
                <a 
                  href={resultUrl} 
                  download={activeTool === 'pdf-to-img' ? 'pdf_pages.zip' : (activeTool === 'pdf-to-word' ? 'converted.docx' : 'result.pdf')}
                  className="flex items-center justify-between p-5 rounded-2xl bg-primary text-white font-black text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                >
                  <span className="flex items-center gap-3">
                    <Download className="w-4 h-4" />
                    Download Result
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
