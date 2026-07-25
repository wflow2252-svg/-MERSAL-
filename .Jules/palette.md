## 2024-07-25 - [Product Card Quick Actions Focus Visibility]
**Learning:** Hidden quick action containers (e.g., favorite/compare buttons) that rely solely on `group-hover:opacity-100` are completely invisible to keyboard users even when the internal buttons receive focus.
**Action:** Always combine `group-hover:opacity-100` with `focus-within:opacity-100` on interactive containers to ensure they reveal themselves during keyboard navigation, alongside standard `focus-visible` styling on the actual buttons.
