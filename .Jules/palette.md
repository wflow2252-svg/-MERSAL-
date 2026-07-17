## 2023-10-27 - Reveal Hover Actions for Keyboard Users
**Learning:** Hidden "quick action" buttons (like favorite or compare) that only appear on group hover are completely inaccessible to keyboard users unless explicitly handled.
**Action:** Always add `focus-within:opacity-100` alongside `group-hover:opacity-100` on the parent container, and ensure the child buttons have `focus-visible` styles so they are both revealed and clearly indicated when tabbed into.
