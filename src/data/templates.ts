import { PortfolioData } from '../types';

export interface PortfolioTemplateItem {
  id: string;
  name: string;
  roleTitle: string;
  category: 'Engineering' | 'Design' | 'AI & Data' | 'Leadership';
  description: string;
  thumbnail: string;
  previewColor: string;
  accent: string;
  themeId: string;
  data: Partial<PortfolioData>;
}

export const portfolioTemplates: PortfolioTemplateItem[] = [
  {
    id: 'tpl-ai-engineer',
    name: 'Frontier AI & Full-Stack Architect',
    roleTitle: 'Senior Full-Stack AI Engineer',
    category: 'Engineering',
    description: 'Designed for developers building with LLMs, generative UI, edge streaming, and distributed microservices.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    previewColor: 'from-blue-600 to-indigo-900',
    accent: '#2563EB',
    themeId: 'modern-slate',
    data: {
      profile: {
        name: 'Ami Gupta',
        tagline: 'Staff AI Frontend Architect & Design Technologist',
        headline: 'Bridging generative AI frontier models with high-speed reactive user interfaces.',
        bio: 'Over 7+ years architecting edge token streaming engines, multi-agent playgrounds, and accessible web systems that scale.',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        location: 'San Francisco, CA (Open to Remote)',
        email: 'ami.gupta@portify.dev',
        availability: 'Open to Work',
        yearsOfExperience: 7,
        socials: {
          github: 'https://github.com/amigupta',
          linkedin: 'https://linkedin.com/in/amigupta',
          twitter: 'https://x.com/amigupta',
          website: 'https://amigupta.dev',
        },
        customBadge: '⚡ AI Systems Specialist',
      },
      theme: {
        id: 'modern-slate',
        name: 'Executive Slate & Blue',
        fontFamily: 'sans',
        accentColor: '#2563EB',
        bgMode: 'dark',
        layoutStyle: 'bento',
        showGridBackground: true,
        borderRadius: 'rounded-2xl',
      },
    },
  },
  {
    id: 'tpl-product-designer',
    name: 'Minimalist Product & Design Technologist',
    roleTitle: 'Principal Product Designer',
    category: 'Design',
    description: 'Clean typographic layout with generous negative space, emphasizing visual case studies and interaction design.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    previewColor: 'from-emerald-600 to-teal-950',
    accent: '#10B981',
    themeId: 'emerald-minimal',
    data: {
      profile: {
        name: 'Elena Rostova',
        tagline: 'Principal Product Designer & Design System Lead',
        headline: 'Crafting intentional digital products, micro-interactions, and scalable design languages.',
        bio: 'Passionate about typography, cognitive ergonomics, and spatial design. Former Design Lead at Figma Ecosystem & Linear.',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        location: 'New York, NY',
        email: 'elena@designcraft.studio',
        availability: 'Freelance / Consulting',
        yearsOfExperience: 9,
        socials: {
          dribbble: 'https://dribbble.com/elena',
          linkedin: 'https://linkedin.com/in/elenarostova',
          twitter: 'https://x.com/elena_ux',
        },
        customBadge: '🎨 Craft & Systems',
      },
      theme: {
        id: 'emerald-minimal',
        name: 'Editorial Emerald',
        fontFamily: 'serif',
        accentColor: '#10B981',
        bgMode: 'light',
        layoutStyle: 'linear-clean',
        showGridBackground: false,
        borderRadius: 'rounded-lg',
      },
    },
  },
  {
    id: 'tpl-cyber-systems',
    name: 'Terminal Hacker & Systems Engineer',
    roleTitle: 'Systems & Cloud Infrastructure Architect',
    category: 'Engineering',
    description: 'Monospace terminal styling with live telemetry accents, code snippets, and low-level benchmark highlights.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    previewColor: 'from-purple-600 to-slate-950',
    accent: '#A855F7',
    themeId: 'cyber-terminal',
    data: {
      profile: {
        name: 'Devon Kane',
        tagline: 'Low-Latency Distributed Systems & Rust Kernel Engineer',
        headline: 'Obsessed with memory efficiency, zero-copy networking, and eBPF kernel instrumentation.',
        bio: 'Building hyper-scale infrastructure at 10M+ RPS. Author of open-source async networking runtimes.',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
        location: 'Seattle, WA',
        email: 'devon@systems.sh',
        availability: 'Exploring Opportunities',
        yearsOfExperience: 8,
        socials: {
          github: 'https://github.com/devonkane',
          twitter: 'https://x.com/devon_sys',
        },
        customBadge: '💻 Kernel & Distributed',
      },
      theme: {
        id: 'cyber-terminal',
        name: 'Cyber Matrix Terminal',
        fontFamily: 'mono',
        accentColor: '#A855F7',
        bgMode: 'dark',
        layoutStyle: 'compact-grid',
        showGridBackground: true,
        borderRadius: 'rounded-none',
      },
    },
  },
  {
    id: 'tpl-ml-researcher',
    name: 'AI Researcher & Data Scientist',
    roleTitle: 'Machine Learning Research Scientist',
    category: 'AI & Data',
    description: 'Focuses on academic publications, arXiv preprints, benchmark evaluations, and PyTorch model architectures.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    previewColor: 'from-amber-600 to-stone-900',
    accent: '#F59E0B',
    themeId: 'editorial-serif',
    data: {
      profile: {
        name: 'Dr. Sanjay Patel',
        tagline: 'Research Scientist in Multi-Modal Reasoning & Quantization',
        headline: 'Pushing the boundaries of sub-4-bit transformer reasoning and on-device neural inference.',
        bio: 'Ph.D. in Computer Science. Published 14 papers across NeurIPS, ICML, and CVPR with 3,500+ citations.',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        location: 'Boston, MA',
        email: 'sanjay.patel@research.ai',
        availability: 'Not Available',
        yearsOfExperience: 6,
        socials: {
          github: 'https://github.com/sanjay-ml',
          website: 'https://sanjaypatel.ai',
        },
        customBadge: '📚 14x NeurIPS / ICML Author',
      },
      theme: {
        id: 'editorial-serif',
        name: 'Academic Serif & Amber',
        fontFamily: 'serif',
        accentColor: '#F59E0B',
        bgMode: 'light',
        layoutStyle: 'linear-clean',
        showGridBackground: false,
        borderRadius: 'rounded-2xl',
      },
    },
  },
];
