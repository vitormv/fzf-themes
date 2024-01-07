import { lines } from '~/data/terminalLines';
import type { ThemeOptions } from '~/data/themeStore';
import { addBorders } from '~/utils/tui/addBorders';
import { addSpacing } from '~/utils/tui/addSpacing';

export const renderLines = (maxCols: number, theme: ThemeOptions) => {
  // clone to avoid mutating original objects
  let parsedLines = [...lines.map((line) => line.clone())];

  parsedLines = addSpacing(parsedLines, theme.padding);
  parsedLines = addBorders(parsedLines, theme);
  parsedLines = addSpacing(parsedLines, theme.margin);

  return parsedLines.map((line) => line.render(maxCols));
};
