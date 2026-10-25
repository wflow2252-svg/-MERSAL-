## 2023-10-25 - Hidden toggle buttons lack keyboard and screen reader support
**Learning:** Hidden icon buttons inside product cards (opacity-0 group-hover:opacity-100) are inaccessible to keyboard users because they lack focus-within visibility. They also act as toggles but use title instead of aria-pressed and aria-label.
**Action:** Always add focus-within:opacity-100 to hover-revealed containers, use aria-pressed for toggle states, and explicit focus-visible rings for keyboard support.
