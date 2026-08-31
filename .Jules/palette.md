## 2026-08-31 - Focus within for Quick Actions in ProductCard
**Learning:** When using `opacity-0` with `group-hover:opacity-100` for quick action buttons, keyboard users cannot see the focused buttons. They need a combination of `focus-within:opacity-100` on the container and `focus-visible:ring-2` on the actionable elements.
**Action:** Add `focus-within:opacity-100` on containers that hide actionable elements by default, and ensure the elements themselves have explicit `focus-visible` states.
