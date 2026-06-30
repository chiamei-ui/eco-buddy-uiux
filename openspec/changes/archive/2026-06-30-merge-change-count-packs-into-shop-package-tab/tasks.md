## 1. Product Docs Sync

- [x] 1.1 Update `docs/design/UI_SPEC.md` so P11 is retired as a standalone purchase page and its 10-change / 50-change products live in P4 Shop `package` tab.
- [x] 1.2 Update `docs/product/USER_FLOW.md` so P10 "多一點選擇" and P7 remaining-count entry navigate to P4 package tab focused on change-count packs.
- [x] 1.3 Update `docs/design/COPY_TABLE.md` and `docs/design/COPY_DIFF_HIFI.md` to mark "更換次數包" copy as P4 package-tab content, not a separate P11 page.
- [x] 1.4 Update `docs/dev/FRONTEND_BACKEND_HANDOFF.md` with the two change-count pack SKU placeholders and the entitlement credit behavior.

## 2. P4 Package Tab Prototype

- [x] 2.1 Add 10-change and 50-change pack products to the P4 package product config with `currency: 'cash'` and `cashChannel: 'platform-iap'`.
- [x] 2.2 Give the two products independent product ids and placeholder platform SKU ids for App Store / Google Play setup.
- [x] 2.3 Add a dedicated "多一點選擇" section or focused view inside P4 package tab for change-count packs.
- [x] 2.4 Ensure Phase 1 behavior follows package-tab gating: product cards may display, but purchase CTA is disabled according to existing Phase 1 rules.

## 3. P10 / P7 Navigation

- [x] 3.1 Change P10 "多一點選擇" CTA to open P4 with `tab: 'package'` and `focus: 'change-count-packs'` or the native equivalent.
- [x] 3.2 Change P10 insufficient-count purchase CTA to use the same focused P4 package-tab destination.
- [x] 3.3 Change P7 remaining-change-count entry to open the same focused P4 package-tab destination.
- [x] 3.4 Redirect any remaining `p11` route/control to P4 package tab focused on change-count packs, then remove standalone P11 UI when no references remain.

## 4. Purchase / Entitlement Behavior

- [x] 4.1 Ensure successful platform-IAP validation for the 10-change pack credits 10 permanent change counts.
- [x] 4.2 Ensure successful platform-IAP validation for the 50-change pack credits 50 permanent change counts.
- [x] 4.3 Ensure credited change counts do not expire and are visible wherever remaining change count is shown.
- [x] 4.4 Ensure purchase history records change-count pack orders consistently with other package-tab IAP products.

## 5. Verification

- [x] 5.1 Verify P10 "多一點選擇" opens P4 package tab with change-count packs immediately visible.
- [x] 5.2 Verify P7 remaining-count entry opens the same focused P4 package-tab state.
- [x] 5.3 Verify P4 package tab still shows monthly pass, tool bundles, and sprint pack behavior unchanged.
- [x] 5.4 Verify no current UI path opens a standalone P11 purchase page.
- [x] 5.5 Run OpenSpec strict validation for this change before implementation is considered ready.
