## Why

P11 currently behaves like a separate purchase page for change-count packs, but the product direction is to keep paid goods inside P4 Shop so users learn one purchase surface. Moving the change-count packs into the P4 package tab also makes the P10 "多一點選擇" CTA a direct continuation of the month-end selection flow instead of a separate page jump.

## What Changes

- Move P11 change-count pack purchase content into P4 Shop's `package` tab as a dedicated package section or preselected package view.
- Define two purchase products in that P4 package area: 10-change pack and 50-change pack.
- Make the P10 "多一點選擇" button open P4 directly on the package tab with the change-count pack view focused.
- Update the P7 remaining-change-count entry to use the same P4 package-tab target instead of triggering P11.
- Treat P11 as retired as a standalone page; its copy and product cards become P4 package-tab content.
- Keep the existing Buddy-language copy direction: "多一點選擇", "10 次｜偶爾想換一下", "50 次｜換到滿意為止", "機會永遠有效".

## Capabilities

### New Capabilities

- `change-count-pack-entry`: Defines how P10 and P7 route users to the P4 package tab for change-count packs, and retires standalone P11 navigation.

### Modified Capabilities

- `shop-package-tab`: Adds change-count packs as package-tab products and defines the focused package view entered from P10/P7.
- `shop-dual-track-ui`: Clarifies that change-count packs are real-money IAP products inside the P4 IAP area and must follow the platform-IAP path.

## Impact

- Product docs: `docs/design/UI_SPEC.md`, `docs/product/USER_FLOW.md`, `docs/design/COPY_TABLE.md`, and `docs/design/COPY_DIFF_HIFI.md`.
- Hi-fi prototype: P4 shop state, package-tab filtering/focus behavior, P10 CTA target, and P7 remaining-count link target.
- Data model / config: add two package products with independent SKU IDs for 10-change and 50-change packs.
- Backend / IAP: entitlement validation must credit purchased change-count quantity and keep it permanent.
- No new external payment dependency; products are App-internal digital benefits and use StoreKit / Play Billing.
