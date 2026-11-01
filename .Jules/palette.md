## 2024-05-19 - Hidden Hover Elements Keyboard Accessibility
**Learning:** Elements hidden with `opacity-0 group-hover:opacity-100` are entirely inaccessible to keyboard-only users who tab to them because they remain visually hidden.
**Action:** Always include `focus-within:opacity-100` alongside `group-hover:opacity-100` on containers to ensure hidden actionable items become visible during keyboard navigation.
