## 2024-05-15 - ARIA Labels & Focus for Icon Buttons
**Learning:** Hidden quick-action icon buttons inside product cards are inaccessible via keyboard because the container doesn't show on focus and buttons lack explicit focus rings. Additionally, toggle states (like favorites) rely on title attributes instead of `aria-pressed`.
**Action:** Use `focus-within:opacity-100` on the hidden container, add `focus-visible:ring-2 focus-visible:ring-[#1089A4]` to the buttons, and use `aria-label` with `aria-pressed` for toggle states without translating new strings.
