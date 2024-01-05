const defaultColors = {
  'fg': '#d0d0d0',
  'fg-plus': '#d0d0d0',
  'bg': '#121212',
  'bg-plus': '#262626',
  'hl': '#5f87af',
  'hl-plus': '#5fd7ff',
  'info': '#afaf87',
  'marker': '#87ff00',
  'prompt': '#d7005f',
  'spinner': '#af5fff',
  'pointer': '#af5fff',
  'header': '#87afaf',
  'gutter': '#262626',
  'border': '#262626',
  'separator': 'var(--fzf-border)',
}

$(document).ready(function() {
  const root = document.documentElement;
  const $terminalWindow = $('.terminal-window');
  const $colorBlocks = $('.color-blocks');

  const resetColors = () => {
    Object.entries(defaultColors).forEach(([name, color]) => {
      updateColor(name, color);
    });
  }

  const updateColor = (propName, color) => {
    root.style.setProperty(`--fzf-${propName}`, color);

    $colorBlocks.find(`color-block[name=${propName}]`).attr('color', color)
  }

  $('[data-jscolor]').on('change', function(e) {
    const propName = $(this).attr('name');
    const color = $(this).val();

    updateColor(propName, color);
  });

  $('.js-reset-all').on('click', function() {
    resetColors();
  })

  $terminalWindow.find('[class*=fzf-]').on('click', function(e) {
    const tokens = $(this).attr('class')
      .split(' ')
      .filter(item => item.includes('fzf-')) // keep only fzf-*
      .map(item => String(item).substring(4)) // remove "fzf-" prefix

    console.log(tokens)
  });

  resetColors();
});

// Create a class for the element
class ColorBlock extends HTMLElement {
  static observedAttributes = ["color"];

  constructor() {
    // Always call super first in constructor
    super();

    this.addEventListener('click', (e) => {
      this.querySelector(':scope input[data-jscolor]').jscolor.show();
    });

    this.addEventListener('click', (e) => {
      this.querySelector(':scope input[data-jscolor]').jscolor.show();
    });

    const name = this.getAttribute('name');
    const color = this.getAttribute('color');

    this.innerHTML = /*html*/`
      <label class="color-wrapper" style="background-color: ${color}; color: ${this.getLabelColor(color)}">
        <div class="name">${this.toFzfName(name)}</div>
        <div class="hex">${color}</div>
        <input data-jscolor="" class="form-control opt" value="${color}" name="${name}" />
      </div>
    `
  }

  /**
   * @param {string} name
   */
  toFzfName(name) {
    return name.replace('-plus', '+')
  }

  /**
   * @param {string} color
   */
  getColorValue(color) {
    if (color.startsWith('#')) {
      return color;
    }

    const matches = color.match(/var\(--fzf-([a-z\-]+)\)/);
    if (matches && matches[1]) {
      return `same as ${this.toFzfName(matches[1])}`
    }

    return '';
  }

  /**
   * decide whether to use black/white text depending on color
   *
   * @source https://24ways.org/2010/calculating-color-contrast
   */
  getLabelColor (hexcolor) {
    var r = parseInt(hexcolor.substring(1,3),16);
    var g = parseInt(hexcolor.substring(3,5),16);
    var b = parseInt(hexcolor.substring(5,7),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;

    return (yiq >= 128) ? 'black' : 'white';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color') {
      this.querySelector('label').style.backgroundColor = newValue;
      this.querySelector('label').style.color = newValue ? this.getLabelColor(newValue) : '';
      this.querySelector('.hex').innerHTML = this.getColorValue(newValue);
      this.querySelector('input').value = newValue;
    }
  }
}

window.customElements.define("color-block", ColorBlock);
