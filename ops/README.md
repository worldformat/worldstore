# worldstore — macOS Setup

This document describes how to install and run **worldstore** as a
background service on macOS using **launchd**.

## Requirements

- macOS
- Node.js (copied as a standalone binary)
- pnpm (build-time only)

## Directory Layout

worldstore uses the following locations:

- **Application**
  - `~/Applications/Worldstore.app`
- **World data**
  - `~/Library/Application Support/org.worldformat.worldstore/worlds`
- **Logs**
  - `~/Library/Logs/Worldstore`
- **LaunchAgent**
  - `~/Library/LaunchAgents/org.worldformat.worldstore.plist`

## Install (one-time)

```bash
# Create data and log directories
mkdir -p ~/Library/Application\ Support/org.worldformat.worldstore/worlds
mkdir -p ~/Library/Logs/Worldstore

# Prepare application directory
mkdir -p ~/Applications/Worldstore.app/bin

# Copy Node.js binary (use the same version you build with)
cp -p /path/to/bin/node ~/Applications/Worldstore.app/bin/node

# Install LaunchAgent (HOME will be expanded)
sed "s#__HOME__#$HOME#" ./launchd/org.worldformat.worldstore.plist \
  > ~/Library/LaunchAgents/org.worldformat.worldstore.plist
```

## Build and Deploy

```bash
# Build the server
pnpm build

# Deploy build output
rsync -a build/ ~/Applications/Worldstore.app/dist/

# Deploy production dependencies
cp package.json pnpm-lock.yaml ~/Applications/Worldstore.app/
pnpm install -C ~/Applications/Worldstore.app/ --prod --frozen-lockfile

# Load LaunchAgent
launchctl load ~/Library/LaunchAgents/org.worldformat.worldstore.plist
```

## Restart

```bash
launchctl kickstart -k gui/$(id -u)/org.worldformat.worldstore
```

## Notes

- The repository is **not** used at runtime.
- `worldstore` continues running even if the repo is deleted.
- World files are stored independently under `Application Support`.

This setup is intended for long-running, low-maintenance personal use.