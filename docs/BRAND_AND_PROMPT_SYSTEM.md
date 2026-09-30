# Operus Surgical Suite — Comprehensive Brand Identity & Prompting Blueprint

## 1. Brand Essence, Positioning & Vision

**Operus** is the intelligent surgical operating system designed for modern surgeons, surgical teams, and specialty clinics. It replaces fragmented WhatsApp threads, paper records, and manual billing with an integrated surgical ERP spanning pre-op scheduling, multi-procedure TUSS management, digital TCLE consent, OPME tracking, post-op patient recovery, and fee repasses.

### 1.1 Brand Personality & Archetype
- **Archetype:** *The Precision Specialist + The Tech Vanguard* (Expert, Ultra-Reliable, Sleek, Clinically Compliant).
- **Tone of Voice:** Authoritative yet approachable, clean, sharp, professional, without medical jargon overload or generic corporate fluff.
- **Brand Slogan (PT/EN):**
  - PT: *Operus — Inteligência Cirúrgica de Ponta a Ponta.*
  - EN: *Operus — Precision Surgical Intelligence.*

---

## 2. Adapted CitasYa Design System (Design Tokens)

Adapted directly from the battle-tested CitasYa design language and elevated for high-stakes medical software.

### 2.1 Color Palette & Token System
```css
:root {
  /* Primary & Accents */
  --operus-emerald: #006948;      /* Primary Brand / Trust / Authority */
  --operus-emerald-dark: #022C22; /* Deep Obsidian Green */
  --operus-lime: #84CC16;         /* Electric Lime / Active Status / CTA Focus */
  --operus-cyan: #0EA5E9;         /* Medical Precision / Financials / Tech */

  /* Neutral Surfaces */
  --bg-slate-light: #F8FAFC;      /* Light Surface (Default Admin) */
  --bg-white: #FFFFFF;            /* Card / Modal Fill */
  --border-light: #E2E8F0;        /* Subtle Bezel */
  
  --bg-slate-dark: #090D16;       /* Dark Surface (Immersive / Mobile / Public TCLE) */
  --bg-slate-card: #0F172A;       /* Elevated Dark Card */
  --border-dark: #1E293B;         /* Dark Bezel */

  /* Status Colors */
  --status-authorized: #10B981;   /* Cirurgia Autorizada */
  --status-pending: #F59E0B;      /* Guia / OPME em Análise */
  --status-critical: #F43F5E;     /* Alerta / Intercorrência / Glosa */
  --status-private: #3B82F6;      /* Procedimento Particular */
}
```

### 2.2 Typography Hierarchy
- **Headings & Brand:** `Outfit` (Weights: 600, 700, 800) — Modern geometric clarity.
- **Body & Controls:** `Plus Jakarta Sans` (Weights: 400, 500, 600) — High legibility at micro sizes.
- **Data, TUSS & Hashes:** `JetBrains Mono` / `SF Mono` — Monospace precision for medical codes.

### 2.3 Component Principles
1. **Double-Bezel Bento Cards:** 1px subtle outer border + 4px inner ambient shadow for tactile depth.
2. **Dynamic Status Pills:** Micro-dot or vector icon + capitalized status badge with tinted 10% opacity backgrounds.
3. **Surgical Pulse Loader:** Concentric rotating dashed rings + pulsing center medical cross.

---

## 3. Master AI Image Generation Prompts (Midjourney v6 / Flux.1 Pro / Ideogram 2)

### 3.1 Master Brand Logo & Vector Mark
```text
/imagine prompt: Minimalist surgical technology logo mark for "OPERUS", featuring an ultra-sleek geometric medical cross fused with a precision circular surgical lens ring, clean vector design, emerald green (#006948) and electric lime (#84CC16) accents on pure dark obsidian background (#090D16), Apple Pro design aesthetic, mathematically balanced, Figma icon style, svg flat vector, high contrast, 8k --ar 1:1 --v 6.1 --style raw
```

### 3.2 3D Luxury App Icon & Launcher Badge
```text
/imagine prompt: Premium 3D square app icon for "Operus Surgical Suite", rounded squircle iOS style, frosted glass and brushed dark titanium material, glowing neon emerald green medical cross embossed in the center with subtle cyan refractive edge lighting, studio lighting, octane render, Ray Tracing, 8k resolution, minimalist hyper-realistic, luxury tech branding --ar 1:1 --v 6.1
```

### 3.3 Website Hero Banner (16:9 Desktop)
```text
/imagine prompt: Wide cinematic shot of a modern minimalist surgical consultation suite, a confident surgeon in tailored surgical scrubs holding a sleek glass tablet displaying a glowing emerald and slate medical dashboard with surgical schedules and charts, high-end private hospital background with subtle ambient cyan and warm lighting, depth of field, Hasselblad photography, clean architectural lines, ultra-realistic, 8k --ar 16:9 --v 6.1 --style raw
```

### 3.4 Feature Highlight: Digital TCLE & Patient Journey
```text
/imagine prompt: Close-up macro photograph of a patient's hands using a smartphone to sign a digital consent form on a clean dark-mode medical interface, biometric fingerprint validation glow in emerald and lime, clean modern clinic background, natural soft lighting, premium aesthetic, 8k resolution --ar 16:9 --v 6.1
```

---

## 4. Social Media Campaign Assets & Content Engine

### 4.1 Instagram Carousel (4:5 Ratio — 1080x1350)
- **Slide 1 (Hook):** "Por que cirurgiões de alta performance abandonaram o WhatsApp na rotina cirúrgica?"
  - *Prompt:* Minimalist dark slate bento card with an alert notification icon transforming into an organized emerald surgical schedule, premium typography, studio lighting, 4:5 ratio.
- **Slide 2 (The Problem):** "Glosas de convênio, atrasos de OPME e termos em papel perdidos custam até 30% do faturamento da equipe."
- **Slide 3 (The Solution - Operus):** "Uma central cirúrgica única: do agendamento com equipe à assinatura digital de TCLE em 30 segundos."
- **Slide 4 (Key Features):** "Regras CBHPM/TUSS automáticas (100%/70%/50%), controle de honorários de auxiliares e acompanhamento pós-op diário."
- **Slide 5 (CTA):** "Eleve a governança da sua prática cirúrgica. Conheça o Operus Surgical Suite."

### 4.2 LinkedIn B2B Thought Leadership Banner (1200x627)
```text
/imagine prompt: Sleek professional LinkedIn banner for "Operus Surgical Suite", dark slate (#0F172A) textured background with glowing geometric data nodes in emerald (#006948) and electric lime, floating surgical KPI cards showing revenue growth and zero glosas, subtle typography "Precision Surgical Operating System", ultra-clean corporate tech aesthetic --ar 1200:627 --v 6.1
```

### 4.3 Mobile Story & Reel Cover (9:16 — 1080x1920)
```text
/imagine prompt: Vertical high-impact mobile wallpaper and reel cover for surgical SaaS, dark titanium texture with glowing circular surgical ring in emerald green and cyber lime, futuristic medical interface elements, clean negative space for typography, hyper-detailed, 8k --ar 9:16 --v 6.1
```
