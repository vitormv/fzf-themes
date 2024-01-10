import type { BoxCoordinates } from '~/data/themeStore';
import { Line } from '~/utils/tui/Line';
import { token, fillSpace } from '~/utils/tui/Token';

const getVerticalSpace = (count: number, className: string) => {
  if (count < 1) return [];

  const emptySpaceLine = new Line({ tokens: [fillSpace(' ', className)] });

  return Array(count)
    .fill('')
    .map(() => emptySpaceLine.clone());
};

export const addSpacing = (lines: Line[], space: BoxCoordinates, className = '') => {
  const linesWithSpacing = [
    ...getVerticalSpace(space.top, className),
    ...lines.map((line) => {
      if (space.left > 0) {
        line.tokens.unshift(token(' '.repeat(space.left), className));
      }

      if (space.right > 0) {
        line.tokens.push(token(' '.repeat(space.right), className));
      }

      return line;
    }),
    ...getVerticalSpace(space.bottom, className),
  ];

  return linesWithSpacing;
};
