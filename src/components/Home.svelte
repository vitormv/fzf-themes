<script lang="ts">
  import AboutPanel from '~/components/AboutPanel.svelte';
  import ColorPicker from '~/components/ColorPicker.svelte';
  import Box from '~/components/common/Box.svelte';
  import Palette from '~/components/Palette.svelte';
  import TerminalWindow from '~/components/TerminalWindow.svelte';
  import OptionsPanel from '~/components/OptionsPanel.svelte';
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

    <div class="panel-terminal">
      <Box title="Preview">
        <TerminalWindow />
      </Box>
    </div>
  </div>
</main>

<style lang="scss">
  .layout {
    display: grid;
    gap: var(--box-gap);
    grid-template-columns: 350px 1fr;
    grid-template-rows: 350px auto;
    align-items: stretch;
    justify-content: stretch;
    align-items: stretch;
    align-content: stretch;
    height: 100%;
  }

  .panel-theme-options {
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
    :global(.box) {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    :global(.box > .content) {
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

    :global(.box > .content) {
      height: 100%;
    }
  }

  .panel-terminal {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    :global(.box) {
      flex: 1;
    }
  }
</style>
