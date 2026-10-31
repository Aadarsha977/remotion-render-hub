param (
    [string]$KernelSlug = "techidea/remotion-renderer",
    [string]$OutputDir = "./dist"
)

$ErrorActionPreference = "Stop"

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host " 🚀 REMOTION KAGGLE CLOUD RENDER PIPELINE" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Push code to GitHub
Write-Host "`n[Step 1/4] Checking & Pushing code to GitHub..." -ForegroundColor Yellow
git add .
$changes = git status --porcelain
if ($changes) {
    git commit -m "Auto-sync before cloud render [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"
    Write-Host "--> Committed changes locally." -ForegroundColor Gray
} else {
    Write-Host "--> No local changes to commit." -ForegroundColor Gray
}

Write-Host "--> Pushing commits to GitHub..." -ForegroundColor Gray
git push origin main
Write-Host "✅ Code is live on GitHub!" -ForegroundColor Green

# 2. Push Kaggle Kernel
Write-Host "`n[Step 2/4] Triggering Cloud Render on Kaggle..." -ForegroundColor Yellow
python -m kaggle kernels push -p ./kaggle_runner
Write-Host "✅ Kernel successfully queued on Kaggle!" -ForegroundColor Green

# 3. Poll Status
Write-Host "`n[Step 3/4] Waiting for Kaggle to render your video..." -ForegroundColor Yellow
Write-Host "(Your laptop fans stay silent while Kaggle's 4 vCPUs do the work)" -ForegroundColor DarkGray

$maxWaitSeconds = 600 # 10 minutes
$elapsed = 0
$done = $false

while (-not $done -and $elapsed -lt $maxWaitSeconds) {
    Start-Sleep -Seconds 12
    $elapsed += 12
    
    $statusRaw = python -m kaggle kernels status $KernelSlug
    Write-Host "[Elapsed: ${elapsed}s] $statusRaw" -ForegroundColor Cyan
    
    if ($statusRaw -match '"complete"') {
        $done = $true
        Write-Host "`n🎉 Cloud rendering finished successfully!" -ForegroundColor Green
    }
    elseif ($statusRaw -match '"error"') {
        Write-Host "`n❌ Kaggle reported an error during rendering." -ForegroundColor Red
        Write-Host "Fetching logs..." -ForegroundColor Yellow
        python -m kaggle kernels output $KernelSlug -p ./dist
        exit 1
    }
}

if (-not $done) {
    Write-Host "`n⚠️ Render is taking longer than expected. Run 'python -m kaggle kernels status $KernelSlug' to check." -ForegroundColor Yellow
    exit 0
}

# 4. Download Video
Write-Host "`n[Step 4/4] Downloading your finished video from Kaggle..." -ForegroundColor Yellow
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

python -m kaggle kernels output $KernelSlug -p $OutputDir

$videoPath = Join-Path $OutputDir "output.mp4"
if (Test-Path $videoPath) {
    $videoItem = Get-Item $videoPath
    $sizeMb = [math]::Round($videoItem.Length / 1MB, 2)
    Write-Host "`n=======================================================" -ForegroundColor Green
    Write-Host " ✅ VIDEO DOWNLOADED SUCCESSFULLY!" -ForegroundColor Green
    Write-Host " 📁 File: $($videoItem.FullName)" -ForegroundColor White
    Write-Host " 📦 Size: $sizeMb MB" -ForegroundColor White
    Write-Host "=======================================================" -ForegroundColor Green
} else {
    Write-Host "`nFiles downloaded into $OutputDir:" -ForegroundColor Gray
    Get-ChildItem $OutputDir
}
