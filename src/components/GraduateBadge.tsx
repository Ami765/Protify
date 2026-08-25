import React, { useState } from 'react';
import { Award, ShieldCheck, ExternalLink, CheckCircle2, X } from 'lucide-react';

interface GraduateBadgeProps {
  verificationUrl?: string;
  graduateName?: string;
  cohort?: string;
  issuedDate?: string;
  credentialId?: string;
}

export const GraduateBadge: React.FC<GraduateBadgeProps> = ({
  verificationUrl = 'https://aifluency.flyrank.ai/week-09.html#plant-your-flag',
  graduateName = 'Amina Ajaz',
  cohort = 'AI Fluency — Cohort 2026',
  issuedDate = 'August 2026',
  credentialId = 'FLR-2026-AIF-8941',
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div 
        id="flyrank-graduate-badge-container" 
        className="inline-flex items-center gap-2"
      >
        <a
          id="flyrank-graduate-badge-link"
          href={verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Verify FlyRank AI Fluency Graduate Credential"
          className="group relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 hover:border-indigo-400 text-slate-100 shadow-md shadow-indigo-950/40 hover:shadow-indigo-900/60 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-300">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-100 leading-tight">
              <span>FlyRank Graduate</span>
              <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded text-[9px] font-semibold tracking-wide uppercase border border-indigo-500/30">
                Verified
              </span>
            </div>
            <span className="text-[9px] text-slate-400 font-medium">
              AI Fluency Certification
            </span>
          </div>

          <ExternalLink className="w-3 h-3 text-indigo-400/80 group-hover:text-indigo-300 group-hover:translate-x-0.5 transition-all ml-0.5" />
        </a>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          aria-label="View FlyRank credential verification details"
          className="text-[10px] text-slate-400 hover:text-indigo-300 transition underline underline-offset-2 cursor-pointer p-1"
        >
          Details
        </button>
      </div>

      {/* Verification Modal */}
      {showModal && (
        <div 
          id="flyrank-verification-modal"
          role="dialog"
          aria-modal="true"
          aria-label="FlyRank Graduate Credential Verification"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in"
        >
          <div className="w-full max-w-md bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 text-slate-100 shadow-2xl shadow-indigo-950/80 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100">FlyRank Verified Credential</h3>
                  <p className="text-[11px] text-indigo-300 font-medium">{cohort}</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close credential details"
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 text-xs font-bold cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Graduate:</span>
                  <span className="font-bold text-slate-200">{graduateName}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Issued Date:</span>
                  <span className="text-slate-200">{issuedDate}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Credential ID:</span>
                  <span className="font-mono text-indigo-300 text-[10px]">{credentialId}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Status:</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-[11px] text-slate-400">Live Verification Page:</span>
              <a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition shadow-xs"
              >
                <span>Verify on FlyRank</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};