// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deployed to GitHub Pages (Radixtrator/radixtrator.github.io) under the
// custom domain below. `site` drives canonical URLs and the sitemap.
export default defineConfig({
  site: 'https://lucasplabst.com',
  output: 'static',
  // Old URLs still indexed by search engines from the previous site.
  redirects: {
    '/info': '/',
  },
  trailingSlash: 'ignore',
  build: {
    // Emit /about/index.html style URLs — friendlier on GitHub Pages.
    format: 'directory',
  },
  integrations: [sitemap()],
});
