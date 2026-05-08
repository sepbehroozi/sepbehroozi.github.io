// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sepbehroozi.github.io',
  build: {
    // Emit sibling .html files (e.g. /sepool/terms_of_service.html) instead of
    // directory-index pages, so existing /sepool/terms_of_service URLs keep working.
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
