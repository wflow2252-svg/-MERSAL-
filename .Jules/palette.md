## 2024-05-18 - Keyboard Accessible Icon Toggles
**Learning:** When using `opacity-0 group-hover:opacity-100` to hide action buttons (like favorite/compare) until hover, keyboard-only users cannot access them. Furthermore, icon-only buttons need semantic meaning.
**Action:** Always combine `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container. Use `aria-pressed` for toggle states and ensure `focus-visible:ring-2` is set on the buttons.
