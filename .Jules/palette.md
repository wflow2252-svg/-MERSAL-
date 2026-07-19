## 2024-07-19 - Interactive Icon States
**Learning:** For toggleable icon actions (like favoriting or comparing products), relying only on tooltips is insufficient. Adding dynamic `aria-label` and `aria-pressed` based on state (e.g. `aria-pressed={isInFavorites(id)}`) is crucial for screen readers to understand the current boolean state, rather than just what the button does.
**Action:** Always pair visual state toggles with `aria-pressed` or dynamic `aria-label` updates to reflect the active/inactive state to assistive technologies.
