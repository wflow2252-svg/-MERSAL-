## 2024-05-14 - Improve Quick Actions keyboard accessibility in ProductCard
**Learning:** Icon-only Quick Actions hidden with `opacity-0 group-hover:opacity-100` must also include `focus-within:opacity-100` to be discoverable and operable by keyboard users, alongside `aria-pressed` for toggle states.
**Action:** When implementing hidden quick actions, always combine hover reveal with focus-within reveal, and ensure proper ARIA attributes and focus rings are applied.
