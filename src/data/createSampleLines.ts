import type { ThemeOptions } from '~/data/themeStore';
import { Line } from '~/utils/tui/Line';
import { token, fillSpace } from '~/utils/tui/Token';

export const createSampleLines = (themeOptions: ThemeOptions) => {
  const fileResultLines = [
    new Line({
      content: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(themeOptions.marker, 'gutter marker'),
        token('src/fzf/tui/layout/borders', 'fg'),
        token('.go', 'hl'),
        fillSpace(' '),
        token(themeOptions.scrollbar, 'scrollbar'),
      ],
    }),
    new Line({
      content: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(' '.repeat(themeOptions.marker.length)),
        token('src/fzf/tui/main', 'fg'),
        token('.go', 'hl'),
        fillSpace(' '),
        token(themeOptions.scrollbar, 'scrollbar'),
      ],
    }),
    new Line({
      content: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(themeOptions.marker, 'gutter marker'),
        token('src/options', 'fg'),
        token('.go', 'hl'),
        fillSpace(' '),
        token(themeOptions.scrollbar, 'scrollbar'),
      ],
    }),
    new Line({
      content: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(' '.repeat(themeOptions.marker.length)),
        token('src/matcher', 'fg'),
        token('.go', 'hl'),
      ],
    }),
    new Line({
      className: '',
      content: [
        token(themeOptions.pointer, 'pointer gutter bg-plus'),
        token(' '.repeat(themeOptions.marker.length)),
        token('src/history', 'fg-plus bg-plus'),
        token('.go', 'hl-plus bg-plus'),
      ],
    }),
    new Line({
      content: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(' '.repeat(themeOptions.marker.length)),
        token('src/reader', 'fg'),
        token('.go', 'hl'),
      ],
    }),
    new Line({
      content: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(' '.repeat(themeOptions.marker.length)),
        token('src/merger', 'fg'),
        token('.go', 'hl'),
      ],
    }),
  ];

  if (themeOptions.layout === 'reverse-list') {
    fileResultLines.reverse();
  }

  // @todo: fix scrollbars when changing layout

  const allLines = [
    ...fileResultLines,
    new Line({ content: [token('  '), token('This is Header', 'header')] }),
    new Line({
      content: [
        token(' ', 'spinner'),
        token(' '),
        token('35/63 (3) ', 'info'),
        fillSpace(themeOptions.separator, 'separator'),
        token(' '),
      ],
    }),
    new Line({
      content: [token(themeOptions.prompt, 'prompt'), token('.go$', 'query')],
    }),
  ];

  if (themeOptions.layout === 'reverse') {
    allLines.reverse();
  }

  return allLines;
};
