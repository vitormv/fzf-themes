<script lang="ts">
  import { colorsStore, getColorOrFallback } from '~/data/colorsStore';
  import ColorPickerWrapper from '~/components/ColorPickerWrapper.svelte';
  import ColorPicker from 'svelte-awesome-color-picker';
  import { colorInheritances } from '~/data/fzfDefinitions';

  $: inheritsFrom = colorInheritances[$colorsStore.selectedColor];
</script>

<div class="wrapper">
  <ColorPicker
    isAlpha={false}
    isDialog={false}
    hex={$colorsStore.colors[$colorsStore.selectedColor]}
    components={{ wrapper: ColorPickerWrapper }}
    on:input={(event) => {
      const newColor = event.detail.hex;
      colorsStore.updateColor($colorsStore.selectedColor, newColor);
    }}
    --picker-radius="0"
    --slider-width="15px"
    --picker-width="300px"
  />

  {#if inheritsFrom.length > 0}
    <div class="inheritance">
      <strong>Inheritance: {$colorsStore.selectedColor}</strong>

      {#each inheritsFrom as parent, i}
        {' ← '}{parent}
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 60px;
  }
  .inheritance {
    background-color: var(--gray-900);
    margin-top: 10px;
    position: absolute;
    padding: 15px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
