import { BorderStyleDefinitions } from '~/data/fzfBorders';
import type { ThemeOptions } from '~/data/themeStore';
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
    className: '',
    content: [
      token('◆ ', 'pointer gutter bg-plus'),
      token('src/history', 'fg-plus bg-plus'),
      token('.go', 'hl bg-plus'),
    ],
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

export const renderLines = (maxCols: number, lines: Line[], theme: ThemeOptions) => {
  const borderDefinition = BorderStyleDefinitions[theme.borderStyle || 'none'];

  if (!theme.borderStyle || theme.borderStyle === 'none') {
    return lines.map((line) => line.render(maxCols));
  }

  const linesWithBorder = [
    new Line({
      content: [
        token(borderDefinition.topLeft, 'border'),
        fillSpace(borderDefinition.top, 'border'),
        token(borderDefinition.topRight, 'border'),
      ],
    }),
    ...lines.map((line) => {
      const lineWithBorder = line.clone();
      lineWithBorder.options.content.unshift(token(borderDefinition.left, 'border'));
      lineWithBorder.options.content.push(token(borderDefinition.right, 'border'));

      return lineWithBorder;
    }),
    new Line({
      content: [
        token(borderDefinition.bottomLeft, 'border'),
        fillSpace(borderDefinition.bottom, 'border'),
        token(borderDefinition.bottomRight, 'border'),
      ],
    }),
  ];

  return linesWithBorder.map((line) => line.render(maxCols));
};

export { lines };
