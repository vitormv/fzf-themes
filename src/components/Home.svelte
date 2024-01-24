<script lang="ts">
  import AboutPanel from '~/components/AboutPanel.svelte';
  import ColorPicker from '~/components/ColorPicker.svelte';
  import Box from '~/components/common/Box.svelte';
  import Palette from '~/components/Palette.svelte';
  import TerminalWindow from '~/components/TerminalWindow.svelte';
  import OptionsPanel from '~/components/OptionsPanel.svelte';
  import { onMount } from 'svelte';
  import { dragScroll } from '~/utils/svelte/useDragScroll';
  import { importFromUrlHash } from '~/data/import/importFromUrlHash';
  import { colorsStore } from '~/data/colors.store';
  import { optionsStore } from '~/data/options.store';
  import ExportOptions from '~/components/ExportOptions.svelte';
  import ImportOptions from '~/components/ImportOptions.svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  let terminalContentEl: HTMLDivElement;

  function updateStoreFromHash() {
    const hash = document.location.hash;

    if (!hash || !hash.startsWith('#')) return;

    const imported = importFromUrlHash(hash.substring(1));

    colorsStore.updateAllColors(imported.colors as any);
    optionsStore.updateAll(imported.themeOptions);
  }

  // allow Preview Panel to be scrolled by dragging. Useful when very big
  // margin/paddings are being used and content overflows
  onMount(() => {
    if (!terminalContentEl) return;

    dragScroll(terminalContentEl);

    updateStoreFromHash(); // run once on load

    const hashChangeHandler = () => void updateStoreFromHash();

    window.addEventListener('hashchange', hashChangeHandler);

    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  });
</script>

<main class="layout">
  <div class="panel-about">
    <AboutPanel />
  </div>

  <div class="panel-theme-options">
    <Box title="Theme Options">
      <OptionsPanel />
    </Box>
  </div>

  <div class="panel-palette">
    <Box title="Color Palette">
      <Palette />
    </Box>
  </div>

  <div class="panel-color-picker">
    <Box title="Color Picker">
      <ColorPicker />
    </Box>
  </div>

  <div class="panel-terminal">
    <Box title="Preview" bind:contentEl={terminalContentEl}>
      <svelte:fragment slot="buttons">
        <ImportOptions />
        <ExportOptions />
      </svelte:fragment>

      <TerminalWindow />
    </Box>
  </div>
</main>

<SvelteToast
  options={{
    reversed: true,
    intro: { y: 192 },
    theme: {
      '--toastColor': 'mintcream',
      '--toastBackground': 'rgba(72,187,120,0.9)',
      '--toastBarBackground': '#2F855A',
      '--toastBarHeight': 0,
    },
  }}
/>

<style lang="scss">
  .layout {
    display: flex;
    flex-direction: column;
    gap: var(--box-gap);
  }

  @media (min-width: $desktop-breakpoint) {
    .layout {
      display: grid;
      gap: var(--box-gap);
      grid-template-columns: 350px min-content 1fr;
      grid-template-rows: 350px 1fr;
      align-items: stretch;
      justify-content: stretch;
      align-content: stretch;
      height: 100%;
    }

    .panel-theme-options {
      grid-column: 2 / span 2;
      :global(.box) {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      :global(.box > .content) {
        display: flex;
        overflow-y: auto;
        gap: var(--box-gap);
      }
    }
    .panel-palette {
      // grid-row: 2 / span 1;

      :global(.box) {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      :global(> .box > .content) {
        flex: 1 1 0;
        overflow-y: scroll;
      }
    }
    .panel-color-picker {
      display: flex;
      gap: var(--box-gap);
      width: 100%;

      :global(.box) {
        flex: 0 1 300px;
      }

      :global(> .box > .content) {
        height: 100%;
      }
    }

    .panel-terminal {
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: auto;

      :global(> .box) {
        height: 100%;
        flex: 1;

        :global(> .content) {
          overflow: auto;
        }
      }
    }
  }
</style>
