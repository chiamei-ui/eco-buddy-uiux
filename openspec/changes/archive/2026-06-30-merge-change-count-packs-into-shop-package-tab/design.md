## Context

P4 Shop is already the single surface for paid package products, with `shop-package-tab` covering package display and `shop-dual-track-ui` covering cash/IAP behavior. P11 still exists in docs as a standalone change-count pack purchase page, while P10 already has the user-facing "多一點選擇" copy for users who need more change chances during month-end selection.

The change-count packs are App-internal digital benefits. They should use the same package-tab and platform-IAP behavior as other App-internal paid goods, not a separate payment page or a new purchase pattern.

## Goals / Non-Goals

**Goals:**

- Make P4 package tab the only purchase surface for change-count packs.
- Let P10 "多一點選擇" deep-link directly into P4 package tab with change-count packs focused.
- Keep P7 remaining-count entry aligned with the same destination.
- Define the 10-change and 50-change pack products as separate package products with independent IAP SKU IDs.
- Preserve Buddy-world copy and avoid exposing technical/payment language in visible UI.

**Non-Goals:**

- Redesign the full P4 shop layout.
- Change the month-end selection rules or how annual Buddy choices are locked.
- Add a new payment provider.
- Define final platform SKU names beyond requiring independent SKU IDs.
- Implement unlimited-change or annual subscription packs.

## Decisions

1. P11 becomes P4 package-tab content, not a hidden standalone route.

   Rationale: Users should learn one purchase surface. Keeping P11 as a separate purchase page would duplicate package card UI, payment handling, order history behavior, and Phase 1/Phase 2 gating.

   Alternative considered: keep P11 and visually restyle it like P4. This keeps old navigation complexity and makes product operations maintain one more purchase surface.

2. P10 and P7 use a focused P4 destination.

   The navigation target should carry enough intent for the receiving screen, such as `setScreen('p4', { tab: 'package', focus: 'change-count-packs' })` in the prototype. Native app routing can map this to equivalent route params.

   Rationale: A focused destination avoids making users find the correct products after pressing "多一點選擇" from a shortage moment.

   Alternative considered: open P4 package tab at the top. This is simpler technically but weaker UX because monthly pass or sprint packs may appear before the needed change-count packs.

3. Change-count packs are platform-IAP package products.

   Both 10-change and 50-change packs grant App-internal digital benefits, so they use `currency: 'cash'` and `cashChannel: 'platform-iap'`. They should be validated through the same entitlement flow as other IAP goods, then credit a permanent change-count balance.

   Alternative considered: sell them with ECOCO points. This conflicts with the current dual-track decision that keeps paid acceleration/special benefits in the real-money IAP area.

4. Standalone P11 references are migrated, not deleted blindly.

   Product docs should say P11 is retired as an independent page and its content is now a P4 package-tab section. Historical labels in copy docs can remain as migration notes, but current UI/specs should point to P4.

## Risks / Trade-offs

- Users may not understand that a shop page opened from P10 is still part of the month-end flow. -> Mitigation: use a focused heading such as "多一點選擇" and return/back behavior that preserves the prior P10 context where the app supports it.
- Package tab may become crowded. -> Mitigation: group change-count packs under a dedicated section or filtered view; do not mix them visually with monthly pass cards without a heading.
- Platform SKU setup can lag behind design. -> Mitigation: use placeholder product IDs in docs but require independent App Store / Google Play SKU IDs before Phase 2 purchase enablement.
- P11 removal can break old links. -> Mitigation: old `p11` route, if still present in prototype/app, should redirect to P4 package tab focused on change-count packs during migration.

## Migration Plan

1. Update OpenSpec and downstream docs to define P4 package tab as the canonical change-count pack surface.
2. Add P4 package product data for 10-change and 50-change packs.
3. Change P10 "多一點選擇" and P7 remaining-count entry to open P4 package tab with change-count focus.
4. Redirect or remove standalone P11 UI after all links use P4.
5. Validate Phase 1 behavior: cards may display but purchase CTA follows existing package-tab gating.
6. Validate Phase 2 behavior: successful IAP purchase credits permanent change-count balance and appears in purchase history.

## Open Questions

- Final SKU IDs and localized product names for the 10-change and 50-change packs still need PM/App Store Connect confirmation.
- Whether P4 should show a small "back to month selection" affordance after entering from P10 depends on native navigation behavior and can be decided during implementation.
