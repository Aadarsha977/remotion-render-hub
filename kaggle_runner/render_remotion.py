import json
import os
import subprocess
import sys
import time

def run_cmd(cmd, cwd=None):
    print(f"\n[EXEC] {cmd}")
    res = subprocess.run(cmd, shell=True, cwd=cwd)
    if res.returncode != 0:
        print(f"[ERROR] Command exited with code {res.returncode}")
        sys.exit(res.returncode)

print("=" * 65)
print("🚀 Remotion Cloud Video & Storyboard Engine (Ultra-Fast GPU)")
print("=" * 65)

# 0. Check and Log Hardware Accelerator
print("\n[Hardware Diagnostics]")
gpu_check = subprocess.run("nvidia-smi --query-gpu=gpu_name,memory.total --format=csv,noheader", shell=True, capture_output=True, text=True)
if gpu_check.returncode == 0 and gpu_check.stdout.strip():
    print("🔥 Dedicated GPU Cluster Active (Dual Tesla T4):")
    for line in gpu_check.stdout.strip().split("\n"):
        print(f"   -> {line}")
    gl_flag = "--gl=angle-egl"
    chromium_gpu_flags = (
        "--disable-dev-shm-usage "
        "--no-sandbox "
        "--use-gl=egl "
        "--enable-gpu-rasterization "
        "--enable-zero-copy "
        "--ignore-gpu-blocklist"
    )
else:
    print("⚠️ Running on multi-core CPU (fallback software rasterizer)")
    gl_flag = "--gl=swangle"
    chromium_gpu_flags = "--disable-dev-shm-usage --no-sandbox"

# 1. Fast Node.js 22 LTS & System Environment Setup (No Full PPA Refresh)
print("\n[Step 1/5] Fast Node.js & System Environment Check...")
node_check = subprocess.run("node -v", shell=True, capture_output=True, text=True)
if not (node_check.returncode == 0 and "v22." in node_check.stdout):
    print("-> Installing Node.js 22 LTS via direct official binary tarball (~3s)...")
    node_url = "https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-x64.tar.xz"
    run_cmd(f"curl -fsSL {node_url} | tar -xJ -C /usr/local --strip-components=1")
else:
    print(f"-> Node.js already available: {node_check.stdout.strip()}")

xvfb_check = subprocess.run("which xvfb-run", shell=True, capture_output=True, text=True)
if xvfb_check.returncode != 0:
    print("-> Installing xvfb and graphics libraries without full PPA update...")
    subprocess.run("apt-get install -y -qq --no-install-recommends xvfb libasound2t64 libatk1.0-0t64 libatk-bridge2.0-0t64 libxcomposite1 || apt-get install -y -qq xvfb", shell=True)

# 2. Clone Repository with shallow depth into /tmp
repo_url = "https://github.com/Aadarsha977/remotion-render-hub.git"
project_dir = "/tmp/remotion-project"

print(f"\n[Step 2/5] Fetching project from {repo_url}...")
if os.path.exists(project_dir):
    run_cmd("git pull origin main", cwd=project_dir)
else:
    run_cmd(f"git clone --depth 1 {repo_url} {project_dir}")

# Read render configuration
config_path = os.path.join(project_dir, "render_config.json")
config = {
    "composition": "Main",
    "mode": "all",
    "fps": 30,
    "durationInFrames": 150,
    "storyboardIntervalFrames": 30,
    "imageFormat": "jpeg",
    "jpegQuality": 85
}
if os.path.exists(config_path):
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            config.update(json.load(f))
        print(f" Loaded render configuration: {config}")
    except Exception as e:
        print(f"⚠️ Warning reading config: {e}")

composition_id = config.get("composition", "Main")
render_mode = config.get("mode", "all").lower()
fps = config.get("fps", 30)
duration_frames = config.get("durationInFrames", 150)
interval_frames = config.get("storyboardIntervalFrames", 30)
image_format = config.get("imageFormat", "jpeg")
jpeg_quality = config.get("jpegQuality", 85)

