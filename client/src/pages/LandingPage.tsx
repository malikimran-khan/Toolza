import { Link } from 'react-router-dom';
import { ArrowRight, Link2, Zap, BarChart3, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8 animate-fade-in">
            <Zap className="w-3 h-3" />
            Fastest URL Redirection
          </div>

          <h1 className="text-5xl sm:text-7xl font-black text-black tracking-tighter leading-[0.9] mb-8 animate-fade-in-up">
            Mask Your URLs <br /> 
            <span className="gradient-text">Beautifully.</span>
          </h1>

          <p className="text-lg text-gray-500 font-bold max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Replace ugly, long links with brandable, short paths. <br className="hidden sm:block" /> 
            Transform <span className="text-black underline cursor-help">vercel.app/r/name</span> into your secret weapon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/dashboard"
              className="btn-primary flex items-center gap-2 px-10 py-5 rounded-2xl text-lg active:scale-95"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/links"
              className="px-10 py-5 text-black font-black text-lg hover:text-primary transition-colors"
            >
              View My Links
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Link2, color: 'text-primary', title: 'Branded Paths', desc: 'Use /r/custom to make your links professional and memorable.' },
              { icon: BarChart3, color: 'text-orange', title: 'Real-time Stats', desc: 'Track exactly how many people click your masked URLs instantly.' },
              { icon: Globe, color: 'text-black', title: 'Global Speed', desc: 'Our redirection engine is optimized for lightning-fast performance.' }
            ].map((f, i) => (
              <div key={i} className="glass-card p-10 hover:border-primary/20 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="text-xl font-black text-black mb-3">{f.title}</h3>
                <p className="text-gray-400 font-bold text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-black mb-12">Build Trust with Every Click.</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              'No account required to start',
              'Lightning fast 301 redirects',
              'Mobile friendly dashboard',
              'Secure link protection'
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-4 glass-card">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-bold text-sm text-gray-700">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 bg-black rounded-[40px] py-16 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
          </div>
          <h2 className="text-4xl font-black mb-6 relative z-10">Ready to mask your first link?</h2>
          <p className="text-gray-400 font-bold mb-10 relative z-10">Join thousands of developers using Toolza for cleaner sharing.</p>
          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center gap-2 px-12 py-5 rounded-2xl text-lg relative z-10 active:scale-95"
          >
            Create Link Now
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-50 text-center">
        <p className="text-[10px] uppercase font-black tracking-widest text-gray-300">© 2026 Toolza — Powered by Red & Orange</p>
      </footer>
    </div>
  );
}
