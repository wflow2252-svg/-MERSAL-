## 2024-05-24 - Interactive Elements in Hover Containers
**Learning:** Hiding actionable elements with opacity-0 group-hover:opacity-100 makes them invisible during keyboard navigation, blocking keyboard-only users from perceiving their focus state.
**Action:** Always pair group-hover:opacity-100 with focus-within:opacity-100 on the parent container, and add explicit focus-visible rings to the nested buttons.
