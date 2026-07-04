# Palette's Journal

## 2026-07-04 - Missing ARIA Labels and Focus States on Icon Buttons
**Learning:** The application heavily utilizes `<span className="material-symbols-rounded">` inside `<button>` tags for icon-only interactions (like search, close menu, favorite, and compare). These buttons were systematically missing `aria-label`s and `focus-visible` styling, making them inaccessible to screen readers and difficult to navigate via keyboard.
**Action:** When adding or updating icon-only buttons, always ensure an `aria-label` (static or dynamically reflecting state) is present, and apply `focus-visible:ring-2 focus-visible:ring-[#1089A4] focus-visible:outline-none` for keyboard accessibility.
