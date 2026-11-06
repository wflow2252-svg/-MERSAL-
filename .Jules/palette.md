## 2024-11-06 - Product Card Quick Actions Accessibility
**Learning:** Icon-only toggle buttons hidden via `group-hover:opacity-100` become completely inaccessible to keyboard-only users because they are invisible when focused, and lack boolean state representation for screen readers.
**Action:** Always add `focus-within:opacity-100` to the container alongside hover states. Ensure icon toggles use `aria-pressed={state}` rather than just `title` attributes, and apply `focus-visible:ring-2 focus-visible:outline-none` to aid keyboard navigation.
