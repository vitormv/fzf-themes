import { createSampleLines } from '~/data/createSampleLines';
import type { ThemeOptions } from '~/data/themeStore';
import { addBorders } from '~/utils/tui/addBorders';
import { addSpacing } from '~/utils/tui/addSpacing';

export const renderLines = (maxCols: number, theme: ThemeOptions) => {
  let lines = createSampleLines(theme);

  lines = addSpacing(lines, theme.padding);
  lines = addBorders(lines, theme);
  lines = addSpacing(lines, theme.margin);

  return lines.map((line) => line.render(maxCols));
};
