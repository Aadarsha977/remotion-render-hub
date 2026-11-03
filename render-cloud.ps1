param (
    [switch]$StoryboardOnly,
    [switch]$VideoOnly,
    [string]$KernelSlug = "techidea/remotion-cloud-video-renderer",
    [string]$OutputDir = "./dist"
)

$ErrorActionPreference = "Stop"

# Determine Render Mode
$mode = "all"
if ($StoryboardOnly) { $mode = "storyboard" }
elseif ($VideoOnly) { $mode = "video" }

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host " [CLOUD] REMOTION KAGGLE CLOUD ENGINE (GPU ACCELERATED) " -ForegroundColor Cyan
Write-Host " Target Mode: $($mode.ToUpper())" -ForegroundColor Green
Write-Host " Accelerator: Kaggle Dual Tesla T4 GPUs" -ForegroundColor Magenta
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Update render_config.json
$configPath = "./render_config.json"
if (Test-Path $configPath) {
    $cfg = Get-Content $configPath -Raw | ConvertFrom-Json
    $cfg.mode = $mode
    $cfg | ConvertTo-Json -Depth 5 | Set-Content $configPath
    Write-Host "`n--> Updated render_config.json (mode: $mode)" -ForegroundColor Gray
}

# 2. Push code to GitHub
Write-Host "`n[Step 1/4] Syncing project to GitHub..." -ForegroundColor Yellow
git add .
$changes = git status --porcelain
if ($changes) {
    git commit -m "Trigger cloud render (mode: $mode) [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"
    Write-Host "--> Committed local changes." -ForegroundColor Gray
}
git push origin main
Write-Host "[OK] GitHub synchronized!" -ForegroundColor Green

# 3. Push to Kaggle
Write-Host "`n[Step 2/4] Triggering Cloud Engine on Kaggle..." -ForegroundColor Yellow
python -m kaggle kernels push -p ./kaggle_runner
Write-Host "[OK] Job dispatched to Kaggle GPU cluster!" -ForegroundColor Green

# 4. Poll Status
Write-Host "`n[Step 3/4] Processing in Cloud..." -ForegroundColor Yellow
Write-Host "(Your laptop fans stay silent while Kaggle GPUs do all the heavy lifting)" -ForegroundColor DarkGray

$maxWaitSeconds = 600
$elapsed = 0
$done = $false

while (-not $done -and $elapsed -lt $maxWaitSeconds) {
    Start-Sleep -Seconds 12
    $elapsed += 12
    
    $statusRaw = python -m kaggle kernels status $KernelSlug
    Write-Host "[Elapsed: ${elapsed}s] $statusRaw" -ForegroundColor Cyan
    
    if ($statusRaw -match 'complete') {
        $done = $true
        Write-Host "`n[SUCCESS] Cloud job finished successfully!" -ForegroundColor Green
    }
    elseif ($statusRaw -match 'error') {
        Write-Host "`n[ERROR] Kaggle reported an error. Fetching logs..." -ForegroundColor Red
        python -m kaggle kernels output $KernelSlug -p $OutputDir
        exit 1
    }
}

if (-not $done) {
    Write-Host "`n[WARN] Render is taking longer than expected. Run 'python -m kaggle kernels status $KernelSlug' to check." -ForegroundColor Yellow
    exit 0
}

# 5. Download Output
Write-Host "`n[Step 4/4] Downloading generated media from Kaggle..." -ForegroundColor Yellow
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

python -m kaggle kernels output $KernelSlug -p $OutputDir

# Display Results
$videoFile = Join-Path $OutputDir "output.mp4"
$storyboardFile = Join-Path $OutputDir "storyboard\storyboard.html"

Write-Host "`n=======================================================" -ForegroundColor Green
Write-Host " [OK] CLOUD PROCESSING COMPLETED!" -ForegroundColor Green

if (Test-Path $videoFile) {
    $videoItem = Get-Item $videoFile
    $sizeMb = [math]::Round($videoItem.Length / 1MB, 2)
    Write-Host " [VIDEO] Video File: $($videoItem.FullName) ($sizeMb MB)" -ForegroundColor White
}

if (Test-Path $storyboardFile) {
    Write-Host " [STORYBOARD] Storyboard Viewer: $storyboardFile" -ForegroundColor White
    Write-Host "--> Launching Storyboard Viewer in your browser..." -ForegroundColor Yellow
    try { Start-Process $storyboardFile } catch {}
}
Write-Host "=======================================================" -ForegroundColor Green
