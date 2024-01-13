<script lang="ts">
  import { colorsStore } from '~/data/colorsStore';
  import ColorPickerWrapper from '~/components/CustomColorPicker/ColorPickerWrapper.svelte';
  import ColorPicker from 'svelte-awesome-color-picker';
  import { colorInheritances } from '~/fzf/fzfColorDefinitions';
  import { toFzfColorName } from '~/utils/toFzfColorName';
  import TextInput from '~/components/CustomColorPicker/TextInput.svelte';
  import { onMount } from 'svelte';

  let wrapperEl: HTMLDivElement;
  let pickerHeight = '100%';

  $: inheritsFrom = colorInheritances[$colorsStore.selectedColor];

  onMount(() => {
    // the color picker does not support percentages as height,
    // so calculate boundaries on resize and set height in pixels
    const onResizeHandler = () => {
      const targetEl = wrapperEl;

      if (!targetEl) return;

      pickerHeight = `${targetEl.getBoundingClientRect().height - 200}px`;
    };

    onResizeHandler();

    window.addEventListener('resize', onResizeHandler);

    return () => {
      window.removeEventListener('resize', onResizeHandler);
    };
  });
</script>

<div class="wrapper" bind:this={wrapperEl}>
  <ColorPicker
    isAlpha={false}
    isDialog={false}
    hex={$colorsStore.colors[$colorsStore.selectedColor]}
    components={{ wrapper: ColorPickerWrapper, textInput: TextInput }}
    on:input={(event) => {
      const newColor = event.detail.hex;
      colorsStore.updateColor($colorsStore.selectedColor, newColor);
    }}
    --picker-radius="0"
    --slider-width="15px"
    --picker-width="300px"
    --picker-height={pickerHeight}
  />

  <div class="description">
    <strong>{toFzfColorName($colorsStore.selectedColor)}</strong>

    {#if inheritsFrom.length > 0}
      {#each inheritsFrom as parent}
        ({'inherits from '}{toFzfColorName(parent)})
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  .description {
    background-color: var(--gray-900);
    margin-top: 10px;
    position: absolute;
    text-align: center;
    padding: 15px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
