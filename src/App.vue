<script lang="ts"></script>

<template>
  <div class="layout">
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
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  gap: var(--box-gap);
  grid-template-columns: auto max(300px, 1fr) 1fr;
  grid-template-rows: auto;
  align-items: stretch;
  height: 100%;
  grid-template-areas:
    'about palette settings'
    'about palette preview';
}
</style>
