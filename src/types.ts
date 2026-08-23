export type NavTab = 
  | 'editor'
  | 'preview'
  | 'ai-agent'
  | 'templates'
  | 'analytics'
  | 'settings';

export type EditorSection = 
  | 'profile'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'education'
  | 'testimonials'
  | 'articles'
  | 'theme';

export interface ProfileInfo {
  name: string;
  tagline: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  phone?: string;
  availability: 'Open to Work' | 'Freelance / Consulting' | 'Exploring Opportunities' | 'Not Available';
  yearsOfExperience: number;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    dribbble?: string;
    youtube?: string;
    substack?: string;
  };
  customBadge?: string;
  resumeDownloadUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problemStatement?: string;
  solutionOverview?: string;
  keyImpactMetrics: string[];
  tags: string[];
  category: 'Web Apps' | 'AI & ML' | 'Open Source' | 'Mobile' | 'Design & UI' | 'Systems';
  thumbnailUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  stars?: number;
  date: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Internship' | 'Founder';
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
  skillsUsed: string[];
}

export interface SkillCategory {
  categoryName: string;
  skills: {
    name: string;
    level: number; // 1-100
    highlighted?: boolean;
  }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpaOrHonor?: string;
  description?: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  publication: string;
  url: string;
  date: string;
  readTime: string;
  views?: string;
}

export type ThemePreset = 
  | 'modern-slate'
  | 'midnight-pro'
  | 'cyber-terminal'
  | 'editorial-serif'
  | 'emerald-minimal'
  | 'sunset-gradient';

export interface ThemeConfig {
  id: ThemePreset;
  name: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  accentColor: string; // e.g. '#2563EB', '#10B981', '#8B5CF6'
  bgMode: 'dark' | 'light';
  layoutStyle: 'bento' | 'linear-clean' | 'compact-grid';
  showGridBackground: boolean;
  borderRadius: 'rounded-none' | 'rounded-lg' | 'rounded-2xl' | 'rounded-3xl';
}

export interface PortfolioData {
  profile: ProfileInfo;
  projects: ProjectItem[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  testimonials: TestimonialItem[];
  articles: ArticleItem[];
  theme: ThemeConfig;
  customDomain?: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedUrl?: string;
  isPublished?: boolean;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
  evaluation?: PortfolioAuditResult;
  suggestedAction?: {
    type: 'apply_bio' | 'apply_project' | 'apply_headline' | 'apply_theme';
    label: string;
    payload: any;
  };
}

export interface PortfolioAuditResult {
  overallScore: number;
  summary: string;
  breakdown: {
    category: string;
    score: number;
    feedback: string;
    badge: 'Excellent' | 'Good' | 'Needs Improvement';
  }[];
  keyStrengths: string[];
  actionableFixes: string[];
}

export interface AnalyticsStats {
  totalViews: number;
  uniqueVisitors: number;
  projectClicks: number;
  resumeDownloads: number;
  contactInquiries: number;
  topReferrers: { source: string; visits: number; percentage: number }[];
  weeklyViews: { day: string; views: number; clicks: number }[];
  topClickedProjects: { title: string; clicks: number }[];
}
