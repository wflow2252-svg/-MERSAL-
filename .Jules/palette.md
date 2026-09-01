## 2024-09-01 - Accessible hover-only icon toggles
**Learning:** Icon-only toggle buttons hidden behind group-hover need both `focus-within:opacity-100` on their container (so they appear when tabbed to) and `aria-pressed` (rather than just relying on titles or icons) to effectively communicate their state to screen readers and keyboard users.
**Action:** Always check that hover-reveal interfaces include `focus-within:opacity-100` and ensure icon toggles (like fav/compare) use `aria-pressed` for explicit boolean state communication.
