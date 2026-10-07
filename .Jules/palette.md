
## 2024-05-24 - Hidden Quick Actions Accessibility
**Learning:** In e-commerce product cards, quick actions (like "Favorite" or "Compare") often use `opacity-0 group-hover:opacity-100` to remain hidden until hovered. This creates a severe accessibility issue for keyboard users who cannot hover and therefore cannot see where their focus is when tabbing through the document.
**Action:** Always combine `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container. This ensures that when a keyboard user tabs into any element inside the container, the entire action group becomes visible, providing essential visual context for the focus state.
