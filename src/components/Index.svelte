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
  <div style="">
    <AboutPanel />
  </div>

  <div style="">
    <Box
      title="Theme Options"
      style="display: flex; flex-direction: column; height: 100%;"
      contentStyle="display: flex; overflow-y: auto; gap: var(--box-gap)"
    >
      <OptionsPanel />
    </Box>
  </div>

  <div>
    <Box
      title="Color Palette"
      style="display: flex; flex-direction: column; height: 100%;"
      contentStyle="flex: 1 1 0; overflow-y: scroll;"
    >
      <Palette />
    </Box>
  </div>

  <div style="display: flex; gap: var(--box-gap); width: 100%;">
    <Box title="Color Picker" style="flex: 0 1 300px" contentStyle="height: 100%;">
      <ColorPicker />
    </Box>

    <div style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
      <Box title="Preview" style="flex: 1;">
        <TerminalWindow />
      </Box>

      <Box title="Export" style="flex: 1;">
        <ExportOptions />
      </Box>
    </div>
  </div>
</main>

<style>
  .layout {
    display: grid;
    gap: var(--box-gap);
    grid-template-columns: 350px 1fr;
    align-items: stretch;
    justify-content: stretch;
    grid-template-rows: 320px auto;
    align-items: stretch;
    align-content: stretch;
    height: 100%;
  }
</style>
