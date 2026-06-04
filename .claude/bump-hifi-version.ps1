$raw = [Console]::In.ReadToEnd()
$inp = $raw | ConvertFrom-Json
$fp = $inp.tool_input.file_path
if ($fp -match 'eco-buddy_hi-fi' -and $fp -notmatch 'index\.html') {
    $idx = 'D:\vs code\eco-buddy\reference\eco-buddy_hi-fi\index.html'
    $c = [System.IO.File]::ReadAllText($idx, [System.Text.Encoding]::UTF8)
    if ($c -match 'v=(\d+)') {
        $v = [int]$Matches[1] + 1
        $repl = 'v=' + $v
        $c = $c -replace 'v=\d+', $repl
        $enc = [System.Text.UTF8Encoding]::new($false)
        [System.IO.File]::WriteAllText($idx, $c, $enc)
    }
}