// This file is intentionally minimal.
// It exists only as a webpack entry point so that electron-forge's WebpackPlugin
// creates the .webpack/renderer/main_window/ output directory, which is where
// the compiled preload.js is placed.
//
// The actual UI is served by the Angular app — either via ng serve (dev)
// or the static build output copied to src/renderer/ (production).

console.log('Structogen renderer loaded.');