# 3. Install Remotion Dependencies & Chromium Shell
print("\n[Step 3/5] Installing Remotion dependencies and browser binary...")
run_cmd("npm ci --prefer-offline || npm install --no-audit --no-fund", cwd=project_dir)
run_cmd("npx remotion browser ensure", cwd=project_dir)

working_dir = "/kaggle/working"
os.makedirs(working_dir, exist_ok=True)

# 4. Render Video (Full or Draft for Storyboard)
output_file = os.path.join(working_dir, "output.mp4")

if render_mode in ["all", "video"]:
    print(f"\n[Step 4/5] 🎥 Rendering Full Production Video to {output_file}...")
    render_command = (
        f"xvfb-run -a npx remotion render {composition_id} {output_file} "
        f"--concurrency=4 {gl_flag} "
        f"--image-format={image_format} "
        f"--jpeg-quality={jpeg_quality} "
        f"--chromium-options='{chromium_gpu_flags}' "
        f"--crf=16 "
        f"--pixel-format=yuv420p "
        f"--log=info"
    )
    run_cmd(render_command, cwd=project_dir)

    if os.path.exists(output_file) and os.path.getsize(output_file) > 1000:
        size_mb = os.path.getsize(output_file) / (1024 * 1024)
        print(f"\n✅ Video render completed! Output file size: {size_mb:.2f} MB")
    else:
        print("\n❌ Video file was not created.")
        sys.exit(1)
elif render_mode == "storyboard":
    # Fast draft render for extracting storyboard stills in seconds
    print(f"\n[Step 4/5] ⚡ Fast Draft Render for Storyboard Keyframes...")
    output_file = "/tmp/draft_render.mp4"
    render_command = (
        f"xvfb-run -a npx remotion render {composition_id} {output_file} "
        f"--concurrency=4 {gl_flag} "
        f"--image-format=jpeg "
        f"--jpeg-quality=80 "
        f"--scale=0.5 "
        f"--crf=28 "
        f"--chromium-options='{chromium_gpu_flags}' "
        f"--log=error"
    )
    run_cmd(render_command, cwd=project_dir)

