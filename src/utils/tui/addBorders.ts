import { BorderStyleDefinitions, type BorderStyle } from '~/data/fzfBorders';
import { Line } from '~/utils/tui/Line';
import { token, fillSpace, Token, FillSpace } from '~/utils/tui/Token';

type BorderOptions = {
  className?: string;
  style: BorderStyle;
  label: string;
  position: number;
};

export const addBorders = (lines: Line[], border: BorderOptions) => {
  const borderDefinition = BorderStyleDefinitions[border.style || 'none'];

  const className = border.className || 'border';

  if (!border.style || border.style === 'none') {
    return lines;
  }

  const isTop = true;

  let borderLabel: Array<Token | FillSpace> = [
    fillSpace(borderDefinition[isTop ? 'top' : 'bottom'], className),
  ];

  if (border.label) {
    const borderChar = borderDefinition[isTop ? 'top' : 'bottom'];

    // text-center
    if (border.position === 0) {
      borderLabel = [
        fillSpace(borderChar, className),
        token(border.label, 'label'),
        fillSpace(borderChar, className),
      ];
    } else if (border.position > 0) {
      const pos = border.position - 1;

      borderLabel = [
        token(borderChar.repeat(pos), className),
        token(border.label, 'label'),
        fillSpace(borderChar, className),
      ];
    } else if (border.position < 0) {
      const pos = Math.abs(border.position) - 1;

      borderLabel = [
        fillSpace(borderChar, className),
        token(border.label, 'label'),
        token(borderChar.repeat(pos), className),
      ];
    }
  }

  const linesWithBorder = [
    new Line({
      className,
      tokens: [
        token(borderDefinition.topLeft, className),
        ...(isTop ? borderLabel : [fillSpace(borderDefinition.top, className)]),
        token(borderDefinition.topRight, className),
      ],
    }),
    ...lines.map((line) => {
      line.tokens.unshift(token(borderDefinition.left, className));

      if (!line.fillSpaceCount()) {
        line.tokens.push(fillSpace(' '));
      }

      line.tokens.push(token(borderDefinition.right, className));

      return line;
    }),
    new Line({
      className,
      tokens: [
        token(borderDefinition.bottomLeft, className),
        fillSpace(borderDefinition.bottom, className),
        token(borderDefinition.bottomRight, className),
      ],
    }),
  ];

  return linesWithBorder;
};
