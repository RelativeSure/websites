const landingPage = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Toolbox | Sandbox QR Scanner</title>
  <meta name="description" content="A collection of safety-first tools. Explore the sandbox QR scanner to inspect codes without leaving this page." />
  <style>
    :root {
      color-scheme: light dark;
      --font-sans: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
    }

    :root[data-theme="dark"],
    :root:not([data-theme]) {
      --bg: #0f172a;
      --bg-gradient-top: rgba(56, 189, 248, 0.15);
      --bg-gradient-bottom: rgba(74, 222, 128, 0.12);
      --surface: rgba(15, 23, 42, 0.9);
      --surface-subtle: rgba(15, 23, 42, 0.75);
      --panel-gradient-start: rgba(15, 23, 42, 0.75);
      --panel-gradient-end: rgba(30, 41, 59, 0.85);
      --card-border: rgba(148, 163, 184, 0.2);
      --text: #e2e8f0;
      --muted: #94a3b8;
      --accent: #38bdf8;
      --danger: #f87171;
      --warning: #facc15;
      --safe: #4ade80;
      --control-bg: rgba(56, 189, 248, 0.18);
      --control-border: rgba(56, 189, 248, 0.45);
      --badge-bg: rgba(148, 163, 184, 0.1);
      --badge-border: rgba(148, 163, 184, 0.25);
      --switch-track: rgba(148, 163, 184, 0.35);
      --switch-track-active: rgba(56, 189, 248, 0.6);
      --switch-thumb: #0f172a;
      --shadow-lg: 0 20px 45px rgba(15, 23, 42, 0.45);
    }

    :root[data-theme="light"] {
      --bg: #f8fafc;
      --bg-gradient-top: rgba(56, 189, 248, 0.25);
      --bg-gradient-bottom: rgba(74, 222, 128, 0.2);
      --surface: rgba(255, 255, 255, 0.92);
      --surface-subtle: rgba(255, 255, 255, 0.86);
      --panel-gradient-start: rgba(255, 255, 255, 0.92);
      --panel-gradient-end: rgba(226, 232, 240, 0.85);
      --card-border: rgba(148, 163, 184, 0.28);
      --text: #0f172a;
      --muted: #475569;
      --accent: #0ea5e9;
      --danger: #dc2626;
      --warning: #f59e0b;
      --safe: #16a34a;
      --control-bg: rgba(14, 165, 233, 0.16);
      --control-border: rgba(14, 165, 233, 0.38);
      --badge-bg: rgba(226, 232, 240, 0.65);
      --badge-border: rgba(148, 163, 184, 0.3);
      --switch-track: rgba(226, 232, 240, 0.8);
      --switch-track-active: rgba(14, 165, 233, 0.55);
      --switch-thumb: #f8fafc;
      --shadow-lg: 0 18px 34px rgba(15, 23, 42, 0.16);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      background: radial-gradient(circle at top, var(--bg-gradient-top), transparent 55%),
        radial-gradient(circle at bottom, var(--bg-gradient-bottom), transparent 50%), var(--bg);
      color: var(--text);
      display: flex;
      flex-direction: column;
      font-family: var(--font-sans);
      transition: background-color 160ms ease, color 160ms ease;
    }

    header {
      padding: 1.5rem clamp(1rem, 2vw, 3rem);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.5rem;
    }

    .header-main {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      flex: 1;
      min-width: 16rem;
    }

    header h1 {
      margin: 0;
      font-size: clamp(1.6rem, 3vw, 2.4rem);
      letter-spacing: -0.03em;
    }

    header p {
      margin: 0;
      max-width: 38rem;
      color: var(--muted);
      line-height: 1.6;
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-left: auto;
    }

    .theme-control {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.4rem;
    }

    .theme-icons {
      display: flex;
      align-items: center;
      gap: 0.45rem;
    }

    .theme-label {
      font-size: 0.7rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .theme-icon {
      font-size: 0.85rem;
      color: var(--muted);
    }

    .theme-toggle {
      position: relative;
      width: 3.2rem;
      height: 1.6rem;
      border-radius: 999px;
      border: 1px solid var(--card-border);
      background: var(--switch-track);
      padding: 0.18rem;
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      transition: background 160ms ease, border-color 160ms ease;
    }

    .theme-toggle[data-state="checked"] {
      background: var(--switch-track-active);
      border-color: var(--switch-track-active);
      justify-content: flex-end;
    }

    .theme-toggle-thumb {
      width: 1.24rem;
      height: 1.24rem;
      border-radius: 50%;
      background: var(--switch-thumb);
      box-shadow: 0 4px 8px rgba(15, 23, 42, 0.2);
      transition: transform 160ms ease, background 160ms ease, box-shadow 160ms ease;
    }

    .theme-toggle:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 4px;
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .badge {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      border-radius: 999px;
      padding: 0.3rem 0.75rem;
      border: 1px solid var(--badge-border);
      background: var(--badge-bg);
      color: var(--muted);
    }

    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 0 clamp(1rem, 2.5vw, 3rem) 4rem;
    }

    .layout {
      display: grid;
      gap: clamp(1.5rem, 3vw, 2.5rem);
      align-items: start;
    }

    @media (min-width: 1024px) {
      .layout {
        grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
      }
    }

    .sidebar {
      background: linear-gradient(160deg, var(--panel-gradient-start), var(--panel-gradient-end));
      border: 1px solid var(--card-border);
      border-radius: 1.4rem;
      padding: clamp(1.4rem, 2.5vw, 2rem);
      backdrop-filter: blur(18px);
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      position: sticky;
      top: clamp(1rem, 3vw, 2rem);
      max-height: calc(100vh - clamp(2rem, 4vw, 3rem));
      overflow: auto;
      box-shadow: var(--shadow-lg);
    }

    @media (max-width: 1023px) {
      .layout {
        display: flex;
        flex-direction: column;
      }

      .sidebar {
        position: relative;
        top: auto;
        max-height: none;
        overflow: visible;
      }
    }

    .sidebar-header {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .sidebar-header p {
      margin: 0;
      color: var(--muted);
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .sidebar-group {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .sidebar-group-label {
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .tab-kicker {
      font-size: 0.68rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .sidebar h2 {
      margin: 0;
      font-size: clamp(1.2rem, 2vw, 1.5rem);
      letter-spacing: -0.01em;
    }

    .sidebar-tab {
      border: 1px solid transparent;
      background: var(--surface-subtle);
      color: inherit;
      border-radius: 1rem;
      padding: 0.9rem 1rem;
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      transition: border-color 120ms ease, background 120ms ease, transform 120ms ease, color 120ms ease;
      font-size: 0.95rem;
    }

    .sidebar-tab:hover:not([disabled]) {
      border-color: var(--control-border);
      transform: translateY(-1px);
      background: var(--surface);
    }

    .sidebar-tab.active {
      border-color: var(--card-border);
      background: var(--surface);
      box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.2);
    }

    .sidebar-tab[disabled] {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .tab-title {
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    .tab-meta {
      font-size: 0.78rem;
      color: var(--muted);
    }

    .tool-card {
      background: linear-gradient(120deg, var(--panel-gradient-start), var(--panel-gradient-end));
      border: 1px solid var(--card-border);
      border-radius: 1.5rem;
      padding: clamp(1.5rem, 3vw, 2.5rem);
      box-shadow: var(--shadow-lg);
      backdrop-filter: blur(24px);
    }

    .tool-card h2 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: clamp(1.3rem, 2.6vw, 1.8rem);
      letter-spacing: -0.01em;
    }

    .tool-card p.lede {
      margin-top: 0;
      margin-bottom: 1.6rem;
      color: var(--muted);
      max-width: 48rem;
      line-height: 1.6;
    }

    .scanner-grid {
      display: grid;
      gap: clamp(1.4rem, 3vw, 2.5rem);
    }

    @media (min-width: 900px) {
      .scanner-grid {
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
        align-items: start;
      }
    }

    .camera-panel,
    .result-panel {
      background: var(--surface);
      border-radius: 1.2rem;
      padding: clamp(1rem, 2vw, 1.6rem);
      border: 1px solid var(--card-border);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-height: 20rem;
      position: relative;
      overflow: hidden;
    }

    @media (max-width: 700px) {
      .camera-panel,
      .result-panel {
        min-height: auto;
      }
    }

    video {
      width: 100%;
      aspect-ratio: 3 / 4;
      border-radius: 1rem;
      background: var(--surface-subtle);
      border: 1px solid var(--card-border);
      object-fit: cover;
    }

    canvas {
      display: none;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    button,
    .upload-btn {
      border: none;
      border-radius: 999px;
      padding: 0.65rem 1.4rem;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      cursor: pointer;
      transition: transform 120ms ease, opacity 120ms ease, background 120ms ease, border-color 120ms ease;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: var(--control-bg);
      color: var(--text);
      border: 1px solid var(--control-border);
    }

    button[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }

    button:not([disabled]):hover,
    .upload-btn:hover {
      transform: translateY(-1px);
      opacity: 0.92;
    }

    .upload-btn {
      position: relative;
      overflow: hidden;
    }

    .upload-btn span {
      pointer-events: none;
    }

    .upload-btn input[type="file"] {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
    }

    #status {
      font-size: 0.95rem;
      color: var(--muted);
      min-height: 1.5rem;
    }

    #status.positive {
      color: var(--safe);
    }

    #status.warning {
      color: var(--warning);
    }

    #status.error {
      color: var(--danger);
    }

    .result-panel h3 {
      margin: 0;
      font-size: 1.1rem;
    }

    .result-card {
      background: var(--surface-subtle);
      border-radius: 1rem;
      border: 1px solid var(--card-border);
      padding: 1rem 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .result-row {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .result-row .label {
      text-transform: uppercase;
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      color: var(--muted);
    }

    .result-row a {
      color: var(--accent);
      text-decoration: none;
      word-break: break-word;
    }

    .result-row a:hover {
      text-decoration: underline;
    }

    .rating-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      border-radius: 999px;
      font-weight: 600;
      letter-spacing: 0.015em;
      padding: 0.5rem 1rem;
      background: rgba(148, 163, 184, 0.18);
    }

    .rating-pill[data-level="good"] {
      background: rgba(74, 222, 128, 0.16);
      border: 1px solid rgba(74, 222, 128, 0.45);
      color: var(--safe);
    }

    .rating-pill[data-level="warning"] {
      background: rgba(250, 204, 21, 0.16);
      border: 1px solid rgba(250, 204, 21, 0.45);
      color: var(--warning);
    }

    .rating-pill[data-level="danger"] {
      background: rgba(248, 113, 113, 0.18);
      border: 1px solid rgba(248, 113, 113, 0.45);
      color: var(--danger);
    }

    .caption {
      font-size: 0.78rem;
      color: var(--muted);
    }

    .screenshot-wrapper {
      border-radius: 1rem;
      overflow: hidden;
      border: 1px solid var(--card-border);
      background: var(--surface-subtle);
      position: relative;
    }

    .screenshot-wrapper img {
      width: 100%;
      display: block;
    }

    .warnings-list {
      margin: 0.5rem 0 0;
      padding-left: 1.2rem;
      color: var(--warning);
    }

    .warnings-list li + li {
      margin-top: 0.35rem;
    }

    .preview-block {
      background: var(--surface);
      border-radius: 0.9rem;
      border: 1px solid var(--card-border);
      padding: 0.85rem 1rem;
      font-size: 0.9rem;
      line-height: 1.6;
      max-height: 12rem;
      overflow: auto;
      color: var(--text);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      padding: 0.2rem 0.6rem;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      background: rgba(148, 163, 184, 0.12);
    }

    .analysis-meta {
      font-size: 0.75rem;
      color: var(--muted);
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 1rem;
      align-items: center;
    }

    footer {
      color: var(--muted);
      font-size: 0.8rem;
      padding: 2rem clamp(1rem, 2.5vw, 3rem);
      border-top: 1px solid var(--card-border);
      text-align: center;
      letter-spacing: 0.01em;
    }

    @media (max-width: 720px) {
      header {
        flex-direction: column;
        align-items: stretch;
      }

      .header-controls {
        margin-left: 0;
        align-self: flex-start;
      }

      .theme-control {
        align-items: flex-start;
      }

      .controls button,
      .controls .upload-btn {
        flex: 1 1 calc(50% - 0.4rem);
      }
    }

    @media (max-width: 540px) {
      .controls button,
      .controls .upload-btn {
        flex: 1 1 100%;
      }

      main {
        padding-bottom: 3rem;
      }
    }

    @media (max-width: 700px) {
      .sidebar-nav {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .sidebar-tab {
        flex: 1 1 12rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-main">
      <div>
        <h1>Safety Tools Workbench</h1>
        <p>Inspect and triage digital artifacts in a controlled environment. The QR sandbox lets you examine codes, review targets, and gauge their trust profile without leaving the page.</p>
      </div>
      <div class="badges">
        <span class="badge">Cloudflare Worker Ready</span>
        <span class="badge">Client-side Sandbox</span>
      </div>
    </div>
    <div class="header-controls">
      <div class="theme-control">
        <span class="theme-label" id="theme-toggle-label">Theme</span>
        <div class="theme-icons">
          <span class="theme-icon" aria-hidden="true">☀</span>
          <button id="theme-toggle" class="theme-toggle" type="button" role="switch" aria-checked="false" aria-labelledby="theme-toggle-label">
            <span class="theme-toggle-thumb"></span>
          </button>
          <span class="theme-icon" aria-hidden="true">☾</span>
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="layout">
      <aside class="sidebar" aria-label="Tool navigation">
        <div class="sidebar-header">
          <span class="tab-kicker">Tools</span>
          <h2>Sandbox Suite</h2>
          <p>Select a tool to load it into the workbench.</p>
        </div>
        <nav class="sidebar-nav" aria-label="Tool list">
          <div class="sidebar-group">
            <span class="sidebar-group-label">Active</span>
            <button class="sidebar-tab active" type="button" data-target="qr-sandbox" aria-controls="qr-sandbox" aria-pressed="true">
              <span class="tab-title">Sandbox QR Scanner</span>
              <span class="tab-meta">Decode · Rate · Preview</span>
            </button>
          </div>
          <div class="sidebar-group" aria-hidden="true">
            <span class="sidebar-group-label">Planned</span>
            <button class="sidebar-tab" type="button" disabled aria-pressed="false">
              <span class="tab-title">Link Reputation Monitor</span>
              <span class="tab-meta">Coming soon</span>
            </button>
            <button class="sidebar-tab" type="button" disabled aria-pressed="false">
              <span class="tab-title">File Hash Analyzer</span>
              <span class="tab-meta">Coming soon</span>
            </button>
          </div>
        </nav>
      </aside>
      <section class="tool-card" id="qr-sandbox" data-tool-section="qr-sandbox">
        <h2>Sandbox QR Scanner</h2>
        <p class="lede">Run QR codes through a zero-click sandbox. Decode the destination, view a live screenshot, read a safe text preview, and review an adaptive risk score before deciding whether to open it.</p>
        <div class="scanner-grid">
          <div class="camera-panel">
            <div>
              <video id="camera" autoplay playsinline muted></video>
              <canvas id="qr-canvas" hidden></canvas>
            </div>
            <div class="controls">
              <button id="start-camera" type="button">Start camera scan</button>
              <button id="stop-camera" type="button" disabled>Stop camera</button>
              <label class="upload-btn">
                <span>Upload QR image</span>
                <input id="file-input" type="file" accept="image/*" />
              </label>
            </div>
            <div id="status">Awaiting scan…</div>
          </div>
          <div class="result-panel">
            <div class="result-card" id="result" hidden>
              <div class="result-row">
                <span class="label">Decoded Payload</span>
                <code id="decoded-text" style="font-size: 0.9rem; word-break: break-word; background: rgba(148, 163, 184, 0.12); padding: 0.45rem 0.6rem; border-radius: 0.6rem; display: block;"></code>
              </div>
              <div id="analysis-block" hidden>
                <div class="result-row">
                  <span class="label">Destination</span>
                  <a id="result-link" target="_blank" rel="noopener noreferrer"></a>
                </div>
                <div class="result-row">
                  <span class="label">Safety Rating</span>
                  <span id="result-rating" class="rating-pill" data-level="warning">Pending analysis…</span>
                </div>
                <div class="analysis-meta">
                  <span class="chip" id="result-status" hidden></span>
                  <span class="chip" id="result-final-url" hidden></span>
                  <span class="chip" id="result-timestamp"></span>
                </div>
                <div class="result-row" id="meta-container" hidden>
                  <span class="label">Page Metadata</span>
                  <div>
                    <div id="result-title" style="font-weight: 600; margin-bottom: 0.3rem;"></div>
                    <div id="result-description" style="color: var(--muted);"></div>
                  </div>
                </div>
                <div class="result-row" id="preview-container" hidden>
                  <span class="label">Sandbox Text Preview</span>
                  <div class="preview-block" id="result-preview"></div>
                </div>
                <div class="result-row" id="screenshot-container" hidden>
                  <span class="label">Live Screenshot</span>
                  <div class="screenshot-wrapper">
                    <img id="result-screenshot" alt="Website screenshot preview" loading="lazy" />
                  </div>
                  <span class="caption">Screenshot served via image.thum.io</span>
                </div>
                <div class="result-row" id="warnings-container" hidden>
                  <span class="label">Signals to Review</span>
                  <ul class="warnings-list" id="result-warnings"></ul>
                </div>
              </div>
              <div id="non-url-note" class="caption" hidden>Payload is not a URL. No sandbox checks were run.</div>
            </div>
            <div id="placeholder" style="color: var(--muted); text-align: center; margin-top: auto;">
              <p style="margin: 0; font-size: 0.95rem;">No scan yet. Use the camera or upload an image to get started.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  <footer>
    Crafted for Cloudflare Workers deployment. Future tools will be added to this workbench.
  </footer>

  <script type="module">
    import jsQR from 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/es6/index.js';

    const videoEl = document.getElementById('camera');
    const canvasEl = document.getElementById('qr-canvas');
    const ctx = canvasEl.getContext('2d', { willReadFrequently: true });
    const statusEl = document.getElementById('status');
    const resultCard = document.getElementById('result');
    const placeholder = document.getElementById('placeholder');
    const decodedTextEl = document.getElementById('decoded-text');
    const analysisBlock = document.getElementById('analysis-block');
    const nonUrlNote = document.getElementById('non-url-note');
    const resultLink = document.getElementById('result-link');
    const resultRating = document.getElementById('result-rating');
    const resultWarnings = document.getElementById('result-warnings');
    const warningsContainer = document.getElementById('warnings-container');
    const screenshotContainer = document.getElementById('screenshot-container');
    const screenshotImg = document.getElementById('result-screenshot');
    const previewContainer = document.getElementById('preview-container');
    const previewEl = document.getElementById('result-preview');
    const metaContainer = document.getElementById('meta-container');
    const titleEl = document.getElementById('result-title');
    const descriptionEl = document.getElementById('result-description');
    const statusChip = document.getElementById('result-status');
    const finalChip = document.getElementById('result-final-url');
    const timestampChip = document.getElementById('result-timestamp');
    const startBtn = document.getElementById('start-camera');
    const stopBtn = document.getElementById('stop-camera');
    const fileInput = document.getElementById('file-input');
    const sidebarTabs = Array.from(document.querySelectorAll('.sidebar-tab[data-target]'));
    const toolSections = Array.from(document.querySelectorAll('[data-tool-section]'));
    const themeToggle = document.getElementById('theme-toggle');
    const themeStorageKey = 'tools-theme';
    const prefersDark = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : { matches: true };

    let stream = null;
    let scanning = false;
    let frameHandle = 0;

    function getStoredTheme() {
      try {
        const stored = localStorage.getItem(themeStorageKey);
        return stored === 'light' || stored === 'dark' ? stored : null;
      } catch (error) {
        return null;
      }
    }

    function updateThemeToggle(theme) {
      if (!themeToggle) return;
      const isDark = theme === 'dark';
      themeToggle.setAttribute('data-state', isDark ? 'checked' : 'unchecked');
      themeToggle.setAttribute('aria-checked', String(isDark));
    }

    function applyTheme(theme, persist = false) {
      const resolved = theme === 'light' || theme === 'dark' ? theme : prefersDark.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = resolved;
      updateThemeToggle(resolved);
      if (persist) {
        try {
          localStorage.setItem(themeStorageKey, resolved);
        } catch (error) {
          // Storage may be unavailable (private mode, SSR) – ignore.
        }
      }
    }

    function initTheme() {
      const stored = getStoredTheme();
      applyTheme(stored ?? (prefersDark.matches ? 'dark' : 'light'));
    }

    function activateToolSection(targetId) {
      toolSections.forEach((section) => {
        const isActive = section.dataset.toolSection === targetId;
        section.toggleAttribute('hidden', !isActive);
      });
      sidebarTabs.forEach((tab) => {
        const isActive = tab.dataset.target === targetId;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-pressed', String(isActive));
      });
    }

    function setStatus(message, variant = 'info') {
      statusEl.textContent = message;
      statusEl.classList.remove('positive', 'warning', 'error');
      if (variant === 'success') {
        statusEl.classList.add('positive');
      } else if (variant === 'warn') {
        statusEl.classList.add('warning');
      } else if (variant === 'error') {
        statusEl.classList.add('error');
      }
    }

    function resetAnalysisPanels() {
      analysisBlock.hidden = true;
      nonUrlNote.hidden = true;
      warningsContainer.hidden = true;
      screenshotContainer.hidden = true;
      previewContainer.hidden = true;
      metaContainer.hidden = true;
      resultWarnings.replaceChildren();
      screenshotImg.removeAttribute('src');
      titleEl.textContent = '';
      descriptionEl.textContent = '';
      previewEl.textContent = '';
      statusChip.hidden = true;
      finalChip.hidden = true;
      resultRating.dataset.level = 'warning';
      resultRating.textContent = 'Pending analysis…';
      timestampChip.textContent = '';
    }

    function showResultCard() {
      resultCard.hidden = false;
      placeholder.hidden = true;
    }

    async function startCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setStatus('Camera access is not supported in this browser.', 'error');
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' }
          }
        });
        videoEl.srcObject = stream;
        await videoEl.play();
        scanning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        setStatus('Camera live. Hold a QR code steady in view.');
        processFrame();
      } catch (error) {
        console.error('Camera error', error);
        setStatus('Unable to access camera: ' + (error?.message ?? error), 'error');
      }
    }

    function stopCamera() {
      scanning = false;
      startBtn.disabled = false;
      stopBtn.disabled = true;
      if (frameHandle) {
        cancelAnimationFrame(frameHandle);
        frameHandle = 0;
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
      videoEl.srcObject = null;
    }

    async function processFrame() {
      if (!scanning || !ctx) {
        return;
      }

      if (videoEl.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        if (canvasEl.width !== videoEl.videoWidth || canvasEl.height !== videoEl.videoHeight) {
          canvasEl.width = videoEl.videoWidth;
          canvasEl.height = videoEl.videoHeight;
        }
        ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
        const imageData = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth'
        });

        if (code?.data) {
          stopCamera();
          handleDecoded(code.data, 'camera');
          return;
        }
      }

      frameHandle = requestAnimationFrame(processFrame);
    }

    function looksLikeProbablyUrl(value) {
      const trimmed = value.trim();
      if (!trimmed) return null;
      try {
        const candidate = new URL(trimmed);
        if (candidate.protocol === 'http:' || candidate.protocol === 'https:') {
          return candidate.toString();
        }
        return null;
      } catch (err) {
        if (/^(?:https?:)?\/\//i.test(trimmed)) {
          return looksLikeProbablyUrl('https://' + trimmed.replace(/^\/+/, ''));
        }
        if (/^[\w.-]+\.[a-z]{2,}(?:\/.*)?$/i.test(trimmed)) {
          return looksLikeProbablyUrl('https://' + trimmed);
        }
        return null;
      }
    }

    async function analyzeUrl(url) {
      analysisBlock.hidden = false;
      resultLink.href = url;
      resultLink.textContent = url;
      setStatus('Running sandbox checks…');
      timestampChip.textContent = 'analysis pending…';

      try {
        const response = await fetch('/api/analyze?url=' + encodeURIComponent(url), {
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Analysis failed (' + response.status + ')');
        }

        const data = await response.json();
        const finalUrl = data.finalUrl ?? url;
        resultLink.href = finalUrl;
        resultLink.textContent = finalUrl;

        if (typeof data.analysisTimestamp === 'string') {
          timestampChip.textContent = new Date(data.analysisTimestamp).toLocaleString();
        } else {
          timestampChip.textContent = 'analysis complete';
        }

        if (typeof data.statusCode === 'number') {
          statusChip.textContent = 'HTTP ' + data.statusCode;
          statusChip.hidden = false;
        } else {
          statusChip.hidden = true;
        }

        if (data.finalUrl && data.finalUrl !== url) {
          finalChip.textContent = 'Redirected → ' + data.finalUrl;
          finalChip.hidden = false;
        } else {
          finalChip.hidden = true;
        }

        if (data.rating) {
          resultRating.dataset.level = data.rating.level ?? 'warning';
          const ratingLabel = data.rating.label ?? 'Unknown';
          const ratingScore = data.rating.score ?? 0;
          resultRating.textContent = ratingLabel + ' · Score ' + ratingScore;
        } else {
          resultRating.dataset.level = 'warning';
          resultRating.textContent = 'Rating unavailable';
        }

        if (Array.isArray(data.signals) && data.signals.length) {
          warningsContainer.hidden = false;
          data.signals.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            resultWarnings.appendChild(li);
          });
        }

        if (typeof data.title === 'string' && data.title.trim()) {
          metaContainer.hidden = false;
          titleEl.textContent = data.title.trim();
          descriptionEl.textContent = data.description?.trim() ?? '';
        }

        if (typeof data.previewText === 'string' && data.previewText.trim()) {
          previewContainer.hidden = false;
          previewEl.textContent = data.previewText.trim();
        }

        screenshotContainer.hidden = false;
        screenshotImg.src = buildScreenshotUrl(finalUrl);
        screenshotImg.alt = 'Screenshot preview of ' + finalUrl;

        setStatus('Sandbox analysis complete. Review the findings.', 'success');
      } catch (error) {
        console.error('Analysis error', error);
        setStatus('Sandbox analysis failed: ' + (error?.message ?? error), 'error');
        resultRating.dataset.level = 'danger';
        resultRating.textContent = 'Analysis failed';
      }
    }

    function buildScreenshotUrl(targetUrl) {
      const encoded = encodeURIComponent(targetUrl);
      return 'https://image.thum.io/get/width/900/crop/768/' + encoded;
    }

    function handleDecoded(payload, source) {
      showResultCard();
      resetAnalysisPanels();
      decodedTextEl.textContent = payload;

      const urlCandidate = looksLikeProbablyUrl(payload);
      if (urlCandidate) {
        nonUrlNote.hidden = true;
        analyzeUrl(urlCandidate);
      } else {
        analysisBlock.hidden = true;
        nonUrlNote.hidden = false;
        setStatus('Decoded plain text' + (source === 'file' ? ' from upload' : '') + '.', 'success');
      }
    }

    function handleFile(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      stopCamera();
      showResultCard();
      resetAnalysisPanels();
      setStatus('Processing uploaded image…');

      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        if (!ctx) {
          setStatus('Canvas context unavailable.', 'error');
          URL.revokeObjectURL(objectUrl);
          return;
        }
        canvasEl.width = img.width;
        canvasEl.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth'
        });
        if (code?.data) {
          handleDecoded(code.data, 'file');
        } else {
          setStatus('No QR code detected in the uploaded image.', 'warn');
          decodedTextEl.textContent = '';
          resultCard.hidden = true;
          placeholder.hidden = false;
        }
        URL.revokeObjectURL(objectUrl);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setStatus('Unable to read the uploaded image.', 'error');
      };
      img.src = objectUrl;
      fileInput.value = '';
    }

    initTheme();

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
      });
    }

    const themeChangeHandler = (event) => {
      if (!getStoredTheme()) {
        applyTheme(event.matches ? 'dark' : 'light');
      }
    };

    if (typeof prefersDark.addEventListener === 'function') {
      prefersDark.addEventListener('change', themeChangeHandler);
    } else if (typeof prefersDark.addListener === 'function') {
      prefersDark.addListener(themeChangeHandler);
    }

    startBtn.addEventListener('click', startCamera);
    stopBtn.addEventListener('click', stopCamera);
    fileInput.addEventListener('change', handleFile);

    sidebarTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        if (tab.disabled) return;
        const targetId = tab.dataset.target;
        if (targetId) {
          activateToolSection(targetId);
        }
      });
    });

    if (sidebarTabs.length && toolSections.length) {
      const initialTarget =
        sidebarTabs.find((tab) => tab.classList.contains('active') && !tab.disabled)?.dataset.target ??
        toolSections[0].dataset.toolSection;
      if (initialTarget) {
        activateToolSection(initialTarget);
      }
    }

    window.addEventListener('beforeunload', () => {
      stopCamera();
    });
  </script>
