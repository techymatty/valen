# Valentine Website (Node.js)

A lightweight Valentine-themed web app served by a small Node.js HTTP server.

## Project Structure

```text
.
├── package.json          # npm metadata + scripts
├── server.js             # Node HTTP server (serves files from /public)
└── public
    ├── index.html        # Main HTML shell
    ├── styles.css        # Styling and animation
    └── script.js         # Client-side interactivity
```

## Prerequisites

- **Node.js 18+** (Node 20+ recommended)
- **npm** (usually bundled with Node)

Check your versions:

```bash
node -v
npm -v
```

---

## 1) Clone and enter the project

```bash
git clone <your-repo-url>
cd valen
```

If you already have the code locally, just `cd` into the repository root.

---

## 2) Install dependencies

This project currently uses only built-in Node modules in runtime, but running install is still a good standard step for consistency and future deps.

```bash
npm install
```

If `npm install` fails in a restricted environment (e.g., network policy/proxy), you can still run this specific project because `server.js` does not require external packages.

---

## 3) Start the app

### Option A (recommended): npm script

```bash
npm start
```

### Option B: direct Node command

```bash
node server.js
```

By default the app runs on:

- `http://localhost:4173`
- `http://127.0.0.1:4173`

You should see:

```text
Valentine site running on http://0.0.0.0:4173
```

---

## 4) Open in browser

Open:

- Normal landing flow: `http://localhost:4173/`
- Direct question screen: `http://localhost:4173/?start=1`

---

## 5) Verify server health and static assets (optional)

In another terminal:

```bash
curl -i http://127.0.0.1:4173/health
curl -I http://127.0.0.1:4173/
curl -I "http://127.0.0.1:4173/?start=1"
curl -I http://127.0.0.1:4173/styles.css
curl -I http://127.0.0.1:4173/script.js
```

Expected:

- `/health` returns `200` with JSON `{"ok":true}`
- `/`, `/?start=1`, and static assets return `200`

---

## 6) Stop the server

Press:

```text
Ctrl + C
```

in the terminal running `npm start` / `node server.js`.

---

## Runtime Configuration

You can override the default port with environment variable `PORT`.

### Linux/macOS

```bash
PORT=8080 npm start
```

### Windows (PowerShell)

```powershell
$env:PORT=8080; npm start
```

Then open `http://localhost:8080`.

---

## Troubleshooting

### `EADDRINUSE: address already in use`

Port 4173 is occupied. Use another port:

```bash
PORT=8080 npm start
```

### `npm install` fails with 403 / proxy / restricted network

This can happen in locked-down CI or corp environments. Since runtime uses Node built-ins only, you can still run:

```bash
node server.js
```

### Browser shows stale content

Force refresh:

- Windows/Linux: `Ctrl + Shift + R`
- macOS: `Cmd + Shift + R`

### Font does not load

`index.html` loads Google Fonts over the network. If blocked, browser falls back to system fonts and the app still works.

---

## Deployment Notes

This is a simple Node HTTP server app. Any host that can run `node server.js` works.

Typical production pattern:

1. Push code to your host/provider.
2. Set start command to `npm start`.
3. Set `PORT` from provider env (most providers do this automatically).
4. Ensure `public/` is included in deploy artifact.

---

## Quick Start (TL;DR)

```bash
git clone <your-repo-url>
cd valen
npm install
npm start
# open http://localhost:4173
```
