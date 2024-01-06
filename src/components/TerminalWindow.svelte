<script lang="ts">
  import { orderedColorTokens } from '~/data/fzfDefinitions';
  import { settingsStore } from '~/data/settingsStore';

  // take all known color tokens and set them as css variables
  $: allTokenVariables = orderedColorTokens
    .map((token) => `--fzf-${token}: ${$settingsStore.colors[token]}`)
    .join(';');
</script>

<ul class="terminal-window" style={allTokenVariables}>
  <li>
    <span class="fzf-gutter">&nbsp;</span><span class="fzf-gutter fzf-marker">&gt;</span><span
      class="fzf-fg">src/fzf/main</span
    ><span class="fzf-hl">.go</span><span class="fzf-scrollbar">│</span>
  </li>
  <li>
    <span class="fzf-gutter">&nbsp;</span>&nbsp;<span class="fzf-fg">src/pattern</span><span
      class="fzf-hl">.go</span
    ><span class="fzf-scrollbar">│</span>
  </li>
  <li>
    <span class="fzf-gutter">&nbsp;</span><span class="fzf-gutter fzf-marker">&gt;</span><span
      class="fzf-fg">src/options</span
    ><span class="fzf-hl">.go</span><span class="fzf-scrollbar">│</span>
  </li>
  <li>
    <span class="fzf-gutter">&nbsp;</span>&nbsp;<span class="fzf-fg">src/matcher</span><span
      class="fzf-hl">.go</span
    >
  </li>
  <li>
    <span class="fzf-bg-plus"
      ><span class="fzf-gutter fzf-pointer">&gt;</span><span class="fzf-marker">&nbsp;</span><span
        class="fzf-fg-plus">src/history</span
      ><span class="fzf-hl-plus">.go</span></span
    >
  </li>
  <li>
    <span class="fzf-gutter">&nbsp;</span>&nbsp;<span class="fzf-fg">src/reader</span><span
      class="fzf-hl">.go</span
    >
  </li>
  <li>
    <span class="fzf-gutter">&nbsp;</span>&nbsp;<span class="fzf-fg">src/merger</span><span
      class="fzf-hl">.go</span
    >
  </li>
  <li>&nbsp;&nbsp;<span class="fzf-header">This is Header</span></li>
  <li>
    <span class="fzf-spinner terminal-spinner"><span class="placeholder">&nbsp;</span></span><span
      class="fzf-info">&nbsp;35/63 (3)</span
    >&nbsp;<span class="fzf-separator">───────────────────────────────────────</span>
  </li>
  <li>
    <span class="fzf-prompt">&gt;&nbsp;</span><span class="fzf-query">.go$</span><span class="cursor">█</span>
  </li>
</ul>

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
    font-family: 'Inconsolata', monospace;
    padding: 10px;
    font-size: 20px;
    padding: 20px;
    line-height: 121%;
    overflow: hidden;
    word-wrap: break-word;
    position: relative;

    background-color: var(--fzf-bg);
    color: var(--fzf-fg);

    > li {
      line-height: 1.2;
    }

    [class*='fzf-'] {
      transition:
        color 200ms ease-out,
        background-color 200ms ease-out;
      cursor: pointer;
      outline: 2px solid transparent;

      &:hover {
        outline: 2px dotted salmon;
      }
    }

    .fzf-scrollbar {
      position: absolute;
      right: 5px;
    }

    .fzf-bg-plus {
      font-weight: bold;
    }
  }

  :global(.fzf-hl) {
    color: var(--fzf-hl);
  }

  :global(.fzf-pointer) {
    color: var(--fzf-pointer);
  }

  :global(.fzf-marker) {
    color: var(--fzf-marker);
  }

  :global(.fzf-gutter) {
    background-color: var(--fzf-gutter);
    display: inline-block;
  }

  :global(.fzf-header) {
    color: var(--fzf-header);
  }

  :global(.fzf-info) {
    color: var(--fzf-info);
  }

  :global(.fzf-spinner) {
    color: var(--fzf-spinner);
  }

  :global(.fzf-prompt) {
    color: var(--fzf-prompt);
  }

  :global(.fzf-border) {
    color: var(--fzf-border);
  }

  :global(.fzf-separator) {
    color: var(--fzf-separator);
  }

  :global(.fzf-scrollbar) {
    color: var(--fzf-scrollbar);
  }

  :global(.fzf-bg-plus) {
    background-color: var(--fzf-bg-plus);
    font-weight: bold;
  }

  :global(.fzf-fg-plus) {
    color: var(--fzf-fg-plus);
  }

  :global(.fzf-hl-plus) {
    color: var(--fzf-hl-plus);
  }
</style>
