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

export const renderLines = (maxCols: number, theme: ThemeOptions) => {
  let fileResultsLines = createSampleLines(theme);
  let previewLines = createPreviewLines(theme);

  const contentChars = maxCols - countNeededHorizontalSpace(theme);

  const leftSideCols = Math.floor(contentChars / 2) + (contentChars % 2);
  const rightSideCols = Math.floor(contentChars / 2);

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
    line.computeFillSpace(maxCols);
    return line.render();
  });
};
