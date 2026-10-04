
## 2024-05-27 - Keyboard Navigation for Group Hover Actions
**Learning:** When using `group-hover:opacity-100` in Tailwind to reveal actions (like favorite/compare buttons) on hover, they remain invisible to keyboard users tabbing through the interface.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container, and ensure the interactive children have proper `focus-visible` styles so screen reader and keyboard users can both reach and see what they are interacting with.
