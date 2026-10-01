# Operus Surgical Suite — Master Iconset Prompting & Vector Token System

## 1. System Overview & Vector Design Principles

The Operus Iconset is engineered for high-precision surgical operating environments, clinical dashboards, and executive hospital intelligence. It strictly abides by the **Modernist Clinical Precision** philosophy:

- **Mathematical Grid:** 24x24px base viewport (with 2px inner padding, 20x20px live area) and 512x512px raster/3D master canvas.
- **Stroke Architecture:** Constant 1.75px optical weight, round caps (`stroke-linecap="round"`), and smooth round joins (`stroke-linejoin="round"`).
- **The Signature 15-Degree Facet:** Wherever directional cutting, pointers, or active clinical states are represented, an authentic 15-degree micro-facet angle is applied (echoing the #15 surgical blade).
- **Color Discipline:**
  - Active / Primary: Deep Operus Cobalt (`#1B58D6`) and Electric Cyan (`#22D3EE`).
  - Dark Canvas Surfaces: Obsidian Slate (`#090D16`), Card (`#0F172A`), Border (`#1E293B`).
  - Light Canvas Surfaces: Pure White (`#FFFFFF`), Ice Blue Surface (`#F0F6FF`), Border (`#E2E8F0`).
  - Clinical Semantics: Authorized Emerald (`#10B981`), Pending Amber (`#F59E0B`), Alert Surgical Rose (`#F43F5E`).
- **Zero-Clutter Rule:** No skeuomorphic blood, no fantasy swords/runes, no decorative glitter, no emojis as structural icons.

---

## 2. Global AI Prompt Engineering Formulas for Icon Generation

### 2.1 Formula A: Flat 2D SVG / Figma UI Vector Style (Recraft v3 & Midjourney)
```text
/imagine prompt: Clean minimalist 2D UI icon for [ICON_NAME], representing [CLINICAL_CONCEPT], single uniform 1.75px line weight, subtle 15-degree angle micro-facet, vibrant cobalt blue (#1B58D6) and pure white on dark slate (#090D16), Apple Human Interface Guidelines, Linear app style, Figma vector asset, pixel-perfect 24px grid, pure flat line art --ar 1:1 --v 6.1 --style raw --no 3d, gradient, complex shadows, noise, weapons, runes, blood
```

### 2.2 Formula B: 3D Frosted Sapphire Glass & Anodized Titanium (Apple Pro / macOS App Icons)
```text
/imagine prompt: Ultra-luxury 3D medical technology icon of [ICON_NAME], crafted from translucent frosted sapphire glass with vibrant cobalt blue core (#1B58D6) and matte anodized surgical titanium trim, floating in front-facing orthographic view, soft studio rim lighting, caustics, clean subsurface scattering, Dieter Rams Braun minimalism, Octane render, 8k --ar 1:1 --v 6.1 --no weapons, runes, anime, fantasy, grunge
```

---

## 3. The Complete 35+ Surgical & Clinical Iconset Specifications

### Category 1: Surgical Operating Room & Instruments

#### 01. `icon-scalpel-precision` (Bisturi de Precisão #15)
- **Concept:** Precision scalpel handle with a clean 15-degree angled micro-blade and laser-etched graduation marks.
- **Phosphor/Lucide Fallback:** `Scalpel` / `PenTool` with custom blade tip.
- **Midjourney v6.1 Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector UI icon of a surgical precision scalpel #15, ultra-clean single line weight, 15-degree angled micro-blade, cobalt blue (#1B58D6) and matte white, dark slate background (#090D16), Linear SaaS aesthetic, flat vector, Figma asset --ar 1:1 --v 6.1 --style raw --no sword, weapon, blood, 3d
  ```

#### 02. `icon-surgical-aperture` (Abertura Cirúrgica & Óptica)
- **Concept:** Circular geometric aperture iris opening with 4 concentric optical focus rings, symbolizing laparoscopy and scope alignment.
- **Midjourney v6.1 Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector UI icon of a medical optical camera aperture with circular iris blades, single line weight, cobalt blue (#1B58D6) with glowing cyan accent (#22D3EE), dark background (#090D16), clinical precision, flat vector --ar 1:1 --v 6.1 --style raw --no 3d, gradient
  ```

#### 03. `icon-trocar-multiport` (Trocarte de Laparoscopia)
- **Concept:** Sleek multi-valve laparoscopic trocar cannula with dual-entry channels and gas seal indicator.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon for laparoscopic multiport trocar cannula, medical surgery instrument, clean geometric vector lines, cobalt blue (#1B58D6) on dark slate (#090D16), Figma UI style --ar 1:1 --v 6.1 --style raw --no blood, 3d
  ```

#### 04. `icon-cautery-hemostasis` (Eletrocautério & Hemostasia)
- **Concept:** Fine needle-tip bipolar coagulation probe with controlled micro-energy spark arc at the apex.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of surgical bipolar electrocautery instrument tip with subtle clean energy spark, cobalt blue (#1B58D6) and electric lime (#84CC16), dark background, high contrast flat vector --ar 1:1 --v 6.1 --style raw
  ```

#### 05. `icon-surgical-lighthead` (Foco Cirúrgico LED)
- **Concept:** Multi-lens satellite surgical shadowless lamp array with central sterile steering handle.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of multi-satellite overhead surgical operating room light, concentric LED cluster with center sterile handle, cobalt blue (#1B58D6) line art, flat vector UI --ar 1:1 --v 6.1 --style raw
  ```

---

### Category 2: TCLE Digital, Bioethics & Legal Compliance

#### 06. `icon-tcle-signature` (Assinatura Biométrica de Consentimento)
- **Concept:** Smartphone tablet screen receiving a fluid biometric handwriting signature line with a verified medical check badge.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of a digital medical consent form (TCLE) with a fluid electronic signature path and a small verified shield badge, cobalt blue (#1B58D6) and emerald green (#10B981) on dark slate, flat UI icon --ar 1:1 --v 6.1 --style raw
  ```

#### 07. `icon-crypto-audit-seal` (Carimbo Criptográfico de Tempo / Hash SHA-256)
- **Concept:** Cryptographic padlock interlocked with an immutable blockchain timestamp ribbon and clock facet.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of cryptographic audit timestamp seal, geometric padlock fused with a digital time dial, cobalt blue (#1B58D6) and ice cyan (#22D3EE), flat vector UI --ar 1:1 --v 6.1 --style raw
  ```

#### 08. `icon-cfm-compliance` (Conformidade Resolução CFM 2.299)
- **Concept:** Medical Rod of Asclepius micro-geometry nested inside a protective geometric double-ring hex shield.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of medical governance shield with Asclepius staff silhouette, clean geometric lines, cobalt blue (#1B58D6), dark background, Apple HIG aesthetic --ar 1:1 --v 6.1 --style raw --no snake realism, no fantasy
  ```

---

### Category 3: TUSS, CBHPM & Glosa Auditing

#### 09. `icon-tuss-hierarchy` (Hierarquia de Portes & Vias de Acesso)
- **Concept:** Multi-tier branching procedure tree showing 100%, 70% and 50% split gates with automated audit checkmarks.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of medical billing hierarchical tree with percentage calculation split nodes (100% / 70% / 50%), cobalt blue (#1B58D6) and emerald (#10B981), dark slate background, flat vector --ar 1:1 --v 6.1 --style raw
  ```

#### 10. `icon-glosa-shield` (Escudo Anti-Glosa Operadora)
- **Concept:** Double-stroke security shield deflecting an erroneous billing flag, turning into an authorized receipt.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector UI icon of medical insurance claim pre-audit shield with verified checkmark, preventing claim rejection, cobalt blue and vibrant green, flat vector --ar 1:1 --v 6.1 --style raw
  ```

#### 11. `icon-honorarium-split` (Divisão de Honorários & Equipe)
- **Concept:** Circular pie dial splitting proportionally into Surgeon (1st), Assistant (2nd), Instrumentador, and Anesthetist nodes.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of surgical team honorarium split calculator, partitioned circular telemetry with 4 radial connected nodes, cobalt blue (#1B58D6), flat UI icon --ar 1:1 --v 6.1 --style raw
  ```

---

### Category 4: OPME, Implants & Consignment Logistics

#### 12. `icon-opme-implant` (Rastreabilidade de Próteses & OPME)
- **Concept:** Anatomical titanium orthopaedic screw/cage with an integrated 2D DataMatrix code.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of medical surgical implant hardware with 2D micro barcode matrix, cobalt blue (#1B58D6) and electric cyan, clean technical linework --ar 1:1 --v 6.1 --style raw
  ```

#### 13. `icon-sterile-consignment` (Caixa Consignada Estéril)
- **Concept:** Sealed surgical instrument container with sterile security tag and temperature/integrity indicator.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of sterilized surgical instrument tray container with security tamper seal, cobalt blue and lime green, flat vector UI --ar 1:1 --v 6.1 --style raw
  ```

#### 14. `icon-anvisa-scanner` (Scanner de Validação ANVISA)
- **Concept:** Laser optical scan beam reading an ANVISA pharmaceutical and device serial barcode.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of high-speed barcode laser scanner over medical serial registry, cobalt blue (#1B58D6) with vibrant laser beam --ar 1:1 --v 6.1 --style raw
  ```

---

### Category 5: Surgical AI, Copilot & Smart Voice

#### 15. `icon-ai-surgical-copilot` (Copiloto Cirúrgico Inteligente)
- **Concept:** Dynamic 4-point precision spark fused with the OP scalpel micro-facet, representing real-time surgical intelligence.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of surgical AI copilot, combining a sleek geometric 4-point spark with an optical scalpel node, cobalt blue (#1B58D6) and electric cyan (#22D3EE), dark background, Linear style --ar 1:1 --v 6.1 --style raw
  ```

#### 16. `icon-voice-laudo` (Ditado de Laudo & Descrição Operatória)
- **Concept:** High-resolution sound wave frequency bars transforming smoothly into structured clinical text lines.
- **Prompt:**
  ```text
  /imagine prompt: Minimalist 2D vector icon of voice recording audio waveform converting into structured clinical medical report document, cobalt blue, flat vector UI --ar 1:1 --v 6.1 --style raw
  ```

---

## 4. Frontend Component Integration (React / Next.js)

To use these icons consistently in Operus, standard SVG components are exported in `@/components/icons/` with strict CSS variable binding:

```tsx
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  color?: string;
}

export function ScalpelIcon({ size = 20, className = '', color = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Scalpel Handle & 15-degree micro-blade */}
      <path d="M18.5 3.5 L20.5 5.5 L10.5 15.5 L7 17 L8.5 13.5 Z" />
      <path d="M7 17 L3.5 20.5" />
      <circle cx="14" cy="10" r="0.75" fill={color} />
    </svg>
  );
}
```
