<script lang="ts">
  import { orderedColorTokens } from '~/fzf/fzfColorDefinitions';
  import { getColorOrFallback, colorsStore, isValidColor } from '~/data/colorsStore';
  import { onMount } from 'svelte';
  import { themeStore, type ThemeOptions } from '~/data/themeStore';
  import { renderLines } from '~/utils/tui/renderLines';
  import { addDelegateEventListener } from '~/utils/addDelegateEventListener';
  import { toFzfColorName } from '~/utils/toFzfColorName';
  import ExportOptions from '~/components/ExportOptions.svelte';

  // take all known color tokens and set them as css variables
  $: allTokenVariables = orderedColorTokens
    .map((token) => `--fzf-${token}: ${getColorOrFallback(token, $colorsStore.colors).value}`)
    .join(';');

  let terminalWindowEl: HTMLDivElement;
  let wrapperEl: HTMLDivElement;
  let charWidthEl: HTMLSpanElement;
  let hintEl: HTMLDivElement;

  let currentBg: string | undefined = 'bg';
  let currentFg: string | undefined = 'fg';

  themeStore.subscribe((borderSettings) => {
    if (!terminalWindowEl) return;
    renderTerminalWindow(borderSettings);
  });

  function renderTerminalWindow(currentTheme: ThemeOptions) {
    terminalWindowEl.innerHTML = '';
    hintEl.style.width = '';

    const charWidth = charWidthEl.getBoundingClientRect().width;
    const terminalWindowWidth = wrapperEl.getBoundingClientRect().width;

    const maxCols = Math.floor(terminalWindowWidth / charWidth);

    const lineElements = renderLines(maxCols, currentTheme);

    lineElements.forEach((lineEl) => {
      terminalWindowEl.appendChild(lineEl);
    });

    hintEl.style.width = `${terminalWindowEl.getBoundingClientRect().width}px`;
  }

  onMount(() => {
    const onLoadHandler = () => void renderTerminalWindow($themeStore);
    const onResizeHandler = () => void renderTerminalWindow($themeStore);

    // if document already finished loading, just fire the
    // event without registering listener
    if (document.readyState === 'complete') {
      renderTerminalWindow($themeStore);
    } else {
      window.addEventListener('load', onResizeHandler);
    }

    window.addEventListener('resize', onResizeHandler);

    // show tips when hovering over tokens in the terminal
    addDelegateEventListener(
      terminalWindowEl,
      'mouseover',
      (e) => {
        const classes = Array.from((e.target as HTMLElement).classList);
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
      () => {
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
<div bind:this={wrapperEl} class="wrapper" style={allTokenVariables}>
  <ExportOptions />

  <div bind:this={terminalWindowEl} class="terminal-window bg"></div>
  <div class="hint" bind:this={hintEl}>
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

    background-color: var(--fzf-bg);
    color: var(--fzf-fg);
    cursor: default;

    :global(*) {
      white-space: nowrap;
    }

    :global(span[class]:not(span[class='']):not(span[class='preview-bg'])) {
      outline: 2px solid transparent;

      &:hover {
        position: relative;
        outline: 2px dotted salmon;
        outline-offset: 2px;
      }
    }
  }

  .hint {
    background-color: var(--gray-900);
    line-height: 1.5;
    padding: 6px 12px;
  }
</style>
