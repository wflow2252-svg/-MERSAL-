## 2024-10-30 - Keyboard Accessibility for Hover-Hidden Actions
**Learning:** Action buttons hidden by `group-hover:opacity-100` are invisible to keyboard users when focused unless the container also has `focus-within:opacity-100`. Additionally, toggle buttons (like favorite/compare) require `aria-pressed` for screen readers to understand their active state.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` for interactive elements and use `aria-pressed` for toggle buttons.
