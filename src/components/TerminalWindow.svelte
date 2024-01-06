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

  onMount(() => {
    terminalWindowEl.innerHTML = '';

    lines.forEach((line) => {
      terminalWindowEl.appendChild(line.render(50));
    });
  });
</script>

<div style={allTokenVariables}>
  <div bind:this={terminalWindowEl} class="terminal-window"></div>
</div>

<style lang="scss">
  /* --- TERMINAL WINDOW ------------------------------------------------------ */

  .cursor {
    animation: cursor-blink 1.5s steps(1) infinite;
  }

  .terminal-spinner {
    position: relative;

    .placeholder {
      visibility: hidden;
    }

    &::after {
      position: absolute;
      left: 0;
      animation: terminal-spinner 0.8s linear infinite;
      display: inline;
      content: '⠋';
    }
  }

  .terminal-window {
    list-style-type: none;
    font-family: 'Roboto Mono', monospace;
    padding: 10px;
    font-size: 16px;
    padding: 20px;
    line-height: 1.4;
    overflow: hidden;
    word-wrap: break-word;
    position: relative;

    background-color: var(--fzf-bg);
    color: var(--fzf-fg);

    > li {
      line-height: 1.2;
    }

    & span {
      display: inline-block;
    }

    :global(span[class]:not(span[class=''])) {
      cursor: pointer;
      outline: 2px solid transparent;

      &:hover {
        outline: 2px dotted salmon;
      }
    }
  }
</style>
