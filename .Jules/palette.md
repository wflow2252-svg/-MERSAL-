## 2024-05-23 - Keyboard Accessible Hover Actions
**Learning:** When hiding actionable items behind a hover state using group-hover:opacity-100, keyboard-only users cannot see the elements when they receive focus. Relying only on hover breaks accessibility.
**Action:** Always pair group-hover:opacity-100 with focus-within:opacity-100 on the parent container, and add focus-visible rings to the interactive children.
