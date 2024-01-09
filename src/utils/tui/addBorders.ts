import { BorderStyleDefinitions } from '~/data/fzfBorders';
import type { ThemeOptions } from '~/data/themeStore';
import { Line } from '~/utils/tui/Line';
import { token, fillSpace, Token, FillSpace } from '~/utils/tui/Token';

export const addBorders = (lines: Line[], theme: ThemeOptions) => {
  const borderDefinition = BorderStyleDefinitions[theme.borderStyle || 'none'];

  if (!theme.borderStyle || theme.borderStyle === 'none') {
    return lines;
  }

  const isTop = true;

  let borderLabel: Array<Token | FillSpace> = [
    fillSpace(borderDefinition[isTop ? 'top' : 'bottom'], 'border'),
  ];

  if (theme.borderLabel) {
    const borderChar = borderDefinition[isTop ? 'top' : 'bottom'];

    // text-center
    if (theme.borderLabelPosition === 0) {
      borderLabel = [
        fillSpace(borderChar, 'border'),
        token(theme.borderLabel, 'label'),
        fillSpace(borderChar, 'border'),
      ];
    } else if (theme.borderLabelPosition > 0) {
      const pos = theme.borderLabelPosition - 1;

      borderLabel = [
        token(borderChar.repeat(pos), 'border'),
        token(theme.borderLabel, 'label'),
        fillSpace(borderChar, 'border'),
      ];
    } else if (theme.borderLabelPosition < 0) {
      const pos = Math.abs(theme.borderLabelPosition) - 1;

      borderLabel = [
        fillSpace(borderChar, 'border'),
        token(theme.borderLabel, 'label'),
        token(borderChar.repeat(pos), 'border'),
      ];
    }
  }

  const linesWithBorder = [
    new Line({
      tokens: [
        token(borderDefinition.topLeft, 'border'),
        ...(isTop ? borderLabel : [fillSpace(borderDefinition.top, 'border')]),
        token(borderDefinition.topRight, 'border'),
      ],
    }),
    ...lines.map((line) => {
      line.tokens.unshift(token(borderDefinition.left, 'border'));

      if (!line.hasFillSpace()) {
        line.tokens.push(fillSpace(' '));
      }

      line.tokens.push(token(borderDefinition.right, 'border'));

      return line;
    }),
    new Line({
      tokens: [
        token(borderDefinition.bottomLeft, 'border'),
        fillSpace(borderDefinition.bottom, 'border'),
        token(borderDefinition.bottomRight, 'border'),
      ],
    }),
  ];

  return linesWithBorder;
};
