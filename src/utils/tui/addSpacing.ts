import type { BoxCoordinates } from '~/data/themeStore';
import { Line } from '~/utils/tui/Line';
import { token, fillSpace } from '~/utils/tui/Token';

const getVerticalSpace = (count: number, className?: string) => {
  if (count < 1) return [];

  const emptySpaceLine = new Line({ tokens: [fillSpace(' ', className)] });

  return Array(count)
    .fill('')
    .map(() => emptySpaceLine.clone());
};

export const addSpacing = (lines: Line[], space: BoxCoordinates, className?: string) => {
  const linesWithSpacing = [
    ...getVerticalSpace(space.top, className),
    ...lines.map((line) => {
      const lineClone = new Line({ tokens: line.tokens });

      if (space.left > 0) {
        lineClone.tokens.unshift(token(' '.repeat(space.left), className));
      }

      if (space.right > 0) {
        lineClone.tokens.push(token(' '.repeat(space.right), className));
      }

      return lineClone;
    }),
    ...getVerticalSpace(space.bottom, className),
  ];

  return linesWithSpacing;
};
