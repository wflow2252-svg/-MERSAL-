## 2024-07-12 - Revealing Hover-Only Elements to Keyboard Users
**Learning:** Elements hidden behind `opacity-0` that rely purely on `group-hover:opacity-100` become inaccessible to keyboard-only users, as they cannot tab to see the elements or understand what they focused on.
**Action:** Next time, always combine `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container. Additionally, ensure the nested actionable elements have proper `focus-visible` styling (like a ring) so focus is unambiguous.
