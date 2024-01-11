import { createPreviewLines } from '~/data/createPreviewLines';
import { createSampleLines } from '~/data/createSampleLines';
import type { ThemeOptions } from '~/data/themeStore';
import { addBorders } from '~/utils/tui/addBorders';
import { addSpacing } from '~/utils/tui/addSpacing';
import { mergeRenderedLines } from '~/utils/tui/mergeLines';

const countNeededHorizontalSpace = (theme: ThemeOptions) => {
  const borderCount = theme.borderStyle === 'none' ? 0 : 2;
  const margin = theme.margin.left + theme.margin.right;
  const padding = theme.padding.left + theme.padding.right;

  return borderCount + margin + padding;
};

export const renderLines = (maxScreenCols: number, theme: ThemeOptions) => {
  let fileResultsLines = createSampleLines(theme);
  let previewLines = createPreviewLines(theme);

  const fixedTextCols = 40;
  const variableUiCols = countNeededHorizontalSpace(theme);

  const colsToRender =
    maxScreenCols >= fixedTextCols + variableUiCols
      ? maxScreenCols
      : fixedTextCols + variableUiCols;

  console.log({ maxScreenCols, colsToRender });

  const leftSideCols = Math.floor(colsToRender / 2) + (colsToRender % 2);
  const rightSideCols = Math.floor(colsToRender / 2);

  fileResultsLines.forEach((line) => {
    line.computeFillSpace(leftSideCols);
  });

  previewLines.forEach((line) => {
    line.computeFillSpace(rightSideCols);
  });

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
