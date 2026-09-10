## 2024-05-24 - Accessibility improvements on ProductCard Quick Actions
**Learning:** Icon-only overlay buttons (like quick actions on ProductCard) that only appear on hover (`group-hover:opacity-100`) are completely inaccessible to keyboard users because they remain visually hidden when focused.
**Action:** Always add `focus-within:opacity-100` alongside hover classes on the parent container, and add explicit focus styles (e.g., `focus-visible:ring-2 focus-visible:outline-none`), `aria-label`, and `aria-pressed` to the interactive elements.
