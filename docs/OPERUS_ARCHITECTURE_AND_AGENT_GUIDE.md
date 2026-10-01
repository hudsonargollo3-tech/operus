# Operus Surgical Suite — Architecture and Production Reference

## Project Overview

Operus is a high-precision medical & surgical SaaS monorepo built with modern clinical precision (Cobalt Blue `#1B58D6`, Light Slate Surfaces, and Dark Obsidian Accents).

- `apps/web`: Next.js 15 App Router deployed to Cloudflare Workers via `@opennextjs/cloudflare` / Cloudflare Pages.
- `apps/mobile`: Expo Router (Expo SDK 52) companion app for operating rooms and patient TCLE signatures.
- `packages/types`: Shared TypeScript schemas (TUSS, Surgical Checklist, TCLE, OPME, and Telemetry).
- `packages/db`: PostgreSQL & Supabase migrations, RLS policies, and clinical seed catalog.
- `docs/`: Master design tokens, 35+ icon prompting system, architecture blueprints, and clinical workflows.

---

## Monorepo Commands

Run from the monorepo root (`/root/ClubeMkt/operus`):

- **Install dependencies**: `pnpm install`
- **Build Web**: `pnpm --filter @operus/web run build`
- **Typecheck Mobile**: `pnpm --filter @operus/mobile run tsc` (or `npx tsc --noEmit` inside `apps/mobile`)
- **Start Web Dev**: `pnpm --filter @operus/web run dev`
- **Start Mobile Dev (Expo Go)**: `pnpm --filter @operus/mobile run start`

---

## Deployment Configuration

- **Target Domain**: `https://operus.clubemkt.digital` / `https://operus.clubemkt.online`
- **Cloudflare Account ID**: `cb27e1a67198789eb42d11ab90737652`
- **Config**: `apps/web/wrangler.jsonc` & `apps/web/open-next.config.ts`

---

## Key Modules & Routes

1. **Central Cirúrgica (`/`)**: Real-time surgical room telemetry, revenue overview, and upcoming procedures.
2. **Cirurgias & Agenda (`/cirurgias`)**: Multi-TUSS procedure handling (100/70/50% surgical access rules) & OPME tracking.
3. **Pacientes & Prontuário (`/pacientes`)**: Clinical history, allergies, and attached exams.
4. **TCLE Digital Hub (`/termos` & `/aceite-termo/[token]`)**: Cryptographically verified patient consent portal with IP and geolocation audit trail.
5. **Acompanhamento Pós-Op (`/pos-operatorio`)**: D+1 to D+90 post-surgical recovery timelines with VAS pain scale tracking.
6. **Procedimentos & TUSS (`/procedimentos`)**: CBHPM / TUSS pricing tables, surgical port classifications, and glosa prevention.
7. **Orçamentos (`/orcamentos`)**: Surgical estimation engine with itemized fees, hospital costs, and OPME consignments.
8. **OpenSEO / GEO AI Blog (`/blog`, `/blog/[slug]`, `/llms.txt`)**: Search-engine and AI-agent indexable knowledge hub.

---

## Working Rules & Design Tokens

- **Palette**: Deep Operus Cobalt (`#1B58D6`), Electric Cyan (`#22D3EE`), Light Clinic Neutral (`#F8FAFC`), and Slate Border (`#E2E8F0`).
- **Typography**: Outfit (Headings & Brand), Plus Jakarta Sans (UI & Body), JetBrains Mono (TUSS Codes & Data tables).
- **Design Standard**: Strictly follow `ui-ux-pro-max` clinical precision, high contrast, WCAG AAA accessibility, and zero generic AI tropes.
