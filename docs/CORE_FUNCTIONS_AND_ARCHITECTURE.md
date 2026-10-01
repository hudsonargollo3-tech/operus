# Operus — Surgical Suite: Core Functions & Architecture Specification

**Operus** is an enterprise-grade Surgical Management Operating System and Clinical Intelligence Platform tailored specifically for surgeons, surgical clinics, hospital teams, and medical groups in Brazil.

---

## 1. Executive Summary & Vision

Operus bridges the critical gap between preoperative planning, operative safety in the operating room (OR), and postoperative recovery. It eliminates WhatsApp-based surgical coordination, billing glosas, and medico-legal vulnerabilities by unifying scheduling, TUSS/CBHPM financial calculations, CFM-compliant digital TCLE consent, and WHO surgical safety checklists.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                               OPERUS SURGICAL SUITE ECOSYSTEM                            │
├──────────────────────────────┬─────────────────────────────┬─────────────────────────────┤
│      WEB APPLICATION         │      MOBILE COMPANION       │      REGULATORY & GEO       │
│    (Next.js 15 App Router)   │     (Expo 52 / React Native)│     (AI SEO / llms.txt)     │
├──────────────────────────────┼─────────────────────────────┼─────────────────────────────┤
│ • Multi-Hospital Calendar    │ • Biometric Auth (FaceID)   │ • OpenSEO GEO Search Engine │
│ • TUSS / CBHPM Calculator    │ • WHO Surgical Checklist    │ • Schema.org Medical Entity │
│ • Clinic OS & Patient Flow   │ • Real-time OR Schedule     │ • llms.txt Protocol Export  │
│ • TCLE Digital Signatures    │ • 1-Tap WhatsApp TCLE Share │ • Regulatory Intelligence   │
└──────────────────────────────┴─────────────────────────────┴─────────────────────────────┘
```

---

## 2. Core Functional Modules

### 2.1. Surgical Scheduling & Operational Pipeline (`/painel`, `/cirurgias`)
- **Multi-Hospital Orchestration**: Centralized management across multiple hospitals, surgical centers, and day clinics.
- **Workflow State Machine**: Tracks status through every phase:
  `agendada` ➔ `em_autorizacao` ➔ `autorizada` ➔ `realizada` ➔ `adiada` / `cancelada`.
- **OPME Logistics Tracking**: Monitors Órteses, Próteses e Materiais Especiais approvals, distributor orders, and room delivery status.
- **Team Honorários & Glosa Management**: Splits surgical fees across the complete team (Surgeon, 1st Assistant, 2nd Assistant, Anesthesiologist, Instrumentator) with status tracking (`pendente`, `pago`, `glosado`).

### 2.2. TUSS / CBHPM Dynamic Rules Pricing Engine
- **Hierarchical Billing Calculation**: Computes multi-procedure surgical fees according to standard ANS / CFM rules:
  - **Mesma Via de Acesso**: 100% (primary procedure) + 70% (secondary) + 50% (subsequent).
  - **Diferentes Vias**: 100% + 70% + 50%.
  - **Bilateral Procedures**: 100% + 70%.
- **Porte Cirúrgico & Anestésico**: Real-time valuation based on UCO and CH coefficients.

### 2.3. CFM-Compliant Digital TCLE Hub (`/aceite-termo/[token]`)
- **Regulatory Foundation**: Fully aligned with CFM Resolution 2.232/2019 and the Brazilian Marco Civil da Internet.
- **Audit-Proof Cryptographic Verification**:
  - Secure random token generation per patient and surgical procedure.
  - Patient signature capture via interactive touch canvas.
  - Audit trail logging: IP Address, User Agent, Geolocation timestamp, and SHA-256 document fingerprint.
  - One-tap WhatsApp sharing link generated directly from mobile companion or web dashboard.

### 2.4. Operus Mobile Companion App (`apps/mobile`)
- **Platform**: React Native built on Expo 52 (SDK 52) with native iOS FaceID / Android Biometrics.
- **WHO / OMS Surgical Safety Checklist**:
  - **Sign In** (Before induction of anesthesia): Patient identity verification, site marking, consent check, pulse oximeter check, allergy review.
  - **Time Out** (Before skin incision): Team introductions, surgical pause, antibiotic prophylaxis verification, anticipated critical events.
  - **Sign Out** (Before leaving OR): Instrument count, specimen labeling, equipment review, key postoperative recovery concerns.
- **Offline Resilient**: Local state caching for seamless operation inside signal-shielded surgical blocks.

### 2.5. Patient Budget & Commercial Proposals (`/orcamentos`)
- Clean, itemized proposal generation for private and mixed-insurance procedures.
- Transparent fee segmentation: Hospital charges, surgeon fees, auxiliary honorários, and anesthesia.
- Digital proposal links with instant WhatsApp dispatch.

### 2.6. Postoperative Patient Monitoring (`PosOperatorioRegistro`)
- Daily patient check-ins with Visual Analog Pain Scale (EVA 0–10).
- Fever, bleeding, and wound drainage telemetry.
- Automated escalation triggers notifying the surgical team of abnormal recovery signs.

### 2.7. GEO AI Search & Medical SEO Blogging Engine (`/blog`, `/llms.txt`)
- Programmatic medical intelligence articles covering surgical safety, TUSS compliance, and modern practice management.
- Complete `llms.txt` and `llms-full.txt` feeds designed for AI agent indexation (ChatGPT Search, Perplexity, Gemini).

---

## 3. Technology Stack & Infrastructure

| Layer | Technology |
|---|---|
| **Web Framework** | Next.js 15 (App Router, Server Components, TypeScript 5.7) |
| **Styling & Design Tokens** | Tailwind CSS 3.4, Framer Motion 12, Lucide Icons, `ui-ux-pro-max` Master System |
| **Mobile App** | Expo 52, React Native, Expo LocalAuthentication (Biometrics) |
| **Data & State** | Supabase SSR (`@supabase/ssr`, `@supabase/supabase-js`), PostgreSQL |
| **Monorepo Architecture** | PNPM Workspaces (`@operus/web`, `@operus/mobile`, `@operus/types`) |
| **Reverse Proxy & Edge** | Nginx Docker Swarm + Cloudflare SSL / Edge WAF / CDN |
| **Production Domain** | `https://operus.clubemkt.digital` / `https://operus.clubemkt.online` |

