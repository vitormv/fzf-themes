import type { ThemeOptions } from '~/data/themeStore';
import { stringToBoxCoordinates } from '~/utils/boxCoordinates';
import type { Line } from '~/utils/tui/Line';
import { addBorders } from '~/utils/tui/addBorders';
import { addSpacing } from '~/utils/tui/addSpacing';
import { createFileResultsLines } from '~/utils/tui/createFileResultsLines';
import { createPreviewLines } from '~/utils/tui/createPreviewLines';
import { mergeRenderedLines } from '~/utils/tui/mergeLines';

const countNeededHorizontalSpace = (theme: ThemeOptions) => {
  const marginCoords = stringToBoxCoordinates(theme.margin);
  const paddingCoords = stringToBoxCoordinates(theme.padding);

  const borderCount = theme.borderStyle === 'none' ? 0 : 2;
  const margin = marginCoords.left + marginCoords.right;
  const padding = paddingCoords.left + paddingCoords.right;

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

  const margin = stringToBoxCoordinates(theme.margin);
  const padding = stringToBoxCoordinates(theme.padding);

  mergedLines = addSpacing(mergedLines, padding);
  mergedLines = addBorders(mergedLines, {
    style: theme.borderStyle,
    label: theme.borderLabel,
    position: theme.borderLabelPosition,
  });
  mergedLines = addSpacing(mergedLines, margin);

  return mergedLines.map((line) => {
    line.computeFillSpace(colsToRender);
    return line.render();
  });
};
