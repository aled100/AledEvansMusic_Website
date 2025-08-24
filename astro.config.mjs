import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://aledevansmusic.com', // ✅ your live Netlify URL
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap()
  ],
});
