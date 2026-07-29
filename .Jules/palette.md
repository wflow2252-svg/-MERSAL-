## 2025-01-31 - Keyboard navigation visibility for hidden hover actions
**Learning:** Found that `.group-hover:opacity-100` containers masking quick actions (like "favorite" or "compare" on product cards) create a critical accessibility gap for keyboard users, as the focused item is invisible.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container, and ensure interactive descendants have proper `focus-visible` styles with brand colors (`ring-[#1089A4]`).
