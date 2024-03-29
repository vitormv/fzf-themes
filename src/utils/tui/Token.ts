import { escapeHtml } from '~/utils/strings/htmlEscape';

export class Token {
  public readonly text: string;
  private classNames: string | undefined;

  constructor(text: string, classNames?: string) {
    this.text = text;
    this.classNames = classNames;
  }

  addClass(className: string | undefined) {
    if (className && !this.classNames?.split(' ').includes(className)) {
      this.classNames = [this.classNames, className].filter(Boolean).join(' ');
    }

    return this;
  }

  length() {
    return this.text.length;
  }

  render(extraClassName = '') {
    const el = document.createElement('span');
    el.innerHTML = escapeHtml(this.text);

    if (this.classNames) {
      el.className = [this.classNames, extraClassName].filter(Boolean).join(' ');
    }

    return el;
  }
}

/**
 * Convenience method for "new Token()"
 */
export const token = (text: string, classNames?: string) => {
  return new Token(text, classNames);
};

export class FillSpace {
  public readonly fillChar: string;
  public readonly classNames: string | undefined;

  constructor(fillChar: string, classNames?: string) {
    this.fillChar = fillChar;
    this.classNames = classNames;
  }
}

/**
 * Convenience method for "new FillSpace()"
 */
export const fillSpace = (fillChar: string, classNames?: string) => {
  return new FillSpace(fillChar, classNames);
};
