## 2026-06-26 - Focus State Opacity in Hover Components
**Learning:** When using `group-hover:opacity-100` to reveal hidden interactive elements (like icon buttons inside product cards), these elements remain visually hidden during keyboard navigation unless explicitly handled.
**Action:** Always add `focus-within:opacity-100` to the container handling the hover state to ensure child elements become fully visible when focused via keyboard.
