// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arpagon.co',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es', pt: 'pt-BR' } },
      // Access form and private library are utility pages (noindex).
      filter: (page) => !/\/demos\/(acceso|privado)\/$/.test(page),
    }),
  ],
});
