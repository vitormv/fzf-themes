<script lang="ts">
  import { orderedColorTokens } from '~/data/fzfDefinitions';
  import { getColorOrFallback, colorsStore } from '~/data/colorsStore';
  import { onMount } from 'svelte';
  import { themeStore, type ThemeOptions } from '~/data/themeStore';
  import { renderLines } from '~/utils/tui/renderLines';

  // take all known color tokens and set them as css variables
  $: allTokenVariables = orderedColorTokens
    .map((token) => `--fzf-${token}: ${getColorOrFallback(token, $colorsStore.colors)}`)
    .join(';');

  let terminalWindowEl: HTMLDivElement;
  let wrapperEl: HTMLDivElement;
  let charWidthEl: HTMLSpanElement;

  $: theme = $themeStore;

  themeStore.subscribe((borderSettings) => {
    if (!terminalWindowEl) return;
    renderTerminalWindow(borderSettings);
  });

  function renderTerminalWindow(currentTheme: ThemeOptions) {
    terminalWindowEl.innerHTML = '';

    const charWidth = charWidthEl.getBoundingClientRect().width;
    const terminalWindowWidth = wrapperEl.getBoundingClientRect().width;

    // cols follow the screen size, but has a minimum of 50
    const maxCols = Math.max(50, Math.floor(terminalWindowWidth / charWidth));

    const lineElements = renderLines(maxCols, currentTheme);

    lineElements.forEach((lineEl) => {
      terminalWindowEl.appendChild(lineEl);
    });
  }

  onMount(() => {
    function onLoadHandler() {
      renderTerminalWindow(theme);
    }

    if (document.readyState === 'complete') {
      renderTerminalWindow(theme);
    } else {
      window.addEventListener('load', onResizeHandler);
    }

    function onResizeHandler() {
      renderTerminalWindow(theme);
    }

    window.addEventListener('resize', onResizeHandler);

    return () => {
      window.removeEventListener('load', onLoadHandler);
      window.removeEventListener('resize', onResizeHandler);
    };
  });
</script>

<pre style="font-family: var(--terminal-font)"></pre>

<div bind:this={wrapperEl} class="wrapper" style={allTokenVariables}>
  <div bind:this={terminalWindowEl} class="terminal-window"></div>

  <!-- This element is used to calculate the current width of chars according
  to users browser window, resolution, zoom amount, etc. -->
</div>
<span bind:this={charWidthEl} class="sample-char-width">▀</span>

<style lang="scss">
  :root {
    --terminal-font: monospace;
  }

  .wrapper {
    position: relative;
    display: inline-block;
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
    line-height: 1.3;
    word-wrap: break-word;
    position: relative;

    background-color: var(--fzf-bg);
    color: var(--fzf-fg);

    :global(*) {
      white-space: nowrap;
    }

    :global(span[class]:not(span[class=''])) {
      cursor: pointer;
      outline: 2px solid transparent;

      &:hover {
        position: relative;
        outline: 2px dotted salmon;
      }
    }
  }
</style>
