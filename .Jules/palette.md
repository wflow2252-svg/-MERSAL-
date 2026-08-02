## 2024-08-02 - Icon-only button accessibility in ProductCard
**Learning:** Icon-only overlay buttons that rely on hover opacity become invisible to keyboard users and lack context for screen readers when they reflect a toggle state.
**Action:** Added `focus-within:opacity-100` to the container for keyboard visibility, and `aria-label`, `aria-pressed`, and explicit `focus-visible` styles to properly communicate the toggle state and assist keyboard navigation.
