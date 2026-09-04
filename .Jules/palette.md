## 2026-04-23 - Focus Styles on Hidden Action Containers
**Learning:** When UI elements like 'Quick Actions' in product cards are visually hidden until hovered (`opacity-0 group-hover:opacity-100`), they become invisible and inaccessible to keyboard users tabbing through the interface unless focus-within is applied.
**Action:** Always ensure that hidden action containers include `focus-within:opacity-100` alongside hover states so that keyboard-only users can actually see the actions when they receive focus.
