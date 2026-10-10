## 2024-06-25 - [Accessibility on Hidden UI Components]
**Learning:** Using `group-hover:opacity-100` makes elements entirely inaccessible for keyboard-only users who use tab-navigation because the container isn't hovered.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` so that hidden elements reveal themselves when their nested focusable elements receive focus.
