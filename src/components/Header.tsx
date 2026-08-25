import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Share2, 
  Check, 
  Copy, 
  ExternalLink, 
  Globe, 
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { PortfolioData } from '../types';

interface HeaderProps {
  portfolioData: PortfolioData;
  onPreviewClick: () => void;
  onAiClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  portfolioData,
  onPreviewClick,
  onAiClick,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const shareUrl = portfolioData.publishedUrl || `https://${portfolioData.profile.name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'aminaajaz'}.portify.me`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-10 shadow-xs">
        {/* Left: Breadcrumbs & Active Profile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {portfolioData.profile.name}'s Portfolio
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Autosaved</span>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onAiClick}
            aria-label="Open AI Copilot and ATS audit"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          <button
            onClick={onPreviewClick}
            aria-label="Open Live Portfolio Preview"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:outline-none"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>Live Preview</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            aria-label="Publish and share portfolio link"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Publish & Share</span>
          </button>
        </div>
      </header>

      {/* Share Modal Dialog */}
      {isShareModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
        >
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="share-dialog-title" className="font-bold text-sm text-slate-900">Your Portfolio is Live!</h3>
                  <p className="text-[11px] text-slate-400">Accessible globally with edge caching</p>
                </div>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                aria-label="Close share dialog"
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 text-xs font-bold cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-700 truncate pr-2">{shareUrl}</span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition cursor-pointer shadow-xs shrink-0"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSL Certificate active & DNS propagation completed</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Done
              </button>
              <button
                onClick={() => {
                  setIsShareModalOpen(false);
                  onPreviewClick();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1"
              >
                <span>Open Full Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
