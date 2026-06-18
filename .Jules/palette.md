## 2025-01-29 - [Keyboard Focus in Hover Containers]
**Learning:** Interactive elements like icon buttons that are hidden behind `opacity-0 group-hover:opacity-100` containers are inaccessible to keyboard navigation because they receive focus but remain visually invisible.
**Action:** Always add `focus-within:opacity-100` to the container to ensure these hidden interactive elements become visible when keyboard focus enters them.
