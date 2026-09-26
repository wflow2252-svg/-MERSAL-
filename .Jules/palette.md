## 2024-09-26 - ProductCard Accessibility Patterns
**Learning:** Elements hidden with `group-hover:opacity-100` remain invisible to keyboard-only users who tab into them. Icon-only toggle buttons need both `aria-label` and `aria-pressed` to be fully understandable by screen readers.
**Action:** When using `opacity-0 group-hover:opacity-100` for quick action overlays, always pair it with `focus-within:opacity-100` on the container. Ensure toggle states like "Favorite" use `aria-pressed` rather than just updating icons.
