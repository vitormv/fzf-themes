<script lang="ts">
  import ColorItem from '~/components/palette/ColorItem.svelte';
  import { orderedColorTokens } from '~/data/fzfDefinitions';
</script>

<div class="wrapper">
  <button type="button" class="js-reset-all btn btn-sm btn-outline-secondary">Reset all</button>

  <div class="color-grid">
    {#each orderedColorTokens as token}
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
