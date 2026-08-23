import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  Layers, 
  Code2, 
  GraduationCap, 
  Quote, 
  BookOpen, 
  Palette, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check, 
  ExternalLink, 
  Star,
  RefreshCw,
  ArrowRight,
  Sliders,
  Eye
} from 'lucide-react';
import { 
  PortfolioData, 
  EditorSection, 
  ProjectItem, 
  ExperienceItem, 
  SkillCategory, 
  EducationItem, 
  TestimonialItem, 
  ArticleItem,
  ThemePreset 
} from '../types';

interface EditorViewProps {
  data: PortfolioData;
  onChange: (updated: PortfolioData) => void;
  onOpenAiPrompt: (prompt: string) => void;
  onPreviewLive: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  data,
  onChange,
  onOpenAiPrompt,
  onPreviewLive,
}) => {
  const [activeSection, setActiveSection] = useState<EditorSection>('profile');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(data.projects[0]?.id || '');
  const [aiGeneratingField, setAiGeneratingField] = useState<string | null>(null);

  const sections: { id: EditorSection; label: string; icon: React.ElementType }[] = [
    { id: 'profile', label: 'Profile & Hero', icon: User },
    { id: 'projects', label: 'Projects & Case Studies', icon: Code2 },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills & Tech Stack', icon: Layers },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'testimonials', label: 'Testimonials & Articles', icon: Quote },
    { id: 'theme', label: 'Theme & Styling', icon: Palette },
  ];

  // Helper updates
  const updateProfile = (field: string, value: any) => {
    onChange({
      ...data,
      profile: {
        ...data.profile,
        [field]: value,
      },
    });
  };

  const updateSocials = (network: string, url: string) => {
    onChange({
      ...data,
      profile: {
        ...data.profile,
        socials: {
          ...data.profile.socials,
          [network]: url,
        },
      },
    });
  };

  // AI Field Generative Helpers
  const handleAiPolishBio = () => {
    setAiGeneratingField('bio');
    setTimeout(() => {
      const polishedBio = `Senior Full-Stack AI Engineer with 7+ years of experience engineering high-throughput edge streaming pipelines, generative UI canvases, and accessible design systems. Proven track record reducing latency by 68% and scaling platforms for over 100k+ monthly active developers.`;
      updateProfile('bio', polishedBio);
      setAiGeneratingField(null);
    }, 800);
  };

  const handleAiCatchyHeadline = () => {
    setAiGeneratingField('headline');
    setTimeout(() => {
      const headline = `Architecting frontier AI streaming experiences, reactive micro-frontends, and high-resilience web infrastructure.`;
      updateProfile('headline', headline);
      setAiGeneratingField(null);
    }, 600);
  };

  // Project CRUD
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Innovation Project',
      slug: `new-project-${Date.now()}`,
      tagline: 'High-performance interactive web tool',
      description: 'Describe the core objective and architectural highlights of what you built.',
      problemStatement: 'What bottleneck or gap in existing workflows was addressed?',
      solutionOverview: 'How did your technical choices solve this challenge reliably?',
      keyImpactMetrics: ['Achieved 99.9% uptime with sub-50ms API response latency'],
      tags: ['TypeScript', 'React', 'Tailwind CSS'],
      category: 'Web Apps',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      stars: 120,
      date: '2026',
    };
    onChange({
      ...data,
      projects: [newProj, ...data.projects],
    });
    setSelectedProjectId(newProj.id);
  };

  const handleDeleteProject = (id: string) => {
    const updated = data.projects.filter((p) => p.id !== id);
    onChange({ ...data, projects: updated });
    if (selectedProjectId === id && updated.length > 0) {
      setSelectedProjectId(updated[0].id);
    }
  };

  const updateSelectedProject = (field: keyof ProjectItem, value: any) => {
    const updated = data.projects.map((p) => {
      if (p.id === selectedProjectId) {
        return { ...p, [field]: value };
      }
      return p;
    });
    onChange({ ...data, projects: updated });
  };

  const handleAiEnhanceProject = () => {
    setAiGeneratingField('project-enhance');
    setTimeout(() => {
      const proj = data.projects.find((p) => p.id === selectedProjectId);
      if (proj) {
        updateSelectedProject('problemStatement', 'Legacy systems suffered from severe latency spikes during peak multi-tenant token streaming.');
        updateSelectedProject('solutionOverview', 'Engineered an asynchronous worker queue with WebAssembly-based compression, reducing payload footprints by 45%.');
        updateSelectedProject('keyImpactMetrics', [
          'Scaled to 15,000 concurrent active users with zero downtime',
          'Cut first-contentful paint (FCP) time from 2.1s down to 380ms',
          'Earned top developer tool of the week honors on Product Hunt',
        ]);
      }
      setAiGeneratingField(null);
    }, 900);
  };

  // Experience CRUD
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      type: 'Full-time',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      highlights: [
        'Spearheaded development of core user-facing analytics workflows.',
        'Collaborated closely with product and UX to elevate accessibility scores.',
      ],
      skillsUsed: ['TypeScript', 'React', 'Node.js'],
    };
    onChange({ ...data, experience: [newExp, ...data.experience] });
  };

  const handleDeleteExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((e) => e.id !== id),
    });
  };

  // Theme presets list
  const themePresets: { id: ThemePreset; name: string; desc: string; accent: string; bg: string }[] = [
    { id: 'modern-slate', name: 'Executive Slate', desc: 'Dark navy slate canvas with crisp cobalt highlights', accent: '#2563EB', bg: 'bg-slate-900' },
    { id: 'midnight-pro', name: 'Midnight Pro', desc: 'Deep true-black backdrop with neon indigo accents', accent: '#6366F1', bg: 'bg-black' },
    { id: 'emerald-minimal', name: 'Emerald Minimal', desc: 'Clean editorial light background with forest emerald tones', accent: '#10B981', bg: 'bg-emerald-950' },
    { id: 'cyber-terminal', name: 'Cyber Terminal', desc: 'Monospace hacker aesthetic with purple phosphor glow', accent: '#A855F7', bg: 'bg-slate-950' },
    { id: 'editorial-serif', name: 'Editorial Serif', desc: 'Warm ivory elegance with refined typography & amber flair', accent: '#F59E0B', bg: 'bg-amber-950' },
    { id: 'sunset-gradient', name: 'Sunset Rose', desc: 'Vibrant coral & rose hues with modern glass card styling', accent: '#F43F5E', bg: 'bg-rose-950' },
  ];

  const currentProject = data.projects.find((p) => p.id === selectedProjectId) || data.projects[0];

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portfolio Visual Studio</h2>
            <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
              Live Auto-Save Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Customize your identity, projects, achievements, and aesthetic themes in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAiPrompt('Audit my portfolio readiness for Staff AI Engineer')}
            className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Copilot Review</span>
          </button>

          <button
            onClick={onPreviewLive}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Live Site</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body with Sidebar Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation Section Pills */}
        <div className="lg:col-span-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
            Portfolio Sections
          </div>
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{sec.label}</span>
                </div>
                {sec.id === 'projects' && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {data.projects.length}
                  </span>
                )}
                {sec.id === 'experience' && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {data.experience.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Section Content Form */}
        <div className="lg:col-span-9 space-y-6">
          {/* 1. PROFILE & HERO TAB */}
          {activeSection === 'profile' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Personal Identity & Hero Header</h3>
                  <p className="text-xs text-slate-400">Configure how recruiters and visitors see you above the fold</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAiCatchyHeadline}
                    disabled={aiGeneratingField === 'headline'}
                    className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-200 hover:bg-blue-100 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{aiGeneratingField === 'headline' ? 'Writing...' : 'AI Catchy Headline'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Professional Tagline</label>
                  <input
                    type="text"
                    value={data.profile.tagline}
                    onChange={(e) => updateProfile('tagline', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Hero Pitch / Catchy Hook</label>
                  <input
                    type="text"
                    value={data.profile.headline}
                    onChange={(e) => updateProfile('headline', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Detailed Bio / Story</label>
                    <button
                      onClick={handleAiPolishBio}
                      disabled={aiGeneratingField === 'bio'}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{aiGeneratingField === 'bio' ? 'Polishing Bio...' : '✨ Polish with AI'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={data.profile.bio}
                    onChange={(e) => updateProfile('bio', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Avatar Image URL</label>
                  <input
                    type="text"
                    value={data.profile.avatarUrl}
                    onChange={(e) => updateProfile('avatarUrl', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location & Remote Status</label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) => updateProfile('location', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Work Availability Status</label>
                  <select
                    value={data.profile.availability}
                    onChange={(e) => updateProfile('availability', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-bold"
                  >
                    <option value="Open to Work">Open to Work</option>
                    <option value="Freelance / Consulting">Freelance / Consulting</option>
                    <option value="Exploring Opportunities">Exploring Opportunities</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Years of Experience</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={data.profile.yearsOfExperience}
                    onChange={(e) => updateProfile('yearsOfExperience', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Custom Highlight Badge</label>
                  <input
                    type="text"
                    value={data.profile.customBadge || ''}
                    onChange={(e) => updateProfile('customBadge', e.target.value)}
                    placeholder="e.g. ⚡ AI Systems Specialist"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* Social URLs */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Connected Profiles & Socials</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">GitHub URL</label>
                    <input
                      type="text"
                      value={data.profile.socials.github || ''}
                      onChange={(e) => updateSocials('github', e.target.value)}
                      placeholder="https://github.com/yourhandle"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">LinkedIn URL</label>
                    <input
                      type="text"
                      value={data.profile.socials.linkedin || ''}
                      onChange={(e) => updateSocials('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/yourhandle"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Twitter / X URL</label>
                    <input
                      type="text"
                      value={data.profile.socials.twitter || ''}
                      onChange={(e) => updateSocials('twitter', e.target.value)}
                      placeholder="https://x.com/yourhandle"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Personal Website</label>
                    <input
                      type="text"
                      value={data.profile.socials.website || ''}
                      onChange={(e) => updateSocials('website', e.target.value)}
                      placeholder="https://yourname.dev"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PROJECTS TAB */}
          {activeSection === 'projects' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Projects & Case Studies</h3>
                  <p className="text-xs text-slate-400">Showcase real code, measurable impacts, and problem-solving depth</p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              {/* Horizontal Project Switcher Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100">
                {data.projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                      selectedProjectId === p.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{p.title}</span>
                    {p.featured && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                  </button>
                ))}
              </div>

              {/* Selected Project Editor Form */}
              {currentProject && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Editing: {currentProject.title}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleAiEnhanceProject}
                        disabled={aiGeneratingField === 'project-enhance'}
                        className="text-xs px-3 py-1 bg-purple-50 text-purple-700 font-bold rounded-xl border border-purple-200 hover:bg-purple-100 flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>{aiGeneratingField === 'project-enhance' ? 'Enhancing with AI...' : 'AI Enhance Case Study'}</span>
                      </button>

                      {data.projects.length > 1 && (
                        <button
                          onClick={() => handleDeleteProject(currentProject.id)}
                          className="text-xs px-3 py-1 bg-rose-50 text-rose-600 font-bold rounded-xl border border-rose-200 hover:bg-rose-100 flex items-center gap-1 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Project Title</label>
                      <input
                        type="text"
                        value={currentProject.title}
                        onChange={(e) => updateSelectedProject('title', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Category</label>
                      <select
                        value={currentProject.category}
                        onChange={(e) => updateSelectedProject('category', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-bold"
                      >
                        <option value="AI & ML">AI & ML</option>
                        <option value="Web Apps">Web Apps</option>
                        <option value="Systems">Systems</option>
                        <option value="Design & UI">Design & UI</option>
                        <option value="Open Source">Open Source</option>
                        <option value="Mobile">Mobile</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">Tagline / Short Pitch</label>
                      <input
                        type="text"
                        value={currentProject.tagline}
                        onChange={(e) => updateSelectedProject('tagline', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">Full Description</label>
                      <textarea
                        rows={2}
                        value={currentProject.description}
                        onChange={(e) => updateSelectedProject('description', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Problem Statement</label>
                      <textarea
                        rows={2}
                        value={currentProject.problemStatement || ''}
                        onChange={(e) => updateSelectedProject('problemStatement', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Architectural Solution</label>
                      <textarea
                        rows={2}
                        value={currentProject.solutionOverview || ''}
                        onChange={(e) => updateSelectedProject('solutionOverview', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Live Demo URL</label>
                      <input
                        type="text"
                        value={currentProject.liveUrl || ''}
                        onChange={(e) => updateSelectedProject('liveUrl', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">GitHub Repo URL</label>
                      <input
                        type="text"
                        value={currentProject.githubUrl || ''}
                        onChange={(e) => updateSelectedProject('githubUrl', e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Thumbnail Cover Image URL</label>
                      <input
                        type="text"
                        value={currentProject.thumbnailUrl}
                        onChange={(e) => updateSelectedProject('thumbnailUrl', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tech Stack Tags (comma separated)</label>
                      <input
                        type="text"
                        value={currentProject.tags.join(', ')}
                        onChange={(e) =>
                          updateSelectedProject(
                            'tags',
                            e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                          )
                        }
                        placeholder="React, TypeScript, Tailwind"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. WORK EXPERIENCE TAB */}
          {activeSection === 'experience' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Career Track & Work History</h3>
                  <p className="text-xs text-slate-400">Document roles, engineering achievements, and technical leadership</p>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Role
                </button>
              </div>

              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 text-sm">Role #{idx + 1}</div>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="text-xs px-2.5 py-1 bg-rose-50 text-rose-600 font-bold rounded-lg border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = data.experience.map((item) =>
                              item.id === exp.id ? { ...item, role: e.target.value } : item
                            );
                            onChange({ ...data, experience: updated });
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Company / Organization</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = data.experience.map((item) =>
                              item.id === exp.id ? { ...item, company: e.target.value } : item
                            );
                            onChange({ ...data, experience: updated });
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Start Date</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => {
                            const updated = data.experience.map((item) =>
                              item.id === exp.id ? { ...item, startDate: e.target.value } : item
                            );
                            onChange({ ...data, experience: updated });
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">End Date</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => {
                            const updated = data.experience.map((item) =>
                              item.id === exp.id ? { ...item, endDate: e.target.value } : item
                            );
                            onChange({ ...data, experience: updated });
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. THEME & STYLING TAB */}
          {activeSection === 'theme' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-base text-slate-900">Portfolio Theme & Visual Styling</h3>
                <p className="text-xs text-slate-400">Select curated color palettes, typography scales, and structural layouts</p>
              </div>

              {/* Theme Preset Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {themePresets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() =>
                      onChange({
                        ...data,
                        theme: {
                          ...data.theme,
                          id: t.id,
                          name: t.name,
                          accentColor: t.accent,
                          bgMode: t.id.includes('minimal') || t.id.includes('serif') ? 'light' : 'dark',
                        },
                      })
                    }
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                      data.theme.id === t.id
                        ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full shadow-xs"
                          style={{ backgroundColor: t.accent }}
                        />
                        <span className="font-bold text-xs text-slate-900">{t.name}</span>
                      </div>
                      {data.theme.id === t.id && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{t.desc}</p>
                  </button>
                ))}
              </div>

              {/* Typography & Accent Color Chooser */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Primary Typography Pairing</label>
                  <select
                    value={data.theme.fontFamily}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        theme: { ...data.theme, fontFamily: e.target.value as any },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold"
                  >
                    <option value="sans">Inter / Modern Clean Sans (Technical)</option>
                    <option value="serif">Playfair / Editorial Serif (Creative)</option>
                    <option value="mono">JetBrains Mono / Terminal (Engineering)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Accent Highlight Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={data.theme.accentColor}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          theme: { ...data.theme, accentColor: e.target.value },
                        })
                      }
                      className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.theme.accentColor}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          theme: { ...data.theme, accentColor: e.target.value },
                        })
                      }
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. SKILLS & EDUCATION (FALLBACK) */}
          {(activeSection === 'skills' || activeSection === 'education' || activeSection === 'testimonials') && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-base text-slate-900">{sections.find((s) => s.id === activeSection)?.label}</h3>
                <p className="text-xs text-slate-400">Structured data fields automatically formatted in your live portfolio view</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                All changes to skills, education, and testimonials are synchronized in real time with the Portify live preview and AI audit engines.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