---

## 4. Operational File Tree

```
/root/ClubeMkt/operus
├── apps/
│   ├── web/                     # Next.js 15 Web Platform
│   │   ├── src/app/
│   │   │   ├── page.tsx         # Platform Landing Page
│   │   │   ├── painel/          # Clinic OS & Operational Queue
│   │   │   ├── cirurgias/       # Surgical Planner & TUSS Calculator
│   │   │   ├── orcamentos/      # Commercial Budget Generator
│   │   │   ├── pacientes/       # Patient Management Hub
│   │   │   ├── blueprint/       # Interactive Tokens & Design Showcase
│   │   │   ├── aceite-termo/    # Public Digital TCLE Signing Route
│   │   │   └── blog/            # Regulatory & Medical SEO Engine
│   └── mobile/                  # Expo 52 React Native Companion App
│       ├── app/
│       │   ├── _layout.tsx      # Root Navigation & Theme Provider
│       │   ├── auth.tsx         # Biometric / Passcode Lock Screen
│       │   ├── (tabs)/          # Schedule, Checklists, & Quick Actions
│       │   ├── cirurgia/[id].tsx# WHO Surgical Safety OR Checklist
│       │   └── tcle/[id].tsx    # Mobile TCLE Review & WhatsApp Dispatch
├── packages/
│   └── types/                   # Unified Domain Entities & Interfaces
├── design-system/               # Master Tokens & OP Interlocking Ribbon Assets
└── docs/                        # Specifications, Iconset Prompts & Architecture
```
