import { useState } from 'react';
import { Upload, ImageIcon, Download, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ImageConvertPage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState('png');
  const [isConverting, setIsConverting] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const formats = ['png', 'jpg', 'webp', 'bmp', 'tiff', 'ico'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResultUrl(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('format', targetFormat);

    try {
      const response = await axios.post('/api/convert', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setResultUrl(url);
      toast.success('Converted successfully!');
    } catch (error) {
      console.error('Conversion failed:', error);
      toast.error('Conversion failed. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
            <h1 className="text-4xl font-black text-black tracking-tighter mb-2">
              Image Converter<span className="text-orange">.</span>
            </h1>
            <p className="text-gray-400 font-bold text-sm">Convert any image format instantly with high-fidelity output.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-orange/20">
                <div className="mb-6">
                    <label className="text-sm font-black text-gray-900 flex items-center gap-2 mb-4">
                        <Upload className="w-4 h-4 text-orange" />
                        Upload Image
                    </label>
                    <div className="relative group border-2 border-dashed border-gray-100 rounded-2xl p-10 text-center hover:border-orange/30 transition-all cursor-pointer">
                        <input 
                            type="file" 
                            onChange={handleFileChange}
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                        />
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-orange/5 flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-orange" />
                            </div>
                            <p className="text-sm font-bold text-gray-400">
                                {file ? file.name : 'Click to select or drag & drop'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="text-sm font-black text-gray-900 flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-orange" />
                        Target Format
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {formats.map((f) => (
                            <button
                                key={f}
                                onClick={() => setTargetFormat(f)}
                                className={`py-2 text-[10px] uppercase font-black tracking-widest rounded-xl border transition-all ${
                                    targetFormat === f 
                                    ? 'bg-orange text-white border-orange shadow-lg shadow-orange/20' 
                                    : 'border-gray-50 text-gray-400 hover:border-orange/20 hover:text-black'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleConvert}
                    disabled={!file || isConverting}
                    className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm active:scale-95 disabled:opacity-50"
                >
                    {isConverting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Convert Now'}
                </button>
            </div>

            <div className="flex flex-col gap-6">
                <div className="glass-card p-6 bg-gray-50/50 border-transparent">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertCircle className="w-5 h-5 text-gray-300" />
                        <h3 className="text-sm font-black">Conversion Info</h3>
                    </div>
                    <ul className="space-y-3">
                        {['Supports HEIC & RAW', 'Max file size 20MB', 'Secure processing', 'Batch coming soon'].map((info, i) => (
                            <li key={i} className="text-[11px] font-bold text-gray-400 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-orange"></div>
                                {info}
                            </li>
                        ))}
                    </ul>
                </div>

                {resultUrl && (
                    <div className="glass-card p-8 border-success/20 animate-fade-in">
                        <h3 className="text-sm font-black mb-6">Result Available</h3>
                        <a 
                            href={resultUrl} 
                            download={`converted.${targetFormat}`}
                            className="flex items-center justify-between p-4 rounded-2xl bg-success/5 border border-success/10 text-success font-black text-xs hover:bg-success/10 transition-all"
                        >
                            <span className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                {`converted.${targetFormat}`}
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
