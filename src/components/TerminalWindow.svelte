<script lang="ts">
  import { orderedColorTokens } from '~/data/fzfDefinitions';
  import { getColorOrFallback, settingsStore } from '~/data/settingsStore';
  import { onMount } from 'svelte';
  import { lines } from '~/data/terminalLines';

  // take all known color tokens and set them as css variables
  $: allTokenVariables = orderedColorTokens
    .map((token) => `--fzf-${token}: ${getColorOrFallback(token, $settingsStore.colors)}`)
    .join(';');

  let terminalWindowEl: HTMLDivElement;
  let charWidthEl: HTMLSpanElement;

  function renderTerminalWindow() {
    terminalWindowEl.innerHTML = '';
    terminalWindowEl.style.width = '';

    const charWidth = charWidthEl.getBoundingClientRect().width;
    const terminalWindowWidth = terminalWindowEl.getBoundingClientRect().width;

    // cols follow the screen size, but has a minimum of 50
    const maxCols = Math.max(50, Math.floor(terminalWindowWidth / charWidth));

    lines.forEach((line) => {
      terminalWindowEl.style.width = `${Math.ceil(maxCols * charWidth) + 3}px`;
      terminalWindowEl.appendChild(line.render(maxCols));
    });
  }

  onMount(() => {
    function onLoadHandler() {
      renderTerminalWindow();
    }

    if (document.readyState === 'complete') {
      renderTerminalWindow();
    } else {
      window.addEventListener('load', onResizeHandler);
    }

    function onResizeHandler() {
      renderTerminalWindow();
    }

    window.addEventListener('resize', onResizeHandler);

    return () => {
      window.removeEventListener('load', onLoadHandler);
      window.removeEventListener('resize', onResizeHandler);
    };
  });
</script>

<div class="wrapper" style={allTokenVariables}>
  <div bind:this={terminalWindowEl} class="terminal-window"></div>

  <!-- This element is used to calculate the current width of chars according
  to users browser window, resolution, zoom amount, etc. -->
  <span bind:this={charWidthEl} class="sample-char-width">m</span>
</div>

<style lang="scss">
  :root {
    --terminal-font: 'Roboto Mono', monospace;
  }

  .wrapper {
    position: relative;
  }

  .sample-char-width {
    // its like it was never there :)
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    font-family: var(--terminal-font);
  }
  .terminal-window {
    list-style-type: none;
    font-family: var(--terminal-font);
    font-size: 16px;
    line-height: 1.3;
    overflow: hidden;
    word-wrap: break-word;
    position: relative;

    background-color: var(--fzf-bg);
    color: var(--fzf-fg);

    :global(span[class]:not(span[class=''])) {
      cursor: pointer;
      outline: 2px solid transparent;

      &:hover {
        outline: 2px dotted salmon;
      }
    }
  }
</style>
