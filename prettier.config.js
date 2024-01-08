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
  svelteAllowShorthand: false, // explicit syntax is easier for beginners
  plugins: ['prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.svelte',
      options: { parser: 'svelte' },
    },
  ],
};

export default config;
