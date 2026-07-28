## 2024-07-28 - Focus Visibility on Hover-Only Actions
**Learning:** Icon-only actions hidden behind `group-hover:opacity-100` are invisible to keyboard users.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container to ensure hidden actionable items become visible during keyboard navigation.
