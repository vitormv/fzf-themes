<script lang="ts">
  import AboutPanel from '~/components/AboutPanel.svelte';
  import ColorPicker from '~/components/ColorPicker.svelte';
  import LayoutBox from '~/components/common/LayoutBox.svelte';
  import ColorGrid from '~/components/palette/ColorGrid.svelte';
  import TerminalWindow from '~/components/TerminalWindow.svelte';
  import OptionsPanel from '~/components/OptionsPanel.svelte';
</script>

<main class="layout">
  <div style="">
    <AboutPanel />
  </div>

  <div style="">
    <LayoutBox
      title="Theme Options"
      style="display: flex; flex-direction: column; height: 100%;"
      contentStyle="display: flex; overflow-y: auto; gap: var(--box-gap)"
    >
      <OptionsPanel />
    </LayoutBox>
  </div>

  <div style="overflow: auto">
    <LayoutBox title="Color Palette">
      <ColorGrid />
    </LayoutBox>
  </div>

  <div style="display: flex; gap: var(--box-gap); width: 100%;">
    <LayoutBox title="Color Picker" style="flex: 0 1 300px" contentStyle="height: 100%;">
      <ColorPicker />
    </LayoutBox>

    <LayoutBox title="Preview" style="flex: 1;">
      <TerminalWindow />
    </LayoutBox>
  </div>
</main>

<style>
  .layout {
    display: grid;
    gap: var(--box-gap);
    grid-template-columns: 350px 1fr;
    grid-template-rows: minmax(300px, 400px) auto;
    align-items: stretch;
    height: 100%;
  }
</style>
