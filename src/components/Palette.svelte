<script lang="ts">
  import PaletteColor from '~/components/PaletteColor.svelte';
  import { orderedColorTokens } from '~/data/fzfDefinitions';
  import { colorsStore } from '~/data/colorsStore';
</script>

<div class="wrapper">
  <button type="button" class="btn btn-outline" on:click={colorsStore.resetAllColors}>
    Reset all
  </button>

  <div class="color-grid">
    {#each orderedColorTokens as token}
      <PaletteColor token={token} />
    {/each}
  </div>
</div>

<style>
  .wrapper {
    flex: 1;
    height: 100%;
  }

  button {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .color-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    gap: 12px;
  }
</style>
