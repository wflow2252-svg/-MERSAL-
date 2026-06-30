## 2024-11-20 - Ensure Keyboard Focus Visibility on Hover-Only Elements
**Learning:** Hover-only actionable items (like Quick Action buttons overlaid on product cards) become invisible to keyboard users when tabbing through the interface, since `group-hover:opacity-100` only triggers on mouse hover. This breaks keyboard accessibility because the user tabs into elements they cannot see.
**Action:** Always add `focus-within:opacity-100` alongside `group-hover:opacity-100` on the parent container to ensure hidden interactive child elements become visible during keyboard navigation.
