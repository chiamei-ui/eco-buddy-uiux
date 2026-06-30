## Requirements

### Requirement: P10 change-count CTA opens P4 package tab
P10 month-end selection SHALL use "多一點選擇" as the CTA for acquiring more change chances, and that CTA SHALL open P4 Shop with the `package` tab selected and the change-count pack area focused.

#### Scenario: P10 opens focused package view
- **WHEN** a user taps "多一點選擇" from P10
- **THEN** the app navigates to P4 Shop
- **AND** the P4 `package` tab is selected
- **AND** the change-count pack products are visible without requiring additional category selection

#### Scenario: P10 shortage state uses same destination
- **WHEN** a user has insufficient remaining change count in P10 and taps the purchase CTA
- **THEN** the destination SHALL be P4 Shop `package` tab focused on change-count packs
- **AND** the app SHALL NOT navigate to standalone P11

### Requirement: P7 remaining-count entry opens P4 package tab
The P7 remaining-change-count entry SHALL route to the same P4 package-tab change-count pack destination as P10.

#### Scenario: P7 entry opens focused package view
- **WHEN** a user taps the P7 remaining-change-count entry
- **THEN** the app navigates to P4 Shop
- **AND** the P4 `package` tab is selected
- **AND** the change-count pack products are focused

### Requirement: Standalone P11 purchase page is retired
P11 SHALL NOT remain a standalone current purchase page. Any existing `p11` route or prototype screen SHALL redirect to P4 Shop `package` tab focused on change-count packs until the route is removed.

#### Scenario: Legacy P11 route is opened
- **WHEN** an existing deep link or prototype control opens `p11`
- **THEN** the app redirects to P4 Shop `package` tab focused on change-count packs
- **AND** no separate P11 purchase UI is shown
