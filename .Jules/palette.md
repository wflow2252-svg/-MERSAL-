
## 2024-08-01 - Accessible Hover Actions Overlay
**Learning:** Hidden quick action overlays (opacity-0 by default) on product cards are often entirely inaccessible to keyboard users unless they can receive focus and the container reveals itself during focus. Furthermore, toggle-based icon-only actions (like Favorite and Compare) fail to convey their current state to screen readers if they only use tooltips (`title` attribute) and visual color changes.
**Action:** Next time creating or modifying hidden actionable overlays, ensure `focus-within:opacity-100` is applied to the container, and `aria-label` along with `aria-pressed` (for toggles) is applied to the interactive elements, in addition to explicit focus rings.
