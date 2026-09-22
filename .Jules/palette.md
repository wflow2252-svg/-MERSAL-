
## 2024-05-19 - ProductCard Quick Actions Hover & Focus State Sync
**Learning:** In highly interactive components with quick actions that only appear on hover (`group-hover:opacity-100`), keyboard users lose access to these actions completely because they remain hidden (`opacity-0`) when navigating via Tab.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container of action buttons, so that when a button receives focus, the entire action bar becomes visible.
