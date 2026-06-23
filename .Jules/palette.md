## 2024-06-23 - Accessibility Issues in Action Buttons
**Learning:** Icon-only buttons lack ARIA labels, making them invisible or confusing to screen readers. For instance, the "favorite" and "compare" buttons in `ProductCard.tsx` only show an icon to sighted users, but a screen reader wouldn't know what they do. Additionally, the add to cart button lacks `aria-live="polite"` when its state changes.
**Action:** Always verify that buttons with icons but no text contain an `aria-label`. When button states change (like add to cart -> added), use `aria-live="polite"`.
