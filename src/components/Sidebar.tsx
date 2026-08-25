import React from 'react';
import { 
  Sparkles, 
  Code2, 
  Eye, 
  Bot, 
  Layers, 
  TrendingUp, 
  Settings, 
  Globe,
  Share2,
  CheckCircle2,
  Sliders,
  Box
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
    { id: '3d-studio' as NavTab, label: '3D Material Studio', icon: Box, badge: '3D' },
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
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Navigate to ${item.label}`}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
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
