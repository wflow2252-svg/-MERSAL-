## 2024-08-19 - Adding Focus Indicators to Hover-Hidden Elements
**Learning:** In Tailwind CSS, when quick action buttons on a product card are hidden by default via `opacity-0` and only shown on `group-hover:opacity-100`, keyboard navigation breaks because the focused elements remain invisible.
**Action:** Adding `focus-within:opacity-100` to the parent container ensures the hidden actions become visible when a keyboard user tabs into them, preserving the clean look for mouse users while providing necessary visual feedback for keyboard-only users.
