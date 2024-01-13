<script lang="ts">
  import AboutPanel from '~/components/AboutPanel.svelte';
  import ColorPicker from '~/components/ColorPicker.svelte';
  import Box from '~/components/common/Box.svelte';
  import Palette from '~/components/Palette.svelte';
  import TerminalWindow from '~/components/TerminalWindow.svelte';
  import OptionsPanel from '~/components/OptionsPanel.svelte';
  import ExportOptions from '~/components/ExportOptions.svelte';
</script>

<main class="layout">
  <div class="panel-about">
    <AboutPanel />
  </div>

  <div class="panel-theme-options" style="">
    <Box
      title="Theme Options"
      style="display: flex; flex-direction: column; height: 100%;"
      contentStyle="display: flex; overflow-y: auto; gap: var(--box-gap)"
    >
      <OptionsPanel />
    </Box>
  </div>

  <div class="panel-palette">
    <Box
      title="Color Palette"
      style="display: flex; flex-direction: column; height: 100%;"
      contentStyle="flex: 1 1 0; overflow-y: scroll;"
    >
      <Palette />
    </Box>
  </div>

  <div class="panel-color-picker" style="display: flex; gap: var(--box-gap); width: 100%;">
    <Box title="Color Picker" style="flex: 0 1 300px" contentStyle="height: 100%;">
      <ColorPicker />
    </Box>

    <div class="panel-terminal" style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
      <Box title="Preview" style="flex: 1;">
        <TerminalWindow />
      </Box>
    </div>
  </div>
</main>

<style>
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
</style>
