## 2023-10-27 - Keyboard Navigation in Absolute Positioned Overlays
**Learning:** When interactive elements (like icon buttons for 'Favorite' and 'Compare') are placed within an absolute positioned overlay that uses `opacity-0 group-hover:opacity-100` to hide them until mouseover, keyboard-only users will not be able to see the buttons when they tab to them.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container to ensure the hidden actionable items become visible during keyboard navigation.
