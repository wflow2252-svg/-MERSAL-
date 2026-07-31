## 2026-04-22 - Improving Toggleable Icon Button Accessibility
**Learning:** Icon buttons that appear on hover and serve as boolean toggles (like "Favorite" or "Compare") often lack clear state indicators for screen readers and remain invisible during keyboard navigation.
**Action:** Always pair `opacity-0 group-hover:opacity-100` with `focus-within:opacity-100` on the container. Ensure the buttons use `aria-pressed={state}` rather than just `title` attributes, and include clear `focus-visible:ring-2` styles to make them discoverable and usable for keyboard-only users.
