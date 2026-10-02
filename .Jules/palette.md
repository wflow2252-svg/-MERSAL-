
## 2024-10-02 - Keyboard Accessibility for Hover-Only Action Overlays
**Learning:** Container actions that rely strictly on `group-hover:opacity-100` are completely invisible and often inaccessible to keyboard-only users who attempt to tab into them, breaking crucial site features like favoriting.
**Action:** When creating hover-visible action overlays, always apply `focus-within:opacity-100` alongside `group-hover` so the container reveals itself properly when interior elements receive keyboard focus. Ensure interactive children have `focus-visible:ring-2` to clearly highlight the currently active element.
