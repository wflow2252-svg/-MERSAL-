## 2025-08-15 - Dynamic Icon Button Semantics
**Learning:** For toggle-based icon buttons (like Favorite/Compare), dynamic `aria-label` and `title` attributes based on the `isToggled` state greatly enhance context for screen reader users, but `aria-pressed` must also be included to formally express the UI state semantics.
**Action:** When implementing icon-only toggle buttons, always pair dynamic labelling with `aria-pressed` to ensure assistive technologies correctly interpret the control as a toggle rather than a generic action button.
