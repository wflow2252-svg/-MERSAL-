## 2024-05-24 - Keyboard Accessible Hover Actions
**Learning:** Quick action buttons hidden via opacity-0 on hover containers are completely inaccessible to keyboard users because they cannot be visually discovered during tab navigation.
**Action:** Always combine group-hover:opacity-100 with focus-within:opacity-100 on containers of interactive elements, and apply explicit focus rings (focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-[#1089A4]) to the elements themselves.
