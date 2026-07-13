## 2024-05-18 - Interactive Element Keyboard Accessibility
**Learning:** For elements visually hiding complex actionable state changes (like favoriting or comparing products), relying solely on `title` attributes is insufficient. `aria-pressed` must reflect the boolean toggle state to accurately communicate interactions to screen readers.
**Action:** Next time when updating toggle-based icon buttons, ensure `aria-pressed` corresponds to the active state, and use explicit focus outlines (`focus-visible:ring-2`) to assist keyboard-only users who can't rely on hover reveals.
