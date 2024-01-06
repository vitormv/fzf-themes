/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'always',
  printWidth: 100,
  useTabs: false,
  quoteProps: 'consistent',
  bracketSameLine: false,
  // htmlWhitespaceSensitivity: 'ignore',
  allowShorthand: false, // explicit definitions are easier for Svelte beginners
  plugins: ['prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.svelte',
      options: { parser: 'svelte' },
    },
    {
      files: '**/tui/**/*.svelte',
      options: {
        htmlWhitespaceSensitivity: 'css', // @todo: remove this once TUI window is done via JS
      },
    },
  ],
};

export default config;
