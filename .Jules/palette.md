## 2024-05-18 - Keyboard accessibility on hover-only UI components
**Learning:** Interactive elements hidden behind `opacity-0 group-hover:opacity-100` become completely inaccessible to keyboard-only users who navigate via Tab.
**Action:** Always combine `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container so nested focusable elements reveal themselves when receiving focus.
