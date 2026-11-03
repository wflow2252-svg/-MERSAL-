## 2025-02-14 - Keyboard Accessibility for Hover-Revealed Actions
**Learning:** Using `opacity-0 group-hover:opacity-100` hides interactive elements from keyboard-only users because they cannot focus the invisible elements. Icon-only toggle buttons also need explicit states.
**Action:** Always combine `group-hover:opacity-100` with `focus-within:opacity-100` on the container. Use `aria-pressed` on toggle buttons instead of relying on `title` attributes alone, and explicitly style focus with `focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-[#1089A4]`.
