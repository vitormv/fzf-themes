import { Token, FillSpace, token } from '~/utils/tui/Token';

type LineToken = undefined | string | Token | FillSpace;

export type LineOptions = {
  className?: string;
  tokens: LineToken[];
};

export class Line {
  public tokens: LineToken[];
  public className: string | undefined;

  constructor(options: LineOptions) {
    this.tokens = options.tokens;
    this.className = options.className;
  }

  public clone() {
    return new Line({ className: this.className, tokens: this.tokens });
  }

  public hasFillSpace() {
    return this.tokens.some((item) => item instanceof FillSpace);
  }

  private ensureContainsFillSpace(tokens: LineOptions['tokens']) {
    return this.hasFillSpace() ? tokens : [...tokens, new FillSpace(' ')];
  }

  private staticContentLength(): number {
    return this.tokens.reduce((length, item) => {
      if (typeof item === 'string') {
        return length + item.length;
      } else if (item instanceof Token) {
        return length + item.text.length;
      }

      return length;
    }, 0);
  }

  render(cols: number) {
    const lineElement = document.createElement('div');

    if (this.className) {
      lineElement.className = this.className;
    }

    const normalizedTokens = this.ensureContainsFillSpace(this.tokens);
    const fillSpaceLength = cols - this.staticContentLength();

    normalizedTokens.forEach((item) => {
      if (!item) return;

      if (item instanceof FillSpace && fillSpaceLength > 0) {
        const fillString = item.fillChar.repeat(fillSpaceLength);
        lineElement.appendChild(
          token(fillString.substring(0, fillSpaceLength), item.classNames).render(),
        );
      } else if (typeof item === 'string') {
        lineElement.appendChild(document.createTextNode(item));
      } else if (item instanceof Token) {
        lineElement.appendChild(item.render());
      }
    });

    return lineElement;
  }
}
