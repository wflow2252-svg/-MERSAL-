
## 2024-10-08 - Product Card Quick Actions Accessibility
**Learning:** Elements hidden behind `group-hover:opacity-100` are invisible to keyboard-only users who use Tab to navigate, preventing discovery of interactive elements like icon-only quick action buttons. Additionally, icon-only buttons conveying a toggle state require both a descriptive label and an indication of their state for screen readers.
**Action:** When using `group-hover:opacity-100` on containers to reveal child buttons, always pair it with `focus-within:opacity-100` to ensure keyboard accessibility. Ensure icon-only buttons use explicit `aria-label`s instead of relying purely on `title`, and use `aria-pressed` for boolean toggle states.
