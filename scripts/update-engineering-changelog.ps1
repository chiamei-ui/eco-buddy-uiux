$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel).Trim()
Set-Location $repoRoot

$changelogPath = Join-Path $repoRoot "docs/dev/ENGINEERING_CHANGELOG.md"
$relativeChangelogPath = "docs/dev/ENGINEERING_CHANGELOG.md"

$scopeRules = @(
  @{ Pattern = '^reference/eco-buddy_hi-fi/'; Scope = 'hi-fi reference' },
  @{ Pattern = '^docs/design/'; Scope = 'design spec' },
  @{ Pattern = '^docs/product/'; Scope = 'product flow' },
  @{ Pattern = '^docs/decisions/'; Scope = 'PM decision' },
  @{ Pattern = '^docs/dev/'; Scope = 'engineering handoff' },
  @{ Pattern = '^docs/onboarding/'; Scope = 'onboarding handoff' },
  @{ Pattern = '^docs/animation/'; Scope = 'animation handoff' },
  @{ Pattern = '^assets/'; Scope = 'design asset' },
  @{ Pattern = '^character/'; Scope = 'character asset' },
  @{ Pattern = '^\.githooks/pre-commit$'; Scope = 'handoff automation' },
  @{ Pattern = '^scripts/update-engineering-changelog\.ps1$'; Scope = 'handoff automation' }
)

$stagedFiles = git diff --cached --name-only --diff-filter=ACMR | ForEach-Object {
  $_.Trim() -replace '\\', '/'
} | Where-Object { $_ -ne "" }

if (-not $stagedFiles) {
  exit 0
}

$matched = @()
foreach ($file in $stagedFiles) {
  if ($file -eq $relativeChangelogPath) {
    continue
  }

  foreach ($rule in $scopeRules) {
    if ($file -match $rule.Pattern) {
      $matched += [PSCustomObject]@{
        File = $file
        Scope = $rule.Scope
      }
      break
    }
  }
}

if (-not $matched) {
  exit 0
}

if (-not (Test-Path -LiteralPath $changelogPath)) {
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $changelogPath) | Out-Null
  @"
# Engineering Impact Changelog

這份文件記錄會影響前端或後端實作判讀的設計、reference、規格與素材變更。

<!-- AUTO-ENTRIES -->
"@ | Set-Content -LiteralPath $changelogPath -Encoding UTF8
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"
$scopes = $matched | Select-Object -ExpandProperty Scope -Unique
$signatureSource = ($matched | Sort-Object File | ForEach-Object { "$($_.Scope):$($_.File)" }) -join "|"
$signatureBytes = [System.Text.Encoding]::UTF8.GetBytes($signatureSource)
$sha = [System.Security.Cryptography.SHA256]::Create()
$signature = [System.BitConverter]::ToString($sha.ComputeHash($signatureBytes)).Replace("-", "").ToLowerInvariant().Substring(0, 16)

$existing = Get-Content -LiteralPath $changelogPath -Raw -Encoding UTF8
if ($existing -match "<!-- engineering-change:$signature -->") {
  git add -- $relativeChangelogPath
  exit 0
}

$lines = @()
$lines += ""
$lines += "<!-- engineering-change:$signature -->"
$lines += "## $timestamp"
$lines += ""
$lines += "- Triggered scopes: $($scopes -join ', ')"
$lines += "- Files:"
foreach ($item in ($matched | Sort-Object File)) {
  $lines += ("  - ``{0}`` ({1})" -f $item.File, $item.Scope)
}
$lines += ""

$entry = $lines -join [Environment]::NewLine
$marker = "<!-- AUTO-ENTRIES -->"

if ($existing.Contains($marker)) {
  $updated = $existing.Replace($marker, "$marker$entry")
} else {
  $updated = "$existing$entry"
}

Set-Content -LiteralPath $changelogPath -Value $updated -Encoding UTF8
git add -- $relativeChangelogPath
