import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const root = path.dirname(fileURLToPath(import.meta.url));
const shared = (file) => path.join(root, 'previews/_shared', file);

/**
 * Every folder in previews/ with a preview.json is an isolated homepage build,
 * served at /previews/<slug>/ and embedded by the portfolio in an iframe.
 * preview.json maps the export's `@/…` imports onto its own files (or onto the
 * preview's fixtures), so the original source is compiled untouched.
 */
const previews = fs
  .readdirSync(path.join(root, 'previews'))
  .filter((slug) => fs.existsSync(path.join(root, 'previews', slug, 'preview.json')))
  .map((slug) => {
    const dir = path.join(root, 'previews', slug);
    const config = JSON.parse(fs.readFileSync(path.join(dir, 'preview.json'), 'utf8'));
    const source = path.resolve(dir, config.source);
    const alias = Object.entries(config.alias)
      .sort(([a], [b]) => b.length - a.length)
      .map(([from, to]) => [
        from,
        normalizePath(to.startsWith('@preview/') ? path.join(dir, to.slice(9)) : path.join(source, to)),
      ]);
    return { slug, dirs: [normalizePath(dir) + '/', normalizePath(source) + '/'], alias };
  });

function previewAliases() {
  return {
    name: 'preview-aliases',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!importer || !id.startsWith('@/')) return null;
      const from = normalizePath(importer);
      const preview = previews.find((p) => p.dirs.some((d) => from.startsWith(d)));
      if (!preview) return null;
      for (const [prefix, target] of preview.alias) {
        if (id === prefix) return this.resolve(target, importer, { skipSelf: true });
        if (prefix.endsWith('/') && id.startsWith(prefix)) {
          return this.resolve(target + id.slice(prefix.length), importer, { skipSelf: true });
        }
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [previewAliases(), react(), tailwindcss()],
  resolve: {
    alias: {
      'next/link': shared('next-link.tsx'),
      'next/image': shared('next-image.tsx'),
      'next/navigation': shared('next-navigation.ts'),
      'next/font/google': shared('next-font.ts'),
    },
  },
  // the exports read optional env vars for API URLs; previews never call an API
  define: { 'process.env': '{}' },
  build: {
    rollupOptions: {
      input: {
        main: path.join(root, 'index.html'),
        ...Object.fromEntries(previews.map((p) => [`preview-${p.slug}`, path.join(root, 'previews', p.slug, 'index.html')])),
      },
    },
  },
});
