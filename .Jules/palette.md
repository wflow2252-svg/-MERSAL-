## 2024-10-14 - Quick Actions Keyboard Accessibility
**Learning:** Hover-only interactive overlays (`opacity-0 group-hover:opacity-100`) make critical actions like favoriting and comparing inaccessible to keyboard users, breaking keyboard navigation.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the container, and ensure internal interactive elements have explicit focus indicators (`focus-visible:ring-2`) and proper `aria-pressed` states.
