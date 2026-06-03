## Why

PM 於 2026-06-02 在 GitHub Issues #2 / #3 / #4 定案三項商店相關決議（金流商改藍新、IAP 採封測 B → 正式 A 兩階段、新增「裝扮」Tab 並改名），現有 `shop-dual-track-ui` 與 `shop-package-tab` 規格僅描述「正式上線」狀態，缺少封測 Phase 1（Coming Soon）與裝扮 Tab，導致前端無法依規格實作封測版 P4。本 change 對齊規格與最新定案，避免 hi-fi 與 spec 持續分歧。

## What Changes

- **新增 Phase 1（封測）／ Phase 2（正式上線）兩階段規格分層**：點數 Tab Phase 1 即全上線；禮包 Tab 與裝扮 Tab Phase 1 採 Coming Soon（disabled CTA + 頂部提示 + 不串金流 SDK）。
- **新增「裝扮」Tab**：第三個 Tab，文案統一為「裝扮」（取代 hi-fi「裝飾」），Phase 1 預載 2–3 款 hero 卡片但 disabled。
- **BREAKING**：`shop-dual-track-ui` 之購買確認 Modal 在 Phase 1 對 cash 商品 SHALL NOT 出現（封測不串金流）；Phase 2 才出現含「藍新 NewebPay」標示的金流選項（取代原 Apple/Google Pay 描述）。
- **BREAKING**：禮包 Tab 之 IAP 商品 Phase 2 走「藍新 NewebPay 網頁付款」，非 App 內 IAP；裝扮 Tab 之數位商品 Phase 2 走 Apple/Google 平台 IAP（兩條金流路徑分開）。
- **新增退款聲明、訂單編號、error state UI 規格**（Phase 2 前置）。
- **新增試穿／預覽 Scenario**（裝扮卡片 Phase 2 必備）。
- **新增 P4 → P8 換裝管理引導**：P4 商店僅負責購買，換裝入口在 P8。
- 通行證稀有裝飾為通行證專屬解鎖款，**不與商店裝扮 Tab 共用品項**。
- 移除 `shop-dual-track-ui` 中「Apple Pay / Google Pay 選項」（與 #26 衝突；裝飾 Tab IAP 另行規範）與固定的「裝飾」文案。

## Capabilities

### New Capabilities
- `shop-cosmetic-tab`: P4 商店第三個 Tab「裝扮」之存在、商品歸屬、Phase 1 Coming Soon 狀態、Phase 2 試穿／預覽、與通行證限定款的互斥規則。
- `shop-phase-rollout`: P4 商店 Phase 1（封測）／ Phase 2（正式）兩階段上線狀態切換、Coming Soon 樣式、Phase 2 前置 UI（購買確認頁／退款聲明／訂單編號／error state）。

### Modified Capabilities
- `shop-dual-track-ui`: 購買確認 Modal 行為依 Phase 切換；cash 商品金流標示改為「藍新 NewebPay」（禮包）/「平台 IAP」（裝扮）兩條路徑；商品卡片貨幣 Badge 新增裝扮 Tab 的 IAP 標示變體。
- `shop-package-tab`: Phase 1 禮包 Tab 採 Coming Soon（Tab 可點入、商品卡顯示、CTA disabled、頂部提示文），Phase 2 才開放購買。

## Impact

- 受影響 specs：`openspec/specs/shop-dual-track-ui/spec.md`、`openspec/specs/shop-package-tab/spec.md`，新增 `openspec/specs/shop-cosmetic-tab/spec.md`、`openspec/specs/shop-phase-rollout/spec.md`
- 受影響 hi-fi 原型：P4 全頁（Tab Bar、商品卡、Modal）、新增 Coming Soon 樣式、新增 Phase 2 用 4 項 UI
- 受影響文案：`docs/design/COPY_TABLE.md` #34（「裝飾」→「裝扮」）、Coming Soon 文案、Phase 2 退款聲明文案
- 受影響動畫：`docs/animation/NAMING.md` S1–S6 插槽需標注 Phase 1 hero 款
- 後端：藍新 NewebPay 串接（callback、對帳）；Apple/Google 平台 IAP（裝扮）entitlement 驗證；資安 review
- 不影響：`docs/decisions/CURRENT.md`（權限受限，由 PM 另行寫入）；變身動畫 #29 對 P4 無直接影響
