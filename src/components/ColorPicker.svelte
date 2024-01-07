<script lang="ts">
  import { colorsStore } from '~/data/colorsStore';
  import ColorPickerWrapper from '~/components/ColorPickerWrapper.svelte';
  import ColorPicker from 'svelte-awesome-color-picker';
</script>

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

<style>
</style>
