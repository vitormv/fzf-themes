import type { ThemeOptions } from '~/data/theme.store';
import { Line } from '~/utils/tui/Line';
import { token, fillSpace } from '~/utils/tui/Token';
import { addBorders } from '~/utils/tui/addBorders';
import { addSpacing } from '~/utils/tui/addSpacing';

export const createPreviewLines = (themeOptions: ThemeOptions) => {
  let previewLines = [
    new Line({
      className: 'preview-bg',
      tokens: [
        token('package fzf', 'preview-fg'),
        fillSpace(' ', 'preview-bg'),
        token(themeOptions.scrollbar, 'preview-scrollbar'),
      ],
    }),
    new Line({
      className: 'preview-bg',
      tokens: [fillSpace(' ', 'preview-bg'), token(themeOptions.scrollbar, 'preview-scrollbar')],
    }),
    new Line({ className: 'preview-bg', tokens: [token('import (', 'preview-fg')] }),
    new Line({ className: 'preview-bg', tokens: [token('  "errors"', 'preview-fg')] }),
    new Line({ className: 'preview-bg', tokens: [token('  "os"', 'preview-fg')] }),
    new Line({ className: 'preview-bg', tokens: [token('  "strings"', 'preview-fg')] }),
    new Line({ className: 'preview-bg', tokens: [token(')', 'preview-fg')] }),
    new Line({
      className: 'preview-bg',
      tokens: [token('// History struct ', 'preview-fg')],
    }),
  ];

  for (const line of previewLines) {
    line.ensureContainsFillSpace();
  }

  previewLines = addSpacing(previewLines, { top: 0, bottom: 0, left: 1, right: 0 }, 'preview-bg');
  previewLines = addBorders(previewLines, {
    style: themeOptions.previewBorderStyle,
    label: '',
    position: 0,
    className: 'preview-bg preview-border',
  });

  return previewLines;
};
