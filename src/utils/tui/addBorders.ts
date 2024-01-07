import { BorderStyleDefinitions } from '~/data/fzfBorders';
import type { ThemeOptions } from '~/data/themeStore';
import { Line } from '~/utils/tui/Line';
import { token, fillSpace } from '~/utils/tui/Token';

export const addBorders = (lines: Line[], theme: ThemeOptions) => {
  const borderDefinition = BorderStyleDefinitions[theme.borderStyle || 'none'];

  if (!theme.borderStyle || theme.borderStyle === 'none') {
    return lines;
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
      line.options.content.unshift(token(borderDefinition.left, 'border'));
      line.options.content.push(token(borderDefinition.right, 'border'));

      return line;
    }),
    new Line({
      content: [
        token(borderDefinition.bottomLeft, 'border'),
        fillSpace(borderDefinition.bottom, 'border'),
        token(borderDefinition.bottomRight, 'border'),
      ],
    }),
  ];

  return linesWithBorder;
};
