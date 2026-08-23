import React, { useState } from 'react';
import { 
  Globe, 
  Share2, 
  FileCode, 
  Download, 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Printer
} from 'lucide-react';
import { PortfolioData } from '../types';

interface SettingsViewProps {
  data: PortfolioData;
  onChange: (updated: PortfolioData) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ data, onChange }) => {
  const [subdomain, setSubdomain] = useState(() => {
    return data.publishedUrl
      ? data.publishedUrl.replace(/^https?:\/\//, '').split('.')[0]
      : data.profile.name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'aminaajaz';
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${subdomain}.portify.me`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${data.profile.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portfolio Settings & Deployment</h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live On Edge
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure custom domains, SEO OpenGraph cards, and export standalone static bundles.
          </p>
        </div>

        {savedSettings && (
          <div className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved & Deployed!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subdomain & Custom Domain */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Hosting & Portify Subdomain</span>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Your Free Portify Subdomain</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-r-0 border-slate-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-slate-900 font-bold"
                />
                <span className="bg-slate-100 border border-slate-200 px-3.5 py-2.5 rounded-r-xl text-slate-500 font-mono">
                  .portify.me
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-mono text-slate-600">https://{subdomain}.portify.me</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 transition cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="pt-2">
              <label className="font-bold text-slate-700 block mb-1">Custom Apex Domain (Optional)</label>
              <input
                type="text"
                placeholder="e.g. yourname.com"
                value={data.customDomain || ''}
                onChange={(e) => onChange({ ...data, customDomain: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono text-xs"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Point a CNAME record to <code className="text-blue-600 font-mono">cname.portify.me</code> in your DNS settings.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                Save Domain Settings
              </button>
            </div>
          </form>
        </div>

        {/* SEO & Social OpenGraph Card Preview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
            <Share2 className="w-4 h-4 text-purple-600" />
            <span>Social Sharing & OpenGraph Preview</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">SEO Title</label>
              <input
                type="text"
                value={data.seoTitle || `${data.profile.name} — ${data.profile.tagline}`}
                onChange={(e) => onChange({ ...data, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">SEO Description</label>
              <textarea
                rows={2}
                value={data.seoDescription || data.profile.headline}
                onChange={(e) => onChange({ ...data, seoDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 font-medium"
              />
            </div>

            {/* Social Card Preview Box */}
            <div className="bg-slate-900 rounded-xl p-4 text-white space-y-2 border border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-400">Twitter / LinkedIn Card Preview</div>
              <div className="h-28 rounded-lg overflow-hidden bg-slate-950 relative">
                <img
                  src={data.projects[0]?.thumbnailUrl || data.profile.avatarUrl}
                  alt="OG Banner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-3">
                  <div>
                    <div className="font-bold text-xs">{data.profile.name} • Portfolio</div>
                    <div className="text-[10px] text-slate-300 line-clamp-1">{data.profile.tagline}</div>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">portify.me/{subdomain}</div>
            </div>
          </div>
        </div>

        {/* Export & Data Backup */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export & Data Portability</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-blue-600" /> Export JSON Data
                </h4>
                <p className="text-slate-500 text-[11px]">
                  Download a full backup of all profile, projects, work history, and theme settings.
                </p>
              </div>
              <button
                onClick={handleExportJSON}
                className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg border border-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" /> Download JSON
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Printer className="w-4 h-4 text-purple-600" /> Print / Save as PDF
                </h4>
                <p className="text-slate-500 text-[11px]">
                  Trigger your browser's PDF print layout optimized for standard A4 resume viewing.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg border border-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" /> Print to PDF
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-emerald-600" /> Standalone HTML
                </h4>
                <p className="text-slate-500 text-[11px]">
                  Generate a static HTML bundle ready to host on GitHub Pages or Vercel.
                </p>
              </div>
              <button
                onClick={handleCopyLink}
                className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg border border-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Live URL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
