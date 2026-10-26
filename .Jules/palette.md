## 2024-05-20 - Hover-Only UI Controls
**Learning:** The application heavily utilizes `opacity-0 group-hover:opacity-100` on containers to visually hide quick actions (like favorite/compare buttons) until hovered, causing them to remain invisible when focused via keyboard navigation.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container to ensure nested interactive elements become visible to keyboard users when focused.
