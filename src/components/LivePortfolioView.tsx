import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  ExternalLink,
  Download,
  Sparkles,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  BookOpen,
  Star,
  Quote,
  Code2,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  Maximize2,
  Share2
} from 'lucide-react';
import { PortfolioData, ProjectItem } from '../types';
import { GraduateBadge } from './GraduateBadge';
interface LivePortfolioViewProps {
  data: PortfolioData;
  onEditSection?: (section: any) => void;
  standalone?: boolean;
}

type PortfolioDataWithFlyRankBadge = PortfolioData & {
  flyRankBadge?: {
    verificationUrl?: string;
    graduateName?: string;
    cohort?: string;
    issuedDate?: string;
    credentialId?: string;
  };
};

export const LivePortfolioView: React.FC<LivePortfolioViewProps> = ({
  data,
  onEditSection,
  standalone = false,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const { profile, projects, experience, skills, education, testimonials, theme } = data;
  const articles = (data as PortfolioData & {
    articles?: Array<{
      id: string;
      url: string;
      publication: string;
      readTime: string;
      title: string;
    }>;
  }).articles ?? [];
  const flyRankBadge = (data as PortfolioDataWithFlyRankBadge).flyRankBadge;

  const categories = ['All', 'AI & ML', 'Web Apps', 'Systems', 'Design & UI', 'Open Source'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory || p.tags.includes(activeCategory));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(data.publishedUrl || 'https://portify.me/amigupta');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const isDark = theme.bgMode === 'dark';
  const fontClass =
    theme.fontFamily === 'mono'
      ? 'font-mono'
      : theme.fontFamily === 'serif'
        ? 'font-serif'
        : 'font-sans';

  // Responsive device container wrapper
  const containerWidthClass =
    deviceMode === 'mobile'
      ? 'max-w-sm mx-auto'
      : deviceMode === 'tablet'
        ? 'max-w-2xl mx-auto'
        : 'w-full max-w-5xl mx-auto';

  return (
    <div className="space-y-6">
      {/* Top Device & Control Bar (Shown in Studio mode) */}
      {!standalone && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${deviceMode === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${deviceMode === 'tablet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${deviceMode === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Render: {theme.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Share URL'}</span>
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      )}

      {/* Frame Container for Device Simulation */}
      <div className={`transition-all duration-300 ${containerWidthClass}`}>
        <div
          className={`overflow-hidden border shadow-2xl transition-colors duration-300 ${theme.borderRadius || 'rounded-2xl'
            } ${isDark
              ? 'bg-[#0B0F17] text-slate-100 border-slate-800'
              : 'bg-white text-slate-900 border-slate-200'
            } ${fontClass}`}
        >
          {/* Subtle Grid / Background Texture if enabled */}
          <div className="relative">
            {theme.showGridBackground && (
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: isDark
                    ? `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`
                    : `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }}
              />
            )}

            {/* Navigation Header in Portfolio */}
            <header className={`sticky top-0 z-30 backdrop-blur-md px-6 py-4 border-b flex items-center justify-between ${isDark ? 'bg-[#0B0F17]/80 border-slate-800/80' : 'bg-white/80 border-slate-100'
              }`}>
              <a href="#hero" className="flex items-center gap-2.5 group">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm shadow-xs transition-transform group-hover:scale-105"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  {profile.name.charAt(0)}
                </div>
                <span className="font-bold text-sm tracking-tight">{profile.name}</span>
              </a>

              <nav className="hidden sm:flex items-center gap-6 text-xs font-semibold">
                <a href="#about" className="text-slate-400 hover:text-slate-100 transition">About</a>
                <a href="#projects" className="text-slate-400 hover:text-slate-100 transition">Projects</a>
                <a href="#experience" className="text-slate-400 hover:text-slate-100 transition">Experience</a>
                <a href="#skills" className="text-slate-400 hover:text-slate-100 transition">Skills</a>
              </nav>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition cursor-pointer shadow-xs"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  Get in Touch
                </a>
              </div>
            </header>

            {/* 1. HERO SECTION */}
            <section id="hero" className="px-6 sm:px-10 pt-12 pb-16 relative">
              <div className="space-y-6">
                {/* Availability & Custom Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${profile.availability === 'Open to Work'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{profile.availability}</span>
                  </div>

                  {profile.customBadge && (
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${isDark ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                      {profile.customBadge}
                    </div>
                  )}
                </div>

                {/* Avatar and Main Headline */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 shadow-lg"
                      style={{ borderColor: theme.accentColor }}
                    />
                    <div
                      className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] shadow"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                      {profile.name}
                    </h1>
                    <p
                      className="text-sm sm:text-base font-bold"
                      style={{ color: theme.accentColor }}
                    >
                      {profile.tagline}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {profile.location}
                      </span>
                      <span>•</span>
                      <span>{profile.yearsOfExperience}+ Years Exp</span>
                    </div>
                  </div>
                </div>

                {/* Headline Hook & Bio */}
                <div className="space-y-3 max-w-3xl">
                  <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-200">
                    "{profile.headline}"
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {profile.bio}
                  </p>
                </div>

                {/* Action Buttons & Social Links */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg transition transform hover:-translate-y-0.5 active:scale-95"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Let's Build Together</span>
                  </a>

                  {profile.socials.github && (
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl border transition ${isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  {profile.socials.linkedin && (
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl border transition ${isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}

                  {profile.socials.twitter && (
                    <a
                      href={profile.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl border transition ${isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      title="Twitter / X"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}

                  {profile.socials.website && (
                    <a
                      href={profile.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl border transition ${isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      title="Personal Website"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </section>

            {/* 2. FEATURED PROJECTS & CASE STUDIES */}
            <section id="projects" className="px-6 sm:px-10 py-12 border-t border-slate-800/60">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      <Code2 className="w-4 h-4" style={{ color: theme.accentColor }} />
                      <span>Curated Work</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Featured Projects & Systems</h2>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${activeCategory === cat
                          ? 'text-white font-bold shadow-xs'
                          : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                        style={activeCategory === cat ? { backgroundColor: theme.accentColor } : {}}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`group rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${isDark
                        ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg'
                        }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                        <img
                          src={project.thumbnailUrl}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10">
                            {project.category}
                          </span>
                          {project.stars && (
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 backdrop-blur-md border border-amber-500/30 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {(project.stars / 1000).toFixed(1)}k
                            </span>
                          )}
                        </div>

                        {/* Date */}
                        <div className="absolute bottom-3 left-3 text-[11px] font-medium text-slate-300">
                          {project.date}
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-base group-hover:text-blue-400 transition">
                              {project.title}
                            </h3>
                            <button
                              onClick={() => setSelectedProject(project)}
                              className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Key Metrics / Highlights */}
                          {project.keyImpactMetrics && project.keyImpactMetrics.length > 0 && (
                            <div className={`p-2.5 rounded-xl text-[11px] space-y-1 ${isDark ? 'bg-slate-800/50 text-slate-300' : 'bg-slate-50 text-slate-700'
                              }`}>
                              <div className="font-bold text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                {project.keyImpactMetrics[0]}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Tags & Action Links */}
                        <div className="space-y-3 pt-2 border-t border-slate-800/40">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                                  }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-1 text-xs">
                            <div className="flex items-center gap-3">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 font-semibold text-slate-400 hover:text-white transition"
                                >
                                  <Github className="w-3.5 h-3.5" /> Source
                                </a>
                              )}
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300 transition"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                                </a>
                              )}
                            </div>

                            <button
                              onClick={() => setSelectedProject(project)}
                              className="text-[11px] font-bold text-slate-400 hover:text-slate-200 cursor-pointer"
                            >
                              Deep Dive →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. WORK EXPERIENCE TIMELINE */}
            <section id="experience" className="px-6 sm:px-10 py-12 border-t border-slate-800/60">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    <Briefcase className="w-4 h-4" style={{ color: theme.accentColor }} />
                    <span>Career Track</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Work Experience & Leadership</h2>
                </div>

                <div className="relative border-l-2 border-slate-800 pl-6 ml-3 space-y-8">
                  {experience.map((item, idx) => (
                    <div key={item.id} className="relative group">
                      {/* Timeline Node */}
                      <div
                        className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#0B0F17] transition-transform group-hover:scale-125"
                        style={{ backgroundColor: idx === 0 ? theme.accentColor : '#64748B' }}
                      />

                      <div className={`p-5 rounded-2xl border transition ${isDark ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200'
                        }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <div>
                            <h3 className="font-bold text-sm sm:text-base text-slate-100">{item.role}</h3>
                            <div className="text-xs font-bold" style={{ color: theme.accentColor }}>
                              {item.company} <span className="text-slate-500 font-normal">({item.type})</span>
                            </div>
                          </div>
                          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.startDate} — {item.current ? 'Present' : item.endDate}
                          </div>
                        </div>

                        {/* Bullet Highlights */}
                        <ul className="space-y-1.5 text-xs text-slate-300 my-3">
                          {item.highlights.map((hl, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-0.5">•</span>
                              <span className="leading-relaxed">{hl}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Skills Used */}
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                          {item.skillsUsed.map((sk) => (
                            <span
                              key={sk}
                              className={`text-[10px] font-medium px-2 py-0.5 rounded ${isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-white text-slate-700 border'
                                }`}
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. SKILLS & TECHNICAL PROFICIENCY */}
            <section id="skills" className="px-6 sm:px-10 py-12 border-t border-slate-800/60">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    <Layers className="w-4 h-4" style={{ color: theme.accentColor }} />
                    <span>Technical Toolkit</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Skills & Architecture Matrix</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((category) => (
                    <div
                      key={category.categoryName}
                      className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                        } space-y-4`}
                    >
                      <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                        {category.categoryName}
                      </h3>

                      <div className="space-y-2.5">
                        {category.skills.map((skill) => (
                          <div key={skill.name} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-medium">
                              <span className={skill.highlighted ? 'font-bold text-slate-100' : 'text-slate-400'}>
                                {skill.name}
                              </span>
                              <span className="font-mono text-[11px] text-slate-500">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${skill.level}%`,
                                  backgroundColor: skill.highlighted ? theme.accentColor : '#64748B',
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. TESTIMONIALS & ARTICLES */}
            <section className="px-6 sm:px-10 py-12 border-t border-slate-800/60">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Testimonials */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Quote className="w-4 h-4" style={{ color: theme.accentColor }} />
                    <span>Peer Endorsements</span>
                  </div>

                  <div className="space-y-3">
                    {testimonials.map((t) => (
                      <div
                        key={t.id}
                        className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}
                      >
                        <p className="text-xs italic text-slate-300 leading-relaxed">
                          "{t.content}"
                        </p>
                        <div className="flex items-center gap-2.5">
                          {t.avatarUrl && (
                            <img
                              src={t.avatarUrl}
                              alt={t.author}
                              referrerPolicy="no-referrer"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <div className="font-bold text-xs text-slate-100">{t.author}</div>
                            <div className="text-[10px] text-slate-400">{t.role} • {t.company}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Articles */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <BookOpen className="w-4 h-4" style={{ color: theme.accentColor }} />
                    <span>Selected Publications</span>
                  </div>

                  <div className="space-y-3">
                    {articles.map((art) => (
                      <a
                        key={art.id}
                        href={art.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-4 rounded-2xl border transition group ${isDark ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span>{art.publication}</span>
                          <span>{art.readTime}</span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-200 group-hover:text-blue-400 transition flex items-center justify-between">
                          <span>{art.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition" />
                        </h4>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <footer className={`px-6 sm:px-10 py-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-600'
              }`}>
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <div>
                  © {new Date().getFullYear()} {profile.name}. Built and generated with{' '}
                  <span className="font-bold text-blue-400">Portify Studio</span>.
                </div>
              </div>

              {/* Verified FlyRank Graduate Badge */}
              <div className="flex items-center gap-3">
                <GraduateBadge
                  verificationUrl={data.flyRankBadge?.verificationUrl || 'https://aifluency.flyrank.ai/week-09.html#plant-your-flag'}
                  graduateName={data.flyRankBadge?.graduateName || profile.name}
                  cohort={data.flyRankBadge?.cohort || 'AI Fluency — Cohort 2026'}
                  issuedDate={data.flyRankBadge?.issuedDate || 'August 2026'}
                  credentialId={data.flyRankBadge?.credentialId || 'FLR-2026-AIF-8941'}
                />
              </div>

              <div className="flex items-center gap-4">
                <a href="#hero" className="hover:text-slate-300 transition">Back to Top ↑</a>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Case Study Deep Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] uppercase font-bold text-blue-400 tracking-wider">
                  Case Study Breakdown
                </span>
                <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedProject.tagline}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Problem & Solution */}
            <div className="space-y-3 text-xs">
              {selectedProject.problemStatement && (
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] font-bold uppercase text-amber-400 mb-1">The Problem</div>
                  <p className="text-slate-300 leading-relaxed">{selectedProject.problemStatement}</p>
                </div>
              )}

              {selectedProject.solutionOverview && (
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] font-bold uppercase text-emerald-400 mb-1">Architectural Solution</div>
                  <p className="text-slate-300 leading-relaxed">{selectedProject.solutionOverview}</p>
                </div>
              )}

              {/* Impact Metrics */}
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400 mb-1.5">Measurable Impact</div>
                <div className="space-y-1.5">
                  {selectedProject.keyImpactMetrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 text-emerald-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400 mb-1.5">Technologies</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> View Code
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Visit Live Project
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
