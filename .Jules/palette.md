## 2025-02-23 - Dynamic Title & ARIA State in Toggle Buttons
**Learning:** For toggle-based icon buttons (like Favorite/Compare), relying on static `title` attributes (e.g., "أضف للمفضلة") is confusing when the item is already added. Furthermore, `opacity-0` hover containers hide interactive elements from keyboard users.
**Action:** Always combine `group-hover:opacity-100` with `focus-within:opacity-100` on action containers. Use dynamic ternary expressions for `title` and `aria-label` based on the toggle state, and explicitly define `aria-pressed={state}` to assist screen readers.
