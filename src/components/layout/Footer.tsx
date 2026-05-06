import { Shield, Lock, Cpu, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerLinks } from '@/lib/footerLinks';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="relative mt-auto pt-32 pb-80 md:pt-40 md:pb-44 overflow-hidden border-t-4 border-app bg-app-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Top row: brand + links + status */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Brand */}
          <div className="md:col-span-5 flex items-center gap-4 justify-center md:justify-start text-center md:text-left">
            <div className="w-11 h-11 border-2 border-app bg-black text-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] shrink-0">
              <Terminal size={20} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tighter uppercase italic leading-none">
                DEVSIGNAL{' '}
                <span className="text-accent-indigo not-italic underline decoration-2 underline-offset-4">
                  V2.1
                </span>
              </h2>
              <p className="text-[9px] text-app-muted font-black uppercase tracking-[0.35em] mt-2">
                Intelligent_Developer_Growth_Engine
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="md:col-span-4 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 self-center">
            {footerLinks.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    'text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-accent-indigo transition-colors',
                    link.italic && 'italic'
                  )}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-accent-indigo transition-colors',
                    link.italic && 'italic'
                  )}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Status badges */}
          <div className="md:col-span-3 flex flex-wrap justify-center md:justify-end gap-3 self-center">
            <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-app bg-app-surface shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Shield size={12} strokeWidth={3} className="text-green-600" />
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">
                Secured
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-app bg-app-surface shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Lock size={12} strokeWidth={3} className="text-accent-indigo" />
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">
                Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 md:mt-10 pt-5 border-t-2 border-app flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-app-muted">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span>© 2026 DEVSIGNAL_SYSTEMS</span>
            <span className="w-1.5 h-1.5 bg-black rotate-45" />
            <span className="italic">CORE_ONLINE</span>
          </div>
          <div className="flex items-center gap-2 text-accent-indigo">
            <Cpu size={11} />
            <span>BUILD: SURGICAL_INDUSTRIAL_2.1</span>
          </div>
        </div>
      </div>
      <div className="industrial-grid absolute inset-0 opacity-5 pointer-events-none" />
    </footer>
  );
}
