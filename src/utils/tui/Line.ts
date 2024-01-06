import { Token, FillSpace, token } from '~/utils/tui/Token';

// https://svelte.dev/repl/c5c99203078e4b1587d97b6947e2d2f2?version=4.2.8

export type LineOptions = {
  className?: string;
  content: Array<undefined | string | Token | FillSpace>;
};

export class Line {
  private options: LineOptions;

  constructor(options: LineOptions) {
    this.options = options;
  }

  private hasFillSpace() {
    return this.options.content.some((item) => item instanceof FillSpace);
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

    const hasFillSpace = this.hasFillSpace();
    const fillSpaceLength = cols - this.staticContentLength();

    const items = [...this.options.content];

    if (!hasFillSpace) {
      items.push(new FillSpace(' '));
    }

    items.forEach((item) => {
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
