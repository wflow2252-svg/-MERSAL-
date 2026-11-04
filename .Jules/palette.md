## 2024-05-18 - Accessible Toggle Icon Buttons in Product Card
**Learning:** Icon-only toggle buttons hidden via hover need `focus-within` on their container to be keyboard accessible, `aria-label` for screen readers, `aria-pressed` for communicating toggle state, and explicit focus rings for visibility.
**Action:** Always apply `focus-within:opacity-100` to hover-hidden interactive containers, and equip toggle buttons with `aria-label`, `aria-pressed`, and `focus-visible:ring-2 focus-visible:outline-none`.
