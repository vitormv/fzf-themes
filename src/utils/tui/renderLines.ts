import type { ThemeOptions } from '~/data/themeStore';
import type { Line } from '~/utils/tui/Line';
import { addBorders } from '~/utils/tui/addBorders';
import { addSpacing } from '~/utils/tui/addSpacing';
import { createFileResultsLines } from '~/utils/tui/createFileResultsLines';
import { createPreviewLines } from '~/utils/tui/createPreviewLines';
import { mergeRenderedLines } from '~/utils/tui/mergeLines';

const countNeededHorizontalSpace = (theme: ThemeOptions) => {
  const borderCount = theme.borderStyle === 'none' ? 0 : 2;
  const margin = theme.margin.left + theme.margin.right;
  const padding = theme.padding.left + theme.padding.right;

  return borderCount + margin + padding;
};

const minColsNeededForLines = (lines: Line[]) => {
  return lines.reduce((count, line) => Math.max(count, line.staticContentLength()), 0);
};

export const renderLines = (maxScreenCols: number, theme: ThemeOptions) => {
  let fileResultsLines = createFileResultsLines(theme);
  let previewLines = createPreviewLines(theme);

  // calculate min space needed to render: ui, left column, right column
  const colsNeededForUi = countNeededHorizontalSpace(theme);
  const minimumLinesLeft = minColsNeededForLines(fileResultsLines);
  const minimumLinesRight = minColsNeededForLines(previewLines);

  // total size we need to render all text + all ui elements configured
  const minStaticContent = minimumLinesLeft + minimumLinesRight + colsNeededForUi;

  // calculate how much "empty" space to give to each side, given the available screen size
  const totalEmptySpace =
    maxScreenCols - minStaticContent > 0 ? maxScreenCols - minStaticContent : 0;
  const emptySpaceLeft = minimumLinesLeft + Math.floor(totalEmptySpace / 2) + (totalEmptySpace % 2);
  const emptySpaceRight = minimumLinesRight + Math.floor(totalEmptySpace / 2);

  const colsToRender = Math.max(maxScreenCols, minStaticContent);

  fileResultsLines.forEach((line) => void line.computeFillSpace(emptySpaceLeft));
  previewLines.forEach((line) => void line.computeFillSpace(emptySpaceRight));

  let mergedLines = mergeRenderedLines(fileResultsLines, previewLines);

  mergedLines = addSpacing(mergedLines, theme.padding);
  mergedLines = addBorders(mergedLines, {
    style: theme.borderStyle,
    label: theme.borderLabel,
    position: theme.borderLabelPosition,
  });
  mergedLines = addSpacing(mergedLines, theme.margin);

  return mergedLines.map((line) => {
    line.computeFillSpace(colsToRender);
    return line.render();
  });
};
