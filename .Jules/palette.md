## 2024-05-18 - Hidden Toggle Buttons Accessibility
**Learning:** UI elements hidden via `opacity-0 group-hover:opacity-100` remain invisible during keyboard navigation unless `focus-within:opacity-100` is applied. Additionally, icon-only toggle buttons need `aria-pressed` to correctly communicate their boolean state to screen readers instead of relying solely on `title`.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on containers of interactive elements, and use `aria-pressed` on toggle buttons.
