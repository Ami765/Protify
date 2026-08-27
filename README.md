# ⚡ Portify — AI Portfolio Builder & Engineering Showcase

[![CI Test Suite](https://github.com/Ami765/Protify/actions/workflows/test.yml/badge.svg)](https://github.com/Ami765/Protify/actions)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Production-black?style=flat&logo=vercel)](https://fly-rank-portfolio-builder.vercel.app)
[![FlyRank Verified](https://img.shields.io/badge/FlyRank-Verified%20Graduate-4f46e5)](https://aifluency.flyrank.ai/week-09.html#plant-your-flag)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A production-grade developer portfolio engine featuring interactive GLSL fragment shaders, Three.js 3D materials studio, real-time analytics telemetry, automated ATS recruiter readiness auditor, and FlyRank graduate verification.

---

## 🌐 Live Production Deployment
- **Live URL**: [https://fly-rank-portfolio-builder.vercel.app](https://fly-rank-portfolio-builder.vercel.app)
- **GitHub Repository**: [https://github.com/Ami765/Protify](https://github.com/Ami765/Protify)

---

## ✨ Features & Architecture

| Feature Module | Description | Tech Stack |
| :--- | :--- | :--- |
| **GLSL Fragment Shader Hero** | GPU-accelerated fluid aurora canvas with interactive cursor flow fields (`u_time`, `u_resolution`, `u_mouse`). | Three.js, Raw GLSL |
| **Interactive 3D Studio** | Real-time mesh material editor with PBR textures, normal maps, roughness, and metalness controls. | Three.js, WebGL2 |
| **AI Copilot & ATS Auditor** | Gemini-powered recruiter auditor analyzing portfolio readability, STAR-method case studies, and ATS scores. | `@google/genai` |
| **Privacy-First Analytics** | Live visitor telemetry tracking unique recruiter impressions, project click-throughs, and referral sources. | `@vercel/analytics` |
| **FlyRank Graduate Verification** | Authenticated graduate badge in the footer linking to the official FlyRank credential milestone. | Lucide, Tailwind CSS |

---

## 🛡️ Production Hygiene & Abuse Protection

To prevent API credit exhaustion and Denial of Service (DoS):
1. **Client-Side Token Capping & Throttling**: Prompt inputs are hard-capped at 500 characters and throttled to prevent spam submissions.
2. **Cancellation & Abort Control**: Active requests support instant client-side cancellation via `Escape` or the Stop button.
3. **GPU Render Throttling**: 
   - `devicePixelRatio` is capped at `Math.min(window.devicePixelRatio, 2)` to eliminate GPU thermal throttling on retina displays.
   - Animation loops automatically pause when `document.hidden` is true.
   - `prefers-reduced-motion: reduce` swaps WebGL canvas for a static CSS gradient.

---

## 📋 Environment Variables

| Variable | Required | Default / Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional | Google Gemini API key for live server-side copilot completions. |
| `VITE_PORT` | Optional | `3000` (Local dev server port). |

---

## 🚀 Getting Started (Clone & Run Locally)

```bash
# 1. Clone the repository
git clone https://github.com/Ami765/Protify.git
cd Protify

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev

# 4. Run automated test suites
npm run lint      # Typecheck and ESLint
npm run test      # Vitest component unit tests
npm run test:e2e  # Playwright browser end-to-end suite
