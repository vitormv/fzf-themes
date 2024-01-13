import type { ThemeOptions } from '~/data/themeStore';
import { Line } from '~/utils/tui/Line';
import { token, fillSpace } from '~/utils/tui/Token';
import { addBorders } from '~/utils/tui/addBorders';
import { addSpacing } from '~/utils/tui/addSpacing';

export const createPreviewLines = (themeOptions: ThemeOptions) => {
  let previewLines = [
    new Line({
      className: 'preview-bg',
      tokens: [
        token('package fzf', 'preview-bg preview-fg'),
        fillSpace(' '),
        token(themeOptions.scrollbar, 'preview-bg preview-scrollbar'),
      ],
    }),
    new Line({
      className: 'preview-bg',
      tokens: [fillSpace(' '), token(themeOptions.scrollbar, 'preview-bg preview-scrollbar')],
    }),
    new Line({ className: 'preview-bg', tokens: [token('import (', 'preview-bg preview-fg')] }),
    new Line({ className: 'preview-bg', tokens: [token('  "errors"', 'preview-bg preview-fg')] }),
    new Line({ className: 'preview-bg', tokens: [token('  "os"', 'preview-bg preview-fg')] }),
    new Line({ className: 'preview-bg', tokens: [token('  "strings"', 'preview-bg preview-fg')] }),
    new Line({ className: 'preview-bg', tokens: [token(')', 'preview-bg preview-fg')] }),
    new Line({
      className: 'preview-bg',
      tokens: [token('// History struct ', 'preview-bg preview-fg')],
    }),
  ];

  if (themeOptions.previewBorderStyle === 'none') {
    previewLines.push(new Line({ className: 'preview-bg', tokens: [fillSpace(' ')] }));
    previewLines.push(new Line({ className: 'preview-bg', tokens: [fillSpace(' ')] }));
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