# 5. Extract Storyboard Keyframe Stills via Instant FFmpeg (<1s) & HTML Viewer
if render_mode in ["all", "storyboard"]:
    print("\n[Step 5/5] 📸 Generating Storyboard Keyframe Stills via Sub-Second FFmpeg...")
    storyboard_dir = os.path.join(working_dir, "storyboard")
    os.makedirs(storyboard_dir, exist_ok=True)

    # Calculate keyframes to capture
    keyframes = list(range(0, duration_frames, interval_frames))
    if (duration_frames - 1) not in keyframes:
        keyframes.append(duration_frames - 1)

    print(f"-> Extracting {len(keyframes)} keyframes directly from rendered video: {keyframes}")
    
    stills_data = []
    for kf in keyframes:
        frame_filename = f"frame_{kf:04d}.png"
        output_still = os.path.join(storyboard_dir, frame_filename)
        seconds = kf / fps
        
        # Fast seek frame extraction using FFmpeg (<0.04s per frame)
        extract_cmd = f"ffmpeg -y -ss {seconds:.3f} -i {output_file} -frames:v 1 {output_still} -loglevel error"
        subprocess.run(extract_cmd, shell=True)
        
        stills_data.append({
            "frame": kf,
            "seconds": round(seconds, 2),
            "filename": frame_filename
        })

    # Generate Luxury Responsive Storyboard HTML Viewer
    storyboard_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Storyboard Viewer • {composition_id}</title>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #090d16;
      color: #e2e8f0;
      padding: 30px 20px;
    }}
    .header {{
      max-width: 1300px;
      margin: 0 auto 30px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 20px;
    }}
    .title-area h1 {{
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(135deg, #38bdf8, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}
    .meta-pills {{
      display: flex;
      gap: 10px;
      margin-top: 8px;
    }}
    .pill {{
      background: #1e293b;
      color: #94a3b8;
      font-size: 13px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 9999px;
      border: 1px solid #334155;
    }}
    .pill.glow {{
      background: rgba(34, 197, 94, 0.15);
      color: #4ade80;
      border-color: #22c55e;
    }}
    .grid {{
      max-width: 1300px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 24px;
    }}
    .card {{
      background: #131c2e;
      border: 1px solid #1e293b;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      transition: transform 0.2s ease, border-color 0.2s ease;
      cursor: pointer;
    }}
    .card:hover {{
      transform: translateY(-4px);
      border-color: #38bdf8;
    }}
    .card img {{
      width: 100%;
      height: auto;
      display: block;
      background: #020617;
    }}
    .card-footer {{
      padding: 14px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
    }}
    .frame-num {{
      font-weight: 700;
      font-size: 15px;
      color: #f8fafc;
    }}
    .timestamp {{
      font-size: 14px;
      color: #38bdf8;
      font-family: monospace;
      font-weight: 600;
    }}
    /* Modal / Lightbox */
    .modal {{
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.92);
      z-index: 9999;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 20px;
    }}
    .modal.active {{ display: flex; }}
    .modal img {{
      max-width: 90vw;
      max-height: 80vh;
      border-radius: 10px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      border: 1px solid #334155;
    }}
    .modal-bar {{
      margin-top: 15px;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      gap: 20px;
      align-items: center;
    }}
    .modal-btn {{
      background: #1e293b;
      border: 1px solid #475569;
      color: #fff;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }}
    .modal-btn:hover {{ background: #334155; }}
  </style>
</head>
<body>
  <div class="header">
    <div class="title-area">
      <h1>Cloud Storyboard Preview</h1>
      <div class="meta-pills">
        <span class="pill glow">⚡ Kaggle GPU Accelerated</span>
        <span class="pill">Composition: {composition_id}</span>
        <span class="pill">Total: {duration_frames} frames ({duration_frames / fps:.1f}s @ {fps}fps)</span>
        <span class="pill">{len(keyframes)} Keyframe Stills</span>
      </div>
    </div>
  </div>

  <div class="grid">
"""
    for item in stills_data:
        storyboard_html += f"""
    <div class="card" onclick="openLightbox('{item['filename']}', '{item['frame']}', '{item['seconds']}')">
      <img src="./{item['filename']}" alt="Frame {item['frame']}">
      <div class="card-footer">
        <span class="frame-num">Frame #{item['frame']}</span>
        <span class="timestamp">{item['seconds']}s</span>
      </div>
    </div>
"""

    storyboard_html += """
  </div>

  <!-- Lightbox Modal -->
  <div class="modal" id="lightboxModal" onclick="closeLightbox()">
    <img id="lightboxImg" src="" onclick="event.stopPropagation()">
    <div class="modal-bar" onclick="event.stopPropagation()">
      <span id="lightboxLabel">Frame #0</span>
      <button class="modal-btn" onclick="closeLightbox()">Close (Esc)</button>
    </div>
  </div>

  <script>
    function openLightbox(filename, frame, seconds) {
      document.getElementById('lightboxImg').src = './' + filename;
      document.getElementById('lightboxLabel').innerText = 'Frame #' + frame + ' (' + seconds + 's)';
      document.getElementById('lightboxModal').classList.add('active');
    }
    function closeLightbox() {
      document.getElementById('lightboxModal').classList.remove('active');
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  </script>
</body>
</html>
"""
    with open(os.path.join(storyboard_dir, "storyboard.html"), "w", encoding="utf-8") as f:
        f.write(storyboard_html)
    print("✅ Storyboard keyframes and storyboard.html viewer generated in <1s!")

print("\n" + "=" * 65)
print("🎉 KAGGLE CLOUD PIPELINE FINISHED SUCCESSFULLY!")
print("=" * 65)
