---
name: onlook-web-design
description: >-
  Visual-first UI/UX engineering, design systems, and rapid prototyping principles
  inspired by Onlook (the AI-first visual editor for web). Specializes in crafting
  modern design tokens, high-contrast accessible layouts, sleek glassmorphism/card-based
  aesthetics, responsive typography, micro-interactions, and pristine component hierarchy.
---

# Onlook Web Design & Visual Engineering Skill

This skill embeds the design philosophy, visual-first guidelines, and design-system engineering workflows inspired by **Onlook** (the open-source visual editor for web interfaces).

## 1. Core Principles (Onlook Visual Standard)

1. **Design Tokens as Source of Truth**:
   - Never hardcode raw hex values across thousands of lines.
   - Centralize colors, spacing, borders, radius, shadows, and typography in semantic CSS variables (`:root` and `[data-theme]`).
   - Use semantic tiers: `--surface-1`, `--surface-2`, `--border-subtle`, `--text-primary`, `--text-muted`, `--brand-primary`, `--brand-accent`.

2. **Visual Hierarchy & Depth**:
   - Contrast over clutter: background depth (`#090d16` -> `#111827` -> `#1f2937`) with subtle borders (`rgba(255, 255, 255, 0.08)`).
   - Glassmorphism & layered surfaces with backdrop filters (`backdrop-filter: blur(12px)`).
   - Clear focal points: buttons with clean gradients and subtle inner glows, avoiding oversaturated flat tones.

3. **Typography & Rhythm**:
   - Display font for high-impact titles (e.g., Space Grotesk, Plus Jakarta Sans, Outfit).
   - Clean, highly legible body fonts (Inter, Geist Sans).
   - Strict scale: 12px (badges/sub), 14px (body/controls), 16px (base), 20px (subheadings), 28px+ (hero titles).

4. **Component Polishing & Micro-Interactions**:
   - Smooth cubic-bezier transitions (`transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)`).
   - Tactile feedback: `:hover` subtle elevation/border brightness, `:active` slight scale down (`transform: scale(0.98)`).
   - Interactive states for accessibility: clear focus rings with offset (`outline: 2px solid var(--brand-accent); outline-offset: 2px`).

5. **Mobile-First & Touch Ergonomics**:
   - Touch targets must never be under 44x44px.
   - Responsive grids (`grid-template-columns: repeat(auto-fill, minmax(..., 1fr))`) that prevent overflow and truncation.
   - Smooth, non-disruptive vertical scrolling with zero horizontal overflow on small screens.
