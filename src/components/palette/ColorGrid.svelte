<script lang="ts">
  import ColorItem from '~/components/palette/ColorItem.svelte';
  import { initialColors } from '~/state/settingsContext';
  import type { FzfColor } from '~/types/fzf';

  /**
   * In the store, the order of colors constantly changes, so prefer to use
   * initialColors const to guarantee consistent order
   */
  const allTokens = Object.keys(initialColors) as FzfColor[];
</script>

<div class="wrapper">
  <button type="button" class="js-reset-all btn btn-sm btn-outline-secondary">Reset all</button>

  <div class="color-grid">
    <!-- use const initialColors (instead of store) because  -->
    <!-- in the object, the order of elements never changes  -->
    {#each allTokens as token}
      <ColorItem {token} />
    {/each}
  </div>
</div>

<style>
  .wrapper {
    height: 100%;
    overflow-y: scroll;
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
