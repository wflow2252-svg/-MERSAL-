## 2024-07-02 - Keyboard Accessible Hover Menus
**Learning:** Icon-only actionable buttons within hover-dependent containers are completely inaccessible to keyboard users unless the container responds to keyboard focus.
**Action:** Always add `focus-within:opacity-100` to containers that use `group-hover:opacity-100` to reveal interactive elements. Ensure those revealed elements have clear `focus-visible:ring` styles and accurate dynamic `aria-label`s.
