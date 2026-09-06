## 2024-05-24 - Interactive Card Actions Accessibility
**Learning:** Hidden "Quick Action" buttons that only appear on `group-hover` create a complete accessibility barrier for keyboard-only users who tab through the page but cannot hover to reveal them.
**Action:** When using `opacity-0 group-hover:opacity-100` to hide interactive elements, always pair it with `focus-within:opacity-100` on the container so the actions become visible when a child element receives keyboard focus.
