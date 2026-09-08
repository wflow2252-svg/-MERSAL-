## $(date +%Y-%m-%d) - Product Card Accessibility
**Learning:** Quick action toggle buttons for favoriting/comparing were inaccessible via keyboard due to `opacity-0` on the container without a `focus-within` override, and they lacked `aria-pressed` and explicit `aria-label` attributes.
**Action:** When adding hover-based action buttons on product cards, use `focus-within:opacity-100` on the parent container, and add `aria-label`, `aria-pressed`, and `focus-visible:ring-2` with `outline-none` to ensure they are fully navigable and communicative to keyboard and screen reader users.
