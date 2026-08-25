import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Zap, 
  Check, 
  FileCheck, 
  Award,
  Square
} from 'lucide-react';
import { PortfolioData, AiChatMessage, PortfolioAuditResult } from '../types';

interface AiAgentViewProps {
  portfolioData: PortfolioData;
  onUpdatePortfolio: (updated: PortfolioData) => void;
  initialPrompt?: string;
}

export const AiAgentView: React.FC<AiAgentViewProps> = ({
  portfolioData,
  onUpdatePortfolio,
  initialPrompt,
}) => {
  const [input, setInput] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [auditResult, setAuditResult] = useState<PortfolioAuditResult | null>({
    overallScore: 93,
    summary: 'Strong high-impact portfolio. Demonstrates deep technical proficiency in edge streaming, React 19, and WCAG AA accessibility with clear quantifiable metrics.',
    breakdown: [
      {
        category: 'Measurable Business Impact',
        score: 96,
        feedback: 'Excellent inclusion of numeric percentages (e.g. -68% latency, +120k users).',
        badge: 'Excellent',
      },
      {
        category: 'Technical Architecture Depth',
        score: 94,
        feedback: 'Clear problem-solution breakdown on featured case studies.',
        badge: 'Excellent',
      },
      {
        category: 'Recruiter ATS Keyword Richness',
        score: 90,
        feedback: 'Strong alignment with Senior / Staff Full-Stack AI job specifications.',
        badge: 'Good',
      },
      {
        category: 'Aesthetic Rhythm & Typography',
        score: 92,
        feedback: 'Cohesive high-contrast palette with clear visual hierarchy.',
        badge: 'Excellent',
      },
    ],
    keyStrengths: [
      'Concrete metrics in project case studies (14k GitHub stars, 68% latency reduction)',
      'High-clarity hero hook with transparent work availability status',
      'Extensive technical skills matrix categorized by modern engineering stacks',
    ],
    actionableFixes: [
      'Add a dedicated "Architectural Decisions" deep-dive snippet to the PulseOps case study',
      'Include a direct link to a recorded technical conference talk or live demo walkthrough',
    ],
  });

  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      content: `Hello ${portfolioData.profile.name}! I am your Portify AI Portfolio Copilot. I can audit your portfolio for ATS recruiter readiness, write high-converting bios, turn technical projects into STAR-method case studies, and suggest missing skills.`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const handleStopGeneration = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLoading) {
        handleStopGeneration();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsLoading(true);

    const delay = 250;
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      const lower = textToSend.toLowerCase();

      if (lower.includes('audit') || lower.includes('readiness') || lower.includes('score')) {
        const audit: PortfolioAuditResult = {
          overallScore: 94,
          summary: `Portfolio audit completed for ${portfolioData.profile.name} (${portfolioData.profile.tagline}). Your portfolio ranks in the top 5% of technical engineering showcases.`,
          breakdown: [
            { category: 'Measurable Impact Metrics', score: 96, feedback: 'Strong quantitative numbers included in 4/4 projects.', badge: 'Excellent' },
            { category: 'Technical Architecture Depth', score: 95, feedback: 'Clearly highlights React 19, TypeScript, and edge streaming.', badge: 'Excellent' },
            { category: 'Recruiter ATS Density', score: 91, feedback: 'Contains high-value keywords: WebSockets, WebGL, WCAG AA, RAG.', badge: 'Good' },
            { category: 'Visual Polish & Accessibility', score: 94, feedback: 'Passes high-contrast color tests with clean typographic scale.', badge: 'Excellent' },
          ],
          keyStrengths: [
            'Clear problem-solution structure for complex systems',
            'Strong social proof with peer endorsements and GitHub metrics',
            'Immediate recruiter clarity on availability and location',
          ],
          actionableFixes: [
            'Add explicit mentions of distributed caching & Redis in systems experience',
          ],
        };
        setAuditResult(audit);
        setMessages((prev) => [
          ...prev,
          {
            id: `resp-${Date.now()}`,
            sender: 'assistant',
            content: `I have performed a comprehensive ATS & Recruiter Readiness Audit on your portfolio:`,
            evaluation: audit,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } else if (lower.includes('bio') || lower.includes('intro') || lower.includes('headline')) {
        const newBio = `Senior Full-Stack AI Engineer with 7+ years of experience engineering high-throughput edge streaming pipelines, generative UI canvases, and accessible design systems. Proven track record reducing latency by 68% and scaling platforms for over 100k+ monthly active developers.`;
        setMessages((prev) => [
          ...prev,
          {
            id: `resp-${Date.now()}`,
            sender: 'assistant',
            content: `Here is a high-converting, recruiter-optimized bio crafted for your background:\n\n"${newBio}"`,
            suggestedAction: {
              type: 'apply_bio',
              label: '✨ Apply this Bio to Portfolio',
              payload: newBio,
            },
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } else if (lower.includes('case study') || lower.includes('star') || lower.includes('project')) {
        setMessages((prev) => [
          ...prev,
          {
            id: `resp-${Date.now()}`,
            sender: 'assistant',
            content: `### STAR-Method Case Study Framework for "Synthetix AI Studio":\n\n- **Situation**: Modern AI interfaces were constrained to static Markdown chat bubbles, preventing developers from interacting with complex live tool outputs.\n- **Task**: Design a sub-30ms generative UI rendering engine capable of hydrating interactive components from raw LLM function streams.\n- **Action**: Built an AST parsing pipeline with React 19 Server Component boundaries and client-side optimistic reconciliation.\n- **Result**: Reduced first-token UI render time by 68%, gained 14,000+ GitHub stars, and adopted by 4 enterprise platforms.`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `resp-${Date.now()}`,
            sender: 'assistant',
            content: `I analyzed: "${textToSend}". Your portfolio content is well-aligned. I recommend keeping your featured project count between 3 to 5 to maintain high cognitive focus for hiring managers.`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    }, delay);
  };

  const handleApplySuggestedAction = (action: NonNullable<AiChatMessage['suggestedAction']>) => {
    if (action.type === 'apply_bio') {
      onUpdatePortfolio({
        ...portfolioData,
        profile: {
          ...portfolioData.profile,
          bio: String(action.payload),
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portify AI Portfolio Copilot</h2>
            <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Cpu className="w-3 h-3 text-purple-600" /> Gemini Intelligence Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Optimize your portfolio for ATS readability, generate punchy case studies, and audit recruiter readiness.
          </p>
        </div>

        <button
          onClick={() => handleSend('Audit my portfolio for recruiter & ATS readiness')}
          className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer active:scale-95"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Run 1-Click Portfolio Audit</span>
        </button>
      </div>

      {/* Quick Trigger Preset Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> Instant Prompts:
        </span>
        <button
          onClick={() => handleSend('Generate 3 punchy bio variations for a Staff AI Engineer')}
          className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:text-purple-700 text-slate-700 font-medium transition cursor-pointer shadow-xs"
        >
          Write High-Impact Bio
        </button>
        <button
          onClick={() => handleSend('Rewrite project highlights using the STAR framework')}
          className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:text-purple-700 text-slate-700 font-medium transition cursor-pointer shadow-xs"
        >
          STAR-Method Case Study
        </button>
        <button
          onClick={() => handleSend('Audit my portfolio for recruiter & ATS readiness')}
          className="text-xs px-3 py-1.5 bg-white border border-purple-200 rounded-xl hover:bg-purple-50 text-purple-700 font-medium transition cursor-pointer shadow-xs"
        >
          Full ATS Readiness Scorecard
        </button>
      </div>

      {/* Main Grid: Chat Stream & Live Audit Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Chat Terminal (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[560px] overflow-hidden">
          {/* Chat Messages */}
          <div 
            id="ai-chat-messages-container"
            aria-live="polite" 
            aria-atomic="false" 
            aria-label="AI Copilot conversation history"
            role="log"
            className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-2xl ${
                  m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900 text-white shadow-xs'
                  }`}
                  aria-hidden="true"
                >
                  {m.sender === 'user' ? 'ME' : <Bot className="w-4 h-4 text-purple-400" />}
                </div>

                <div className="space-y-2 flex-1">
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white font-medium shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>

                  {/* 1-Click Action Pill */}
                  {m.suggestedAction && (
                    <button
                      onClick={() => handleApplySuggestedAction(m.suggestedAction!)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{m.suggestedAction.label}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center justify-between gap-3 bg-white border border-purple-200 p-3.5 rounded-2xl text-xs text-slate-700 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                  <span>Synthesizing portfolio intelligence & metrics...</span>
                </div>
                <button
                  type="button"
                  id="stop-generation-btn"
                  onClick={handleStopGeneration}
                  aria-label="Stop AI generation (or press Escape)"
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition cursor-pointer focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
                >
                  <Square className="w-3 h-3 fill-red-600 text-red-600" />
                  <span>Stop</span>
                </button>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <label htmlFor="ai-chat-prompt-input" className="sr-only">
                Ask AI copilot prompt
              </label>
              <input
                id="ai-chat-prompt-input"
                type="text"
                placeholder="Ask AI to polish your bio, generate case studies, or suggest missing skills..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus:bg-white transition"
              />

              {isLoading ? (
                <button
                  type="button"
                  onClick={handleStopGeneration}
                  aria-label="Stop current generation"
                  className="p-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold shadow-xs transition cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
                >
                  <Square className="w-4 h-4 fill-white" />
                </button>
              ) : (
                <button
                  type="submit"
                  aria-label="Send prompt to AI copilot"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-xl font-bold shadow-xs transition cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Right: Portfolio Audit Scorecard (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-purple-600" />
                Portfolio Readiness Audit
              </h3>
              <p className="text-[11px] text-slate-400">Evaluated against 2026 hiring benchmarks</p>
            </div>

            {auditResult && (
              <div className="text-right">
                <span className="text-2xl font-black text-purple-600">{auditResult.overallScore}</span>
                <span className="text-xs text-slate-400">/100</span>
              </div>
            )}
          </div>

          {auditResult && (
            <div className="space-y-4 text-xs">
              <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                {auditResult.summary}
              </p>

              {/* Category Breakdown */}
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Category Breakdown
                </div>
                {auditResult.breakdown.map((cat) => (
                  <div key={cat.category} className="space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-slate-800">{cat.category}</span>
                      <span className="text-purple-700 font-bold">{cat.score}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-600 h-full rounded-full"
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths */}
              <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-xl space-y-1.5">
                <div className="font-bold text-emerald-800 text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Core Strengths
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  {auditResult.keyStrengths.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>

              {/* Actionable fixes */}
              <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-xl space-y-1.5">
                <div className="font-bold text-amber-800 text-[11px] flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> High-Priority Suggestions
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  {auditResult.actionableFixes.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};