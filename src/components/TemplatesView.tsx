import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Eye, Layout, Layers } from 'lucide-react';
import { portfolioTemplates, PortfolioTemplateItem } from '../data/templates';
import { PortfolioData } from '../types';

interface TemplatesViewProps {
  onApplyTemplate: (template: PortfolioTemplateItem) => void;
  currentThemeId: string;
  onPreviewLive: () => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onApplyTemplate,
  currentThemeId,
  onPreviewLive,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [appliedId, setAppliedId] = useState<string | null>(null);

  const categories = ['All', 'Engineering', 'Design', 'AI & Data'];

  const filtered = selectedCategory === 'All'
    ? portfolioTemplates
    : portfolioTemplates.filter((t) => t.category === selectedCategory);

  const handleApply = (tpl: PortfolioTemplateItem) => {
    onApplyTemplate(tpl);
    setAppliedId(tpl.id);
    setTimeout(() => setAppliedId(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Curated Portfolio Templates</h2>
            <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
              1-Click Instant Apply
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Choose from battle-tested engineering, design, and AI research portfolio architectures.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                selectedCategory === c
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col hover:border-slate-300 transition-all duration-300 group"
          >
            {/* Header Image Preview Banner */}
            <div className="relative h-44 overflow-hidden bg-slate-900">
              <img
                src={tpl.thumbnail}
                alt={tpl.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/20">
                  {tpl.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="font-bold text-base">{tpl.name}</h3>
                <div className="text-xs text-slate-300 font-medium">{tpl.roleTitle}</div>
              </div>
            </div>

            {/* Description & Action */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {tpl.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <div
                    className="w-3.5 h-3.5 rounded-full shadow-xs"
                    style={{ backgroundColor: tpl.accent }}
                  />
                  <span>Theme: {tpl.themeId}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApply(tpl)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 ${
                      appliedId === tpl.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {appliedId === tpl.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span>Apply Template</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
