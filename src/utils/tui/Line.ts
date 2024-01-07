import { Token, FillSpace, token } from '~/utils/tui/Token';

// https://svelte.dev/repl/c5c99203078e4b1587d97b6947e2d2f2?version=4.2.8

export type LineOptions = {
  className?: string;
  content: Array<undefined | string | Token | FillSpace>;
};

export class Line {
  public options: LineOptions;

  constructor(options: LineOptions) {
    this.options = { ...options, content: this.ensureContainsFillSpace(options.content) };
  }

  public clone() {
    return new Line({ ...this.options, content: [...this.options.content] });
  }

  private ensureContainsFillSpace(tokens: LineOptions['content']) {
    const hasFillSpace = tokens.some((item) => item instanceof FillSpace);

    const newTokens = [...tokens];

    if (!hasFillSpace) {
      newTokens.push(new FillSpace(' '));
    }

    return newTokens;
  }

  private staticContentLength(): number {
    return this.options.content.reduce((length, item) => {
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

    if (this.options.className) {
      lineElement.className = this.options.className;
    }

    const fillSpaceLength = cols - this.staticContentLength();

    this.options.content.forEach((item) => {
      if (!item) return;

      if (item instanceof FillSpace) {
        lineElement.appendChild(
          token(item.fillChar.repeat(fillSpaceLength), item.classNames).render(),
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
