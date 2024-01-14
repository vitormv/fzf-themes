import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'fzf-theme-playground',
  plugins: [svelte()],
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
});
