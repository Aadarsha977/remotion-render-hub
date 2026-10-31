import os
import subprocess
import sys

def run_cmd(cmd, cwd=None):
    print(f"\n[EXEC] {cmd}")
    res = subprocess.run(cmd, shell=True, cwd=cwd)
    if res.returncode != 0:
        print(f"[ERROR] Command exited with code {res.returncode}")
        sys.exit(res.returncode)

print("=" * 60)
print("🚀 Remotion Cloud Video Renderer starting on Kaggle...")
print("=" * 60)

# 1. Install Node.js 22 LTS & Linux Headless Dependencies
print("\n[Step 1/5] Installing Node.js 22 and headless libraries...")
install_system_libs = (
    "curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && "
    "apt-get update -qq && "
    "apt-get install -y -qq nodejs xvfb ffmpeg libnss3 libatk1.0-0 libatk-bridge2.0-0 "
    "libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 libgbm1"
)
run_cmd(install_system_libs)

# Handle sound library (Ubuntu 22 vs 24 compatibility)
subprocess.run("apt-get install -y -qq libasound2t64 || apt-get install -y -qq libasound2", shell=True)

# 2. Verify Node and FFmpeg
print("\n[Step 2/5] Verifying toolchain...")
run_cmd("node -v && npm -v && ffmpeg -version | head -n 1")

# 3. Clone Repository into /tmp (so /kaggle/working only contains the final video!)
repo_url = "https://github.com/Aadarsha977/remotion-render-hub.git"
project_dir = "/tmp/remotion-project"

print(f"\n[Step 3/5] Pulling code from {repo_url}...")
if os.path.exists(project_dir):
    run_cmd("git pull origin main", cwd=project_dir)
else:
    run_cmd(f"git clone {repo_url} {project_dir}")

# 4. Install Remotion Dependencies & Dedicated Headless Chromium Shell
print("\n[Step 4/5] Installing Remotion dependencies and browser binary...")
run_cmd("npm ci --prefer-offline || npm install --no-audit --no-fund", cwd=project_dir)
run_cmd("npx remotion browser ensure", cwd=project_dir)

# 5. Execute Cloud Video Render
output_file = "/kaggle/working/output.mp4"
composition_id = "Main"

print(f"\n[Step 5/5] Rendering Composition '{composition_id}' to {output_file}...")
render_command = (
    f"xvfb-run -a npx remotion render {composition_id} {output_file} "
    f"--concurrency=4 "
    f"--gl=angle-egl "
    f"--chromium-options='--disable-dev-shm-usage --no-sandbox' "
    f"--log=info"
)
run_cmd(render_command, cwd=project_dir)

# Verification
if os.path.exists(output_file) and os.path.getsize(output_file) > 1000:
    size_mb = os.path.getsize(output_file) / (1024 * 1024)
    print("\n" + "=" * 60)
    print(f"✅ SUCCESS: Video rendered successfully! File size: {size_mb:.2f} MB")
    print(f"Artifact location: {output_file}")
    print("=" * 60)
else:
    print("\n❌ Rendering completed but output.mp4 was not generated.")
    sys.exit(1)
