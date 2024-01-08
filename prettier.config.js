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
  ],
};

export default config;
