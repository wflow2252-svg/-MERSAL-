## 2025-02-18 - Keyboard Accessibility for Hover-Revealed Overlays and Toggle States
**Learning:** Quick-action overlay buttons on product cards use opacity-0 group-hover:opacity-100 to hide visually, causing invisible focus states during keyboard navigation. Furthermore, toggle buttons (favorite/compare) lack aria-pressed for screen readers.
**Action:** Always pair group-hover:opacity-100 with focus-within:opacity-100 on the parent container, and use aria-pressed with focus-visible:ring-2 focus-visible:ring-[#1089A4] focus-visible:outline-none for toggle icon buttons.
