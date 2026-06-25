## 2024-05-24 - Accessible Interactive Quick Actions
**Learning:** Elements relying solely on `group-hover:opacity-100` for visibility fail keyboard navigation accessibility because they don't become visible when their child elements receive focus via the Tab key.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the container, and ensure interactive children have proper `focus-visible` styles and `aria-label` attributes.
