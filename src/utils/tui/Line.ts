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
    this.tokens = options.tokens.map((token) => {
      if (token instanceof Token) {
        token.addClass(options.className);
      }

      return token;
    });

    this.className = options.className;
  }

  public clone(withClass = true) {
    return new Line({
      className: withClass ? this.className : undefined,
      tokens: [...this.tokens],
    });
  }

  public fillSpaceCount(): number {
    return this.tokens.filter((item) => item instanceof FillSpace).length;
  }

  private ensureContainsFillSpace() {
    if (!this.fillSpaceCount()) {
      this.tokens = [...this.tokens, new FillSpace(' ', this.className)];
    }
  }

  public staticContentLength(): number {
    return this.tokens.reduce((length, item) => {
      if (typeof item === 'string') {
        return length + item.length;
      } else if (item instanceof Token) {
        return length + item.text.length;
      }

      return length;
    }, 0);
  }

  /**
   * This removes turns any FillSpace and replace them with static string tokens
   * that fills N columns
   */
  computeFillSpace(cols: number) {
    this.ensureContainsFillSpace();
    const fillSpaceCount = this.fillSpaceCount();
    const initialFillSpaceChars = cols - this.staticContentLength();

    let baseFillSpaceLength = Math.floor(initialFillSpaceChars / fillSpaceCount);
    let fillSpaceRemainder = initialFillSpaceChars % fillSpaceCount;

    const finalTokens: LineToken[] = this.tokens.map((item) => {
      if (item instanceof FillSpace && baseFillSpaceLength > 0) {
        let currentFillSpaceLength = baseFillSpaceLength;

        if (fillSpaceRemainder > 0) {
          currentFillSpaceLength++;
          fillSpaceRemainder--;
        }

        const fillString = item.fillChar.repeat(currentFillSpaceLength);

        return token(fillString.substring(0, currentFillSpaceLength), item.classNames).addClass(
          this.className,
        );
      }

      // non FillSpace tokens are copied verbatim
      return item;
    });

    this.tokens = finalTokens;
  }

  render() {
    const lineElement = document.createElement('div');

    if (this.className) {
      lineElement.className = this.className;
    }

    this.tokens.forEach((item) => {
      if (!item) return;

      if (typeof item === 'string') {
        lineElement.appendChild(document.createTextNode(item));
      } else if (item instanceof Token) {
        lineElement.appendChild(item.render(this.className));
      }
    });

    return lineElement;
  }
}
