import type { Line } from '~/utils/tui/Line';

export const mergeRenderedLines = (leftRenderedLines: Line[], rightRenderedLines: Line[]) => {
  const mergedLines: Line[] = [];

  // Find the number of lines to merge based on the longer array
  const numberOfLines = Math.max(leftRenderedLines.length, rightRenderedLines.length);

  for (let i = 0; i < numberOfLines; i++) {
    const mergedLine = leftRenderedLines[i].clone();
    mergedLine.tokens.push(...rightRenderedLines[i].tokens);

    mergedLines.push(mergedLine);
  }

  return mergedLines;
};
