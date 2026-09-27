
## 2024-09-27 - Action Buttons Visibility for Keyboard Nav
**Learning:** Hidden action buttons on Product Cards (using opacity-0 and group-hover:opacity-100) are invisible to keyboard users when focused.
**Action:** Use `focus-within:opacity-100` on the parent container to ensure hidden buttons become visible when a user tabs into them, alongside standard `focus-visible` styles.
