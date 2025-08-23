#!/usr/bin/env bash
# Run Astro dev server locally (and optionally on your phone)

# === CONFIG: change to your project folder ===
PROJECT_DIR="$HOME/Documents/GitHub/AledEvansMusic_Website"

# === OPTIONS ===
PORT="${PORT:-4321}"        # change default by running: PORT=3000 ./run-local.sh
MOBILE="${MOBILE:-0}"       # run: MOBILE=1 ./run-local.sh  (serves to your LAN for iPhone testing)

# --- Helpers ---
error() { printf "\033[31m✖ %s\033[0m\n" "$1"; exit 1; }
info()  { printf "\033[36mℹ %s\033[0m\n" "$1"; }
ok()    { printf "\033[32m✔ %s\033[0m\n" "$1"; }

# 1) Go to project
cd "$PROJECT_DIR" || error "Project not found at $PROJECT_DIR. Edit the script’s PROJECT_DIR path."

# 2) Quick checks
command -v node >/dev/null 2>&1 || error "Node.js not found. Install from https://nodejs.org (v18+)."
command -v npm  >/dev/null 2>&1 || error "npm not found. Install Node.js first."

# 3) Install deps if needed
if [ ! -d "node_modules" ]; then
  info "Installing dependencies (first run)…"
  npm ci || npm install || error "Dependency install failed."
  ok "Dependencies installed."
fi

# 4) Start dev server
if [ "$MOBILE" = "1" ]; then
  # get local IP for iPhone preview
  IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "localhost")
  info "Serving to your LAN so you can test on phone."
  info "On your iPhone, open:  http://$IP:$PORT"
  info "On this Mac, open:     http://localhost:$PORT"
  # open browser on Mac
  (sleep 1 && open "http://localhost:$PORT") >/dev/null 2>&1 &
  # run astro with host
  npm run dev -- --host --port "$PORT"
else
  info "Starting local preview at http://localhost:$PORT"
  (sleep 1 && open "http://localhost:$PORT") >/dev/null 2>&1 &
  npm run dev -- --port "$PORT"
fi
