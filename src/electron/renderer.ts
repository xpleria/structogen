// ---------------------------------------------------------------------------
// renderer.ts
//
// This file is the entry point for the Electron renderer process.
//
// Current state: placeholder — Angular is not yet set up.
//
// Once Angular is configured, this file is NOT used directly. Instead:
//   1. Angular compiles to dist/angular/ (or similar output path).
//   2. main.ts loads Angular's compiled index.html into the BrowserWindow.
//   3. Angular's own main.ts bootstraps AppModule / bootstrapApplication.
//
// If you ever need renderer-process logic that lives outside Angular
// (e.g. a plain JS debug page, a splash screen, or a standalone tool window),
// add it here and load this compiled file via a <script> tag in that window's
// HTML. For the main Angular window, leave this file as-is.
// ---------------------------------------------------------------------------

// Sanity-check that the contextBridge API is available.
// Remove this block once Angular is set up — it's just a dev convenience.
window.addEventListener('DOMContentLoaded', () => {
  const api = (window as Window & { structogen?: object }).structogen;

  if (api) {
    console.log('[renderer] contextBridge API loaded:', Object.keys(api));
  } else {
    console.error(
      '[renderer] window.structogen is undefined. ' +
      'Check that preload.ts is compiled and the path in main.ts is correct.'
    );
  }
});