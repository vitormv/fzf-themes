<script lang="ts">
  import ColorItem from '~/components/palette/ColorItem.svelte';
  import { orderedColorTokens } from '~/data/fzfDefinitions';
  import { colorsStore } from '~/data/colorsStore';
</script>

<div class="wrapper">
  <button
    type="button"
    class="btn btn-sm btn-outline-secondary"
    on:click={colorsStore.resetAllColors}
  >
    Reset all
  </button>

  <div class="color-grid">
    {#each orderedColorTokens as token}
      <ColorItem {token} />
    {/each}
  </div>
</div>

<style>
  .wrapper {
    flex: 1;
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