</body>
</html>`;

interface RatingResult {
  score: number;
  label: string;
  level: 'good' | 'warning' | 'danger';
}

interface AnalysisPayload {
  inputUrl: string;
  normalizedUrl: string;
  finalUrl?: string;
  statusCode?: number;
  title?: string;
  description?: string;
  previewText?: string;
  rating: RatingResult;
  signals: string[];
  analysisTimestamp: string;
  notes?: string;
}

const suspiciousTlds = new Set([
  'click',
  'country',
  'download',
  'gq',
  'ml',
  'tk',
  'cf',
  'work',
  'xyz',
  'top',
  'zip',
  'ru',
  'cn',
  'lol'
]);

const highTrustTlds = new Set(['gov', 'edu']);

const phishingKeywords = ['login', 'verify', 'secure', 'account', 'wallet', 'unlock', 'confirm', 'update'];

function scoreUrl(url: URL): { rating: RatingResult; signals: string[] } {
  let score = 0;
  const signals: string[] = [];

  if (url.protocol === 'https:') {
    score += 2;
    signals.push('✓ Uses HTTPS transport');
  } else if (url.protocol === 'http:') {
    score -= 3;
    signals.push('⚠ Non-HTTPS destination');
  }

  const hostname = url.hostname;

  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    score -= 4;
    signals.push('⚠ Raw IP address instead of hostname');
  }

  if (hostname.length > 35) {
    score -= 1;
    signals.push('⚠ Very long hostname');
  }

  const hyphenCount = (hostname.match(/-/g) ?? []).length;
  if (hyphenCount >= 2) {
    score -= 1;
    signals.push('⚠ Multiple hyphens in hostname');
  }

  const digitCount = (hostname.match(/\d/g) ?? []).length;
  if (digitCount >= 4) {
    score -= 1;
    signals.push('⚠ Numeral-heavy hostname');
  }

  const tld = hostname.split('.').pop()?.toLowerCase();
  if (tld) {
    if (suspiciousTlds.has(tld)) {
      score -= 2;
      signals.push(`⚠ Higher-risk top-level domain (.${tld})`);
    }
    if (highTrustTlds.has(tld)) {
      score += 2;
      signals.push(`✓ High-trust top-level domain (.${tld})`);
    }
  }

  const lowerFullUrl = url.toString().toLowerCase();
  if (phishingKeywords.some((word) => lowerFullUrl.includes(word))) {
    score -= 2;
    signals.push('⚠ Possible phishing keyword detected');
  }

  if (url.username || url.password) {
    score -= 4;
    signals.push('⚠ URL embeds credentials');
  }

  if (url.pathname.includes('@') || url.hostname.includes('@')) {
    score -= 3;
    signals.push('⚠ Suspicious @ symbol in URL path/host');
  }

  if (url.searchParams.size > 8) {
    score -= 1;
    signals.push('⚠ Large query string');
  }

  if (url.hash && url.hash.length > 40) {
    score -= 1;
    signals.push('⚠ Long fragment identifier');
  }

  let level: RatingResult['level'];
  let label: string;

  if (score >= 4) {
    level = 'good';
    label = 'Likely Safe';
  } else if (score >= 1) {
    level = 'warning';
    label = 'Review Recommended';
  } else {
    level = 'danger';
    label = 'Potentially Unsafe';
  }

  return {
    rating: { score, label, level },
    signals
  };
}

function extractMeta(html: string): { title?: string; description?: string; previewText?: string } {
  const limited = html.slice(0, 20000);

  const titleMatch = limited.match(/<title>([^<]*)<\/title>/i);
  let title = titleMatch?.[1]?.trim();

  const descMatch = limited.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
    limited.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["'][^>]*>/i);
  let description = descMatch?.[1]?.trim();

  const stripped = limited
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();

  const previewText = stripped.slice(0, 600);

  return { title, description, previewText };
}

async function handleAnalyze(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const targetRaw = url.searchParams.get('url');

  if (!targetRaw) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }

  let target: URL;
  try {
    target = new URL(targetRaw);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }

  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return new Response(JSON.stringify({ error: 'Unsupported protocol. Only HTTP/HTTPS are allowed.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }

  const { rating, signals } = scoreUrl(target);

  const analysis: AnalysisPayload = {
    inputUrl: targetRaw,
    normalizedUrl: target.toString(),
    rating,
    signals,
    analysisTimestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(target.toString(), {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; QR-Sandbox/1.0; +https://cf-workers)'
      },
      cf: {
        cacheEverything: true,
        cacheTtl: 900
      }
    });

    analysis.statusCode = response.status;
    const finalUrl = response.url || target.toString();
    analysis.finalUrl = finalUrl;

    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('text/html')) {
      const text = await response.text();
      const meta = extractMeta(text);
      analysis.title = meta.title;
      analysis.description = meta.description;
      analysis.previewText = meta.previewText;
    }
  } catch (error) {
    signals.push('⚠ Worker fetch failed: unable to reach remote host');
    analysis.notes = 'Fetch failed: ' + (error instanceof Error ? error.message : String(error));
    analysis.rating = {
      score: Math.min(-3, analysis.rating.score - 2),
      label: 'Analysis Incomplete',
      level: 'warning'
    };
  }

  return new Response(JSON.stringify(analysis, null, 2), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store'
    }
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/') {
      return new Response(landingPage, {
        headers: {
          'content-type': 'text/html; charset=UTF-8',
          'cache-control': 'no-store'
        }
      });
    }

    if (url.pathname === '/api/analyze') {
      if (request.method !== 'GET') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'content-type': 'application/json' }
        });
      }
      return handleAnalyze(request);
    }

    return new Response('Not found', { status: 404 });
  }
};
