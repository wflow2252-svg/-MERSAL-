## 2024-05-23 - Keyboard Accessible Hover Containers
**Learning:** Containers with opacity-0 group-hover:opacity-100 hide nested actionable elements during keyboard navigation, creating an accessibility trap.
**Action:** Always pair group-hover:opacity-100 with focus-within:opacity-100 to ensure actionable children become visible when receiving focus. Apply focus-visible:ring-2 focus-visible:ring-[#1089A4] and outline-none to interactive elements.
