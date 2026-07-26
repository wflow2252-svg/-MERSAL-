## 2026-04-22 - [Add to Cart Screen Reader Notifications]
**Learning:** For multi-state UI elements (like "Add to Cart" transitioning to "Added"), dynamic text replacements can be missed by screen readers or cause confusing navigation.
**Action:** When creating buttons that change state without moving user focus, wrap the button or apply `aria-live="polite"` and `aria-atomic="true"` directly to the container to ensure natural state announcements.
