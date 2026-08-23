import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  MousePointer, 
  Download, 
  Mail, 
  ExternalLink, 
  Globe, 
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { initialAnalytics } from '../data/mockData';

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const stats = initialAnalytics;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portfolio Traffic & Recruiter Analytics</h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track hiring manager engagement, project click-throughs, and resume download rates.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                timeRange === range ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Key Metric Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Portfolio Views</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {stats.totalViews.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
            <span className="bg-emerald-50 px-1.5 py-0.5 rounded">+24.5%</span>
            <span className="text-slate-400 font-normal">vs previous period</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unique Hiring Visitors</span>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {stats.uniqueVisitors.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
            <span className="bg-emerald-50 px-1.5 py-0.5 rounded">+18.2%</span>
            <span className="text-slate-400 font-normal">from verified tech domains</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Click-Throughs</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <MousePointer className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {stats.projectClicks.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
            <span className="bg-emerald-50 px-1.5 py-0.5 rounded">11.9% CTR</span>
            <span className="text-slate-400 font-normal">high engagement rate</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resume Downloads</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Download className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {stats.resumeDownloads.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
            <span className="bg-emerald-50 px-1.5 py-0.5 rounded">38 Inquiries</span>
            <span className="text-slate-400 font-normal">recruiter outreach</span>
          </div>
        </div>
      </div>

      {/* Chart & Traffic Source Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Visitor Trend Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Weekly Visitor Engagement Curve</h3>
              <p className="text-xs text-slate-400">Page views and project deep-dive interactions</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-600"></span>
                <span className="text-slate-600">Page Views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-purple-500"></span>
                <span className="text-slate-600">Project Clicks</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualizer */}
          <div className="h-60 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100">
            {stats.weeklyViews.map((item) => {
              const viewHeight = (item.views / 3800) * 100;
              const clickHeight = (item.clicks / 600) * 100;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-1.5 h-44">
                    {/* View Bar */}
                    <div
                      style={{ height: `${viewHeight}%` }}
                      className="w-full max-w-[20px] bg-blue-600 hover:bg-blue-500 rounded-t-lg transition-all relative group-hover:shadow-md"
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap pointer-events-none transition">
                        {item.views} views
                      </div>
                    </div>

                    {/* Click Bar */}
                    <div
                      style={{ height: `${clickHeight}%` }}
                      className="w-full max-w-[20px] bg-purple-500 hover:bg-purple-400 rounded-t-lg transition-all relative"
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-900 text-white text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap pointer-events-none transition">
                        {item.clicks} clicks
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-500">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Referral Domains (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Traffic Source Distribution</h3>
              <p className="text-xs text-slate-400">Where recruiters discover your portfolio</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {stats.topReferrers.map((ref) => (
              <div key={ref.source} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{ref.source}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-500">{ref.visits.toLocaleString()}</span>
                    <span className="font-bold text-blue-600">{ref.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${ref.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Top Clicked Projects */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              Most Visited Projects
            </div>
            {stats.topClickedProjects.map((p) => (
              <div key={p.title} className="flex items-center justify-between text-xs py-1">
                <span className="font-semibold text-slate-800">{p.title}</span>
                <span className="font-mono text-purple-600 font-bold">{p.clicks} clicks</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
