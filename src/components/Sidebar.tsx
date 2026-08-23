import React from 'react';
import { 
  Sparkles, 
  Code2, 
  Eye, 
  Bot, 
  Layers, 
  TrendingUp, 
  Settings, 
  ExternalLink,
  Globe,
  Share2,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { NavTab, PortfolioData } from '../types';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  portfolioData: PortfolioData;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  portfolioData,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'editor', label: 'Visual Studio', icon: Code2 },
    { id: 'preview', label: 'Live Preview', icon: Eye, badge: 'Live' },
    { id: 'ai-agent', label: 'AI Copilot & ATS', icon: Bot, badge: 'Gemini' },
    { id: 'templates', label: 'Templates Gallery', icon: Layers },
    { id: 'analytics', label: 'Visitor Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Domain & Export', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-200 flex flex-col justify-between shrink-0 border-r border-slate-800 select-none">
      <div className="p-5 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-lg text-white tracking-tight">Portify</h1>
              <span className="text-[10px] uppercase font-black bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">
                Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">AI Portfolio & Career Engine</p>
          </div>
        </div>

        {/* Live Published Status Pill */}
        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-medium">Live Published Site</span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-xs text-blue-400 truncate">
            <span className="truncate">portify.me/{portfolioData.profile.name.toLowerCase().split(' ')[0]}</span>
            <button
              onClick={() => setActiveTab('preview')}
              className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
              title="Open Live Preview"
            >
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
            Studio Tools
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Gemini'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <img
            src={portfolioData.profile.avatarUrl}
            alt={portfolioData.profile.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-xl object-cover border border-slate-700"
          />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">{portfolioData.profile.name}</div>
            <div className="text-[10px] text-slate-400 truncate">{portfolioData.profile.tagline}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
