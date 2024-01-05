<script lang="ts">
  import InfoColumn from '~/components/InfoColumn.svelte';
  import OptionsPanel from '~/components/OptionsPanel.svelte';
  import LayoutBox from '~/components/common/LayoutBox.svelte';
  import ColorGrid from '~/components/palette/ColorGrid.svelte';
  import TerminalWindow from '~/components/tui/TerminalWindow.svelte';
</script>

<main class="layout">
  <div style="grid-row: 1 / span 2">
    <InfoColumn />
  </div>

  <div class="box" style="grid-row: 1 / span 2; overflow: auto">
    <LayoutBox title="Palette">
      <ColorGrid />
    </LayoutBox>
  </div>

  <LayoutBox title="Settings">
    <OptionsPanel />
  </LayoutBox>

  <LayoutBox title="Preview">
    <TerminalWindow />
  </LayoutBox>
</main>

<style>
  .layout {
    display: grid;
    gap: var(--box-gap);
    grid-template-columns: 350px 300px 1fr;
    grid-template-rows: auto;
    align-items: stretch;
    height: 100%;
    grid-template-areas:
      'about palette settings'
      'about palette preview';
  }
</style>
