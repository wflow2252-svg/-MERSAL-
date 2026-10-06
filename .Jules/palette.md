## 2024-05-18 - Hover-only buttons Accessibility
**Learning:** Icon-only quick action buttons hidden behind `opacity-0 group-hover:opacity-100` are inaccessible to keyboard users as they cannot be seen when focused.
**Action:** Always add `focus-within:opacity-100` to the container and explicit `focus-visible:ring-2` to the interactive elements. Add `aria-label` (mirroring localized `title`) and `aria-pressed` to correctly announce their function and toggle state to screen readers.
