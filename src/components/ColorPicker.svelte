<script lang="ts">
  import { settingsStore } from '~/data/settingsStore';
  import ColorPickerWrapper from '~/components/ColorPickerWrapper.svelte';
  import ColorPicker from 'svelte-awesome-color-picker';
</script>

<ColorPicker
  isAlpha={false}
  isDialog={false}
  hex={$settingsStore.colors[$settingsStore.selectedColor]}
  components={{ wrapper: ColorPickerWrapper }}
  on:input={(event) => {
    const newColor = event.detail.hex;
    settingsStore.updateColor($settingsStore.selectedColor, newColor);
  }}
  --picker-radius="0"
  --slider-width="15px"
  --picker-width="300px"
/>

<style>
  :global(.color-picker.vertical) {
    display: block;
    height: 100%;
  }
</style>
