## 2026-04-23 - Interactive Element Visibility for Keyboard Users
**Learning:** Found a pattern where interactive quick actions (Favorite/Compare buttons) within Product Cards used `group-hover:opacity-100` for mouse users but lacked a corresponding mechanism to become visible when navigated to via keyboard.
**Action:** When applying `opacity-0 group-hover:opacity-100` to containers with interactive elements, ALWAYS append `focus-within:opacity-100` so the container reveals itself when its inner elements receive keyboard focus.
