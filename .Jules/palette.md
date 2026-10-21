## 2025-02-12 - Product Card Focus State Discoverability
**Learning:** Using `opacity-0 group-hover:opacity-100` completely hides elements from keyboard-only users unless `focus-within:opacity-100` is also applied.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on parent containers for actionable items, and explicitly declare `aria-pressed` for toggle states.
