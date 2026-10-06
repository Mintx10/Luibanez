---
name: foundation-yeti
description: >-
  Modern CSS-first layout architecture and zero-build component engineering
  inspired by Foundation Yeti (the modern successor to Foundation for Sites).
  Focuses on semantic layouts, container queries, native CSS cascade layers (@layer),
  resilient responsive design, and accessible primitive-based styling without build steps.
---

# Foundation Yeti UI Architecture Skill

This skill embeds the architectural principles of **Foundation Yeti** (the modern CSS-first framework by the Foundation team).

## 1. Core Architectural Principles (Yeti Way)

1. **Named Layouts over Utility Soup**:
   - Prefer structured, intent-based components and CSS layout classes rather than chaining 20+ utility classes in HTML.
   - Use declarative layout primitives: `.stack` (vertical rhythm), `.cluster` (inline wrapping items), `.grid-auto` (responsive grid with minmax), `.frame` (aspect ratio boxes).

2. **Zero-Build & Native Modern CSS**:
   - Modern browsers support native CSS nesting, CSS variables, `color-mix()`, `clamp()`, and container queries (`@container`).
   - Use CSS `@layer` (e.g. `@layer reset, tokens, layout, components, utilities`) to guarantee predictable specificity without `!important`.

3. **Fluid Typography & Spacing (Clamp-based)**:
   - Use mathematical fluid scales: `clamp(1rem, 0.9rem + 0.5vw, 1.25rem)` so text and padding scale naturally between mobile and desktop without endless media queries.

4. **Container Queries for Modular Components**:
   - Design cards and workbench widgets to adapt to their container width rather than the whole screen viewport:
     ```css
     .card-container { container-type: inline-size; }
     @container (min-width: 480px) { ... }
     ```

5. **Semantic Accessibility & Native Primitives**:
   - Rely on native browser `<dialog>`, `<details>`, `popover`, and ARIA attributes with pristine keyboard navigation and focus management.
