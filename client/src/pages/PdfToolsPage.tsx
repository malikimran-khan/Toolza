import { useState } from 'react';
import { FileText, Upload, Download, Loader2, Plus, X, Globe } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PdfToolsPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
      setResultUrl(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleGeneratePdf = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    try {
      const response = await axios.post('/api/pdf/from-images', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setResultUrl(url);
      toast.success('PDF created successfully!');
    } catch (error) {
      console.error('PDF creation failed:', error);
      toast.error('Failed to create PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
            <h1 className="text-4xl font-black text-black tracking-tighter mb-2">
              PDF Toolkit<span className="text-primary-dark">.</span>
            </h1>
            <p className="text-gray-400 font-bold text-sm">Convert images to PDF or PDF to Word with precision.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
                <h2 className="text-lg font-black mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Images to PDF
                </h2>

                <div className="mb-6">
                    <div className="relative group border-2 border-dashed border-gray-100 rounded-2xl p-6 text-center hover:border-primary/30 transition-all cursor-pointer">
                        <input 
                            type="file" 
                            onChange={handleFileChange}
                            multiple
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                        />
                        <div className="flex items-center justify-center gap-3">
                            <Plus className="w-4 h-4 text-primary" />
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Add Images</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mb-8 max-h-60 overflow-y-auto">
                    {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3 min-w-0">
                                <Globe className="w-4 h-4 text-gray-300" />
                                <span className="text-[10px] font-bold truncate max-w-[150px]">{file.name}</span>
                            </div>
                            <button onClick={() => removeFile(i)} className="text-gray-300 hover:text-primary transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {files.length === 0 && <p className="text-center text-[10px] font-bold text-gray-300 py-4">No images selected</p>}
                </div>

                <button
                    onClick={handleGeneratePdf}
                    disabled={files.length === 0 || isProcessing}
                    className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm active:scale-95 disabled:opacity-50"
                >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create PDF'}
                </button>
            </div>

            <div className="flex flex-col gap-6">
                <div className="glass-card p-8 bg-black text-white">
                    <h3 className="text-sm font-black mb-2 text-primary">PDF to Word</h3>
                    <p className="text-[11px] font-bold text-gray-400 leading-relaxed mb-6"> Our high-accuracy AI conversion engine is being prepared. Stay tuned!</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest">
                        Status: coming soon
                    </div>
                </div>

                {resultUrl && (
                    <div className="glass-card p-8 border-primary/20 animate-fade-in shadow-xl shadow-primary/5">
                        <h3 className="text-sm font-black mb-6">Your PDF is ready</h3>
                        <a 
                            href={resultUrl} 
                            download="generated_toolkit.pdf"
                            className="flex items-center justify-between p-4 rounded-2xl bg-primary text-white font-black text-xs hover:scale-[1.02] transition-all"
                        >
                            <span className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Download PDF
                            </span>
                            <Download className="w-4 h-4" />
                        </a>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
