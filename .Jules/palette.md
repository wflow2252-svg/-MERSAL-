## 2024-05-24 - Hidden interactive elements on hover cards
**Learning:** The application uses `opacity-0 group-hover:opacity-100` to hide action buttons (like compare/favorite) on product cards until hovered. This completely hides them from keyboard-only users who navigate via Tab.
**Action:** Always append `focus-within:opacity-100` alongside `group-hover:opacity-100` on containers of interactive elements to ensure they become visible when a child element receives keyboard focus. Also ensure the child buttons have `focus-visible:ring-2` to clearly indicate focus.
