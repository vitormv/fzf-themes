import { Line } from '~/utils/tui/Line';
import { token, fillSpace } from '~/utils/tui/Token';

const lines = [
  new Line({
    content: [
      token(' >', 'gutter marker'),
      token('src/fzf/main', 'fg'),
      token('.go', 'hl'),
      fillSpace(' '),
      token('│', 'scrollbar'),
    ],
  }),
  new Line({
    content: [
      token(' ', 'gutter'),
      token(' '),
      token('src/pattern', 'fg'),
      token('.go', 'hl'),
      fillSpace(' '),
      token('│', 'scrollbar'),
    ],
  }),
  new Line({
    content: [
      token(' >', 'gutter marker'),
      token('src/options', 'fg'),
      token('.go', 'hl'),
      fillSpace(' '),
      token('│', 'scrollbar'),
    ],
  }),
  new Line({
    content: [token(' ', 'gutter'), token(' '), token('src/matcher', 'fg'), token('.go', 'hl')],
  }),
  new Line({
    className: 'bg-plus',
    content: [token('◆ ', 'pointer gutter'), token('src/history', 'fg-plus'), token('.go', 'hl')],
  }),
  new Line({
    content: [token(' ', 'gutter'), token(' '), token('src/reader', 'fg'), token('.go', 'hl')],
  }),
  new Line({
    content: [token(' ', 'gutter'), token(' '), token('src/merger', 'fg'), token('.go', 'hl')],
  }),
  new Line({ content: [token('  '), token('This is Header', 'header')] }),
  new Line({
    content: [
      token(' ', 'spinner'),
      token(' '),
      token('35/63 (3) ', 'info'),
      fillSpace('─', 'separator'),
      token(' '),
    ],
  }),
  new Line({
    content: [token('> ', 'prompt'), token('.go$', 'query')],
  }),
];

export { lines };
