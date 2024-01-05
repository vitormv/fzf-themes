<script setup lang="ts">
import { options } from '~/state/options'
</script>

<template>
  <ul
    class="terminal-window"
    :style="{
      '--fzf-fg': options.colors.fg,
      '--fzf-fg-plus': options.colors['fg-plus'],
      '--fzf-bg': options.colors['bg'],
      '--fzf-bg-plus': options.colors['bg-plus'],
      '--fzf-hl': options.colors['hl'],
      '--fzf-hl-plus': options.colors['hl-plus'],
      '--fzf-info': options.colors['info'],
      '--fzf-marker': options.colors['marker'],
      '--fzf-prompt': options.colors['prompt'],
      '--fzf-spinner': options.colors['spinner'],
      '--fzf-pointer': options.colors['pointer'],
      '--fzf-header': options.colors['header'],
      '--fzf-gutter': options.colors['gutter'],
      '--fzf-border': options.colors['border'],
      '--fzf-separator': options.colors['separator'],
    }"
  >
    <li>
      <span class="fzf-gutter">&nbsp;</span><span class="fzf-gutter fzf-marker">&gt;</span
      ><span class="fzf-fg">src/fzf/main</span><span class="fzf-hl">.go</span
      ><span class="fzf-scrollbar">│</span>
    </li>
    <li>
      <span class="fzf-gutter">&nbsp;</span>&nbsp;<span class="fzf-fg">src/pattern</span
      ><span class="fzf-hl">.go</span><span class="fzf-scrollbar">│</span>
    </li>
    <li>
      <span class="fzf-gutter">&nbsp;</span><span class="fzf-gutter fzf-marker">&gt;</span
      ><span class="fzf-fg">src/options</span><span class="fzf-hl">.go</span
      ><span class="fzf-scrollbar">│</span>
    </li>
    <li>
      <span class="fzf-gutter">&nbsp;</span>&nbsp;<span class="fzf-fg">src/matcher</span
      ><span class="fzf-hl">.go</span>
    </li>
    <li>
      <span class="active"
        ><span class="fzf-gutter fzf-pointer">&gt;</span><span class="fzf-marker">&nbsp;</span
        ><span class="fzf-fg-plus">src/history</span><span class="fzf-hl">.go</span></span
      >
    </li>
    <li>
      <span class="fzf-gutter">&nbsp;</span>&nbsp;<span class="fzf-fg">src/reader</span
      ><span class="fzf-hl">.go</span>
    </li>
    <li>
      <span class="fzf-gutter">&nbsp;</span>&nbsp;<span class="fzf-fg">src/merger</span
      ><span class="fzf-hl">.go</span>
    </li>
    <li>&nbsp;&nbsp;<span class="fzf-header">This is Header</span></li>
    <li>
      <span class="fzf-spinner terminal-spinner"><span class="placeholder">&nbsp;</span></span
      ><span class="fzf-info">&nbsp;35/63 (3)</span>&nbsp;<span class="fzf-separator"
        >───────────────────────────────────────</span
      >
    </li>
    <li><span class="fzf-prompt">&gt;&nbsp;</span>.go$<span class="cursor">█</span></li>
  </ul>
</template>

<style scoped>
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
      background-color 200ms ease-out,
      outline 150ms ease-out;
    cursor: pointer;
    outline: 2px solid transparent;

    &:hover {
      outline: 2px dotted salmon;
    }
  }

  .fzf-hl {
    color: var(--fzf-hl);
  }

  .fzf-pointer {
    color: var(--fzf-pointer);
  }

  .fzf-marker {
    color: var(--fzf-marker);
  }

  .fzf-gutter {
    background-color: var(--fzf-gutter);
    display: inline-block;
  }

  .fzf-header {
    color: var(--fzf-header);
  }

  .fzf-info {
    color: var(--fzf-info);
  }

  .fzf-spinner {
    color: var(--fzf-spinner);
  }

  .fzf-prompt {
    color: var(--fzf-prompt);
  }

  .fzf-border {
    color: var(--fzf-border);
  }

  .fzf-separator {
    color: var(--fzf-separator);
  }

  .fzf-scrollbar {
    color: red;
    position: absolute;
    right: 5px;

    color: var(--fzf-scrollbar);
  }

  .active {
    font-weight: bold;
    color: var(--fzf-fg-plus);
    background-color: var(--fzf-bg-plus);

    .fzf-hl {
      color: var(--fzf-hl-plus);
    }
  }
}
</style>
