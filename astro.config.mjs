// @ts-check
import { defineConfig } from 'astro/config';

// ─────────────────────────────────────────────────────────────
//  DEPLOYMENT
//
//  User site  — repo named "<username>.github.io":
//      site: 'https://<username>.github.io'
//      base: undefined            (leave the `base` line commented out)
//
//  Project site — repo named anything else, e.g. "portfolio":
//      site: 'https://<username>.github.io'
//      base: '/portfolio'
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://yourusername.github.io',
  // base: '/portfolio',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // Emit /about/index.html style URLs — friendlier on GitHub Pages.
    format: 'directory',
  },
});
