import { Link } from 'react-router-dom';
import { ArrowRight, Link2, Zap, BarChart3, Globe, Sparkles, CheckCircle2, Image as ImageIcon, FileText, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const tools = [
    {
      id: 'url-mask',
      title: 'URL Masking',
      description: 'Transform long URLs into clean, branded /r/ links with real-time stats.',
      icon: Link2,
      color: 'text-primary',
      bg: 'bg-primary/5',
      to: '/tools/url-mask',
      status: 'Live'
    },
    {
      id: 'image-convert',
      title: 'Image Converter',
      description: 'Convert HEIC, RAW, TIFF to JPG, PNG, WEBP with high quality output.',
      icon: ImageIcon,
      color: 'text-orange',
      bg: 'bg-orange/5',
      to: '/tools/image-convert',
      status: 'Live'
    },
    {
      id: 'pdf-tools',
      title: 'PDF & Word',
      description: 'Convert images to PDF and PDF to Word. Simple, fast and secure.',
      icon: FileText,
      color: 'text-black',
      bg: 'bg-gray-100',
      to: '/tools/pdf-tools',
      status: 'Beta'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8">
            <Zap className="w-3 h-3" />
            All-in-One Digital Toolkit
          </div>

          <h1 className="text-5xl sm:text-7xl font-black text-black tracking-tighter leading-[0.9] mb-8 animate-fade-in-up">
            Tools for the <br /> 
            <span className="gradient-text">Modern Web.</span>
          </h1>

          <p className="text-lg text-gray-500 font-bold max-w-2xl mx-auto mb-16 animate-fade-in-up">
            Simplify your workflow with our production-ready conversion tools. <br />
            Secure, fast, and 100% free.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                to={tool.to}
                className="glass-card p-8 group border-transparent hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${tool.status === 'Live' ? 'bg-success/10 text-success' : 'bg-orange/10 text-orange'}`}>
                  {tool.status}
                </div>
                <div className={`w-12 h-12 rounded-2xl ${tool.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <tool.icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <h3 className="text-xl font-black text-black mb-3 flex items-center gap-2">
                  {tool.title}
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                </h3>
                <p className="text-gray-400 font-bold text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
                <div className="text-xs font-black text-primary group-hover:underline">
                  Launch Tool
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-24 border-t border-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-black text-black mb-12">One Dashboard. Total Control.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Total Conversions', value: '1.2M+' },
                    { label: 'Active Users', value: '50K+' },
                    { label: 'Success Rate', value: '99.9%' },
                    { label: 'Avg Speed', value: '250ms' }
                ].map((stat, i) => (
                    <div key={i} className="p-6">
                        <p className="text-4xl font-black text-black mb-1">{stat.value}</p>
                        <p className="text-[10px] uppercase font-black text-gray-300 tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-50 text-center">
        <p className="text-[10px] uppercase font-black tracking-widest text-gray-300">© 2026 Toolza — The Ultimate Utility Hub</p>
      </footer>
    </div>
  );
}
