## 2026-06-29 - Keyboard accessibility in product cards
**Learning:** The product card's quick actions (favorite, compare) were wrapped in a container that became visible only on `group-hover`. This made the buttons inaccessible via keyboard navigation since the container remained invisible even when its children received focus.
**Action:** Use `focus-within:opacity-100` alongside `group-hover:opacity-100` on parent containers to ensure visually hidden interactive elements become visible during keyboard navigation.

## 2026-06-29 - Screen reader announcements for transient states
**Learning:** Transient states like "Added to cart" that briefly replace default button content need explicit ARIA attributes to be announced to screen readers.
**Action:** Use `aria-live="polite"` and `aria-atomic="true"` on buttons that display temporary success states to ensure the state change is announced. Also, disable the button during the transient state to prevent duplicate submissions.
