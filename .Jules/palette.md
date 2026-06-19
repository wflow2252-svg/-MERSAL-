## 2024-05-18 - Hover-Revealed Icons Accessibility
**Learning:** Icon-only buttons revealed only on hover remain invisible to keyboard users and lack context for screen readers. Using `focus-within:opacity-100` alongside `aria-label` and `aria-pressed` on toggle actions dramatically improves the experience without altering the visual design.
**Action:** Always add `focus-within:opacity-100` to hover containers, assign `aria-label` and `aria-pressed` on icon-only toggle buttons, and hide decorative icon spans with `aria-hidden="true"`.
