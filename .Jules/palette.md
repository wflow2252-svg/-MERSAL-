## 2024-05-15 - Accessible Hover Actions
**Learning:** Hidden interactive elements inside Product Cards that rely solely on `group-hover:opacity-100` are invisible during keyboard navigation, and icon-only toggle buttons lack state communication.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on interactive containers, and use `aria-pressed` along with `aria-label` for toggle-based icon buttons.
