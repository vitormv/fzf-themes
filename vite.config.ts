import { defineConfig } from 'vitest/config';
import mdPlugin, { Mode } from 'vite-plugin-markdown';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fzf-themes',
  plugins: [svelte(), mdPlugin.plugin({ mode: [Mode.HTML] })],
  resolve: {
    alias: {
      '~': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // make SASS variables global by auto-importing them on top of each file
        additionalData: `@import "src/styles/global-variables.scss";`,
      },
    },
  },
  test: {
    globals: true,
    setupFiles: ['src/setup.tests.ts'],
  },
});
