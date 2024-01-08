<script lang="ts">
  import AboutPanel from '~/components/AboutPanel.svelte';
  import ColorPicker from '~/components/ColorPicker.svelte';
  import Box from '~/components/common/Box.svelte';
  import Palette from '~/components/Palette.svelte';
  import TerminalWindow from '~/components/TerminalWindow.svelte';
  import OptionsPanel from '~/components/OptionsPanel.svelte';
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

  <div style="overflow: auto">
    <Box title="Color Palette">
      <Palette />
    </Box>
  </div>

  <div style="display: flex; gap: var(--box-gap); width: 100%;">
    <Box title="Color Picker" style="flex: 0 1 300px" contentStyle="height: 100%;">
      <ColorPicker />
    </Box>

    <Box title="Preview" style="flex: 1;">
      <TerminalWindow />
    </Box>
  </div>
</main>

<style>
  .layout {
    display: grid;
    gap: var(--box-gap);
    grid-template-columns: 350px 1fr;
    grid-template-rows: 320px auto;
    align-items: stretch;
    height: 100%;
  }
</style>
