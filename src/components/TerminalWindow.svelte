<script lang="ts">
  import { orderedColorTokens } from '~/fzf/fzfColorDefinitions';
  import { getColorOrFallback, colorsStore, isValidColor } from '~/data/colors.store';
  import { onMount } from 'svelte';
  import { optionsStore, type ThemeOptions } from '~/data/options.store';
  import { renderLines } from '~/utils/tui/renderLines';
  import { addDelegateEventListener } from '~/utils/addDelegateEventListener';
  import { toFzfColorName } from '~/utils/colors/toFzfColorName';
  import ExportOptions from '~/components/ExportOptions.svelte';

  // take all known color tokens and set them as css variables
  $: allTokenVariables = orderedColorTokens
    .map((token) => `--fzf-${token}: ${getColorOrFallback(token, $colorsStore.colors).value}`)
    .join(';');

  let terminalWindowEl: HTMLDivElement;
  let wrapperEl: HTMLDivElement;
  let charWidthEl: HTMLSpanElement;

  let currentBg: string | undefined = 'bg';
  let currentFg: string | undefined = 'fg';

  let maxTerminalWidth = '';

  optionsStore.subscribe((themeSettings) => {
    if (!terminalWindowEl) return;
    renderTerminalWindow(themeSettings);
  });

  function renderTerminalWindow(currentTheme: ThemeOptions) {
    terminalWindowEl.innerHTML = '';

    const charWidth = charWidthEl.getBoundingClientRect().width;
    const terminalWindowWidth = wrapperEl.getBoundingClientRect().width;

    const maxCols = Math.floor(terminalWindowWidth / charWidth);

    const lineElements = renderLines(maxCols, currentTheme);

    lineElements.forEach((lineEl) => {
      terminalWindowEl.appendChild(lineEl);
    });

    maxTerminalWidth = `${terminalWindowEl.getBoundingClientRect().width}px`;

    const div = document.querySelector('.panel-terminal > .box > .content');

    if (!div) return;

    const hasHorizontalScrollbar = div.scrollWidth > div.clientWidth;
    const hasVerticalScrollbar = div.scrollHeight > div.clientHeight;

    div.classList.toggle('is-draggable', hasHorizontalScrollbar || hasVerticalScrollbar);
  }

  onMount(() => {
    const onLoadHandler = () => void renderTerminalWindow($optionsStore);
    const onResizeHandler = () => void renderTerminalWindow($optionsStore);

    // if document already finished loading, just fire the
    // event without registering listener
    if (document.readyState === 'complete') {
      renderTerminalWindow($optionsStore);
    } else {
      window.addEventListener('load', onResizeHandler);
    }

    window.addEventListener('resize', onResizeHandler);

    // show tips when hovering over tokens in the terminal
    addDelegateEventListener(
      terminalWindowEl,
      'mouseover',
      (e) => {
        const classes = Array.from((e.target as HTMLElement).classList).filter(
          (item) => item !== 'outer-spacing',
        );
        const bgClasses = classes.filter(
          (cls: string) => cls.startsWith('bg') || cls.includes('-bg') || cls === 'gutter',
        );
        const fgClasses = classes.filter((cls) => !bgClasses.includes(cls));

        currentBg = bgClasses.length ? bgClasses[0] : 'bg';
        currentFg = fgClasses.length ? fgClasses[0] : '';
      },
      "span[class]:not(span[class='']),.bg",
    );

    // when clicking a token, set is as the selected color
    addDelegateEventListener(
      terminalWindowEl,
      'click',
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentFg && isValidColor(currentFg)) {
          colorsStore.setSelected(currentFg);
        } else if (currentBg && isValidColor(currentBg)) {
          colorsStore.setSelected(currentBg);
        }
      },
      "span[class]:not(span[class='']),.bg",
    );

    terminalWindowEl.addEventListener('mouseleave', () => {
      currentBg = undefined;
      currentFg = undefined;
    });

    return () => {
      window.removeEventListener('load', onLoadHandler);
      window.removeEventListener('resize', onResizeHandler);
    };
  });
</script>

<!-- @todo: toggle show loading, header, preview -->

<ExportOptions />

<div bind:this={wrapperEl} class="wrapper" style={allTokenVariables}>
  <div class="window-title" style:max-width={maxTerminalWidth}>
    <div class="dot red"></div>
    <div class="dot amber"></div>
    <div class="dot green"></div>
  </div>

  <div bind:this={terminalWindowEl} class="terminal-window"></div>

  <div class="hint" style:max-width={maxTerminalWidth}>
    <span class="hint-label">background:</span>
    <strong>{toFzfColorName(currentBg || '').toUpperCase() || '---'}</strong>
    {#if currentFg}&nbsp;&nbsp;&nbsp;<span class="hint-label">foreground:</span><strong
        >&nbsp;{toFzfColorName(currentFg || '').toUpperCase() || '---'}</strong
      >{/if}
  </div>

  <!-- This element is used to calculate the current width of chars according
  to users browser window, resolution, zoom amount, etc. -->
  <span bind:this={charWidthEl} class="sample-char-width">▀</span>
</div>

<style lang="scss">
  :root {
    --terminal-font: monospace;
  }

  .hint-label {
    font-weight: 300;
  }

  .sample-char-width {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    font-family: var(--terminal-font);
    white-space: nowrap;
    font-size: 16px;
  }

  .terminal-window {
    display: inline-block;
    font-family: var(--terminal-font);
    font-size: 16px;
    line-height: 1.1;
    word-wrap: break-word;
    position: relative;
    background-color: black;
    color: white;
    cursor: default;

    :global(*) {
      white-space: nowrap;
    }

    :global(
        span[class]:not(span[class='']):not(span[class='preview-bg']):not(span[class='bg']):not(
            span[class*='outer-spacing']
          )
      ) {
      outline: 2px solid transparent;

      &:hover {
        position: relative;
        outline: 2px dotted salmon;
        outline-offset: 2px;
      }
    }
  }

  :global(.is-draggable .outer-spacing) {
    cursor: move;
  }

  .hint {
    background-color: var(--gray-900);
    line-height: 1.5;
    padding: 6px 12px;
  }

  .window-title {
    background: black;
    width: 100%;
    padding: 10px;
    border-radius: 7px 7px 0px 0px;

    .dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #f9f9f9;
      border-radius: 50%;
      margin: 0 4px 0 0;

      &.red {
        background: #ff6057;
        border: 1px solid #e14640;
      }

      &.amber {
        background: #ffbd2e;
        border: 1px solid #dfa123;
      }

      &.green {
        background: #27c93f;
        border: 1px solid #1dad2b;
      }
    }
  }
</style>
