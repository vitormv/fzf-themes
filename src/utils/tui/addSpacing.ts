import type { BoxCoordinates } from '~/data/themeStore';
import { Line } from '~/utils/tui/Line';
import { token, fillSpace } from '~/utils/tui/Token';

const emptySpaceLine = new Line({ tokens: [fillSpace(' ')] });

const getVerticalSpace = (count: number) => {
  if (count < 1) return [];

  return Array(count)
    .fill('')
    .map(() => emptySpaceLine.clone());
};

export const addSpacing = (lines: Line[], space: BoxCoordinates) => {
  const linesWithSpacing = [
    ...getVerticalSpace(space.top),
    ...lines.map((line) => {
      if (space.left > 0) {
        line.tokens.unshift(token(' '.repeat(space.left)));
      }

      if (space.right > 0) {
        line.tokens.push(token(' '.repeat(space.right)));
      }

      return line;
    }),
    ...getVerticalSpace(space.bottom),
  ];

  return linesWithSpacing;
};
