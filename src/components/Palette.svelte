<script lang="ts">
  import PaletteColor from '~/components/PaletteColor.svelte';
  import { orderedColorTokens } from '~/fzf/fzfColorDefinitions';
  import { colorsStore } from '~/data/color.store';
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

<style lang="scss">
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
    /**
   * User input values.
   */
    --grid-layout-gap: 10px;
    --grid-column-count: 4;
    --grid-item--min-width: 136px;

    /**
   * Calculated values.
   */
    --gap-count: calc(var(--grid-column-count) - 1);
    --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
    --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
    );
    grid-gap: var(--grid-layout-gap);

    width: 100%;
    padding: 0 0 20px;
  }

  @media (min-width: $desktop-breakpoint) {
    .color-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      grid-gap: 12px;
      padding: 0 0 20px;
    }
  }
</style>
