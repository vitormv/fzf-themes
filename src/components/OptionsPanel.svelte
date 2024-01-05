<script lang="ts">
  import { onMount } from 'svelte';
  import Picker from 'vanilla-picker';
  import { settingsStore } from '~/state/settingsContext';

  let picker: Picker;

  onMount(() => {
    const parent = document.querySelector('#container-color-picker') as HTMLElement;

    picker = new Picker({
      parent: parent,
      popup: false,
      alpha: false,
      layout: 'default',
      onChange: (color) => {
        settingsStore.updateColor($settingsStore.selectedColor, color.hex.substring(0, 7));
      },
    });
  });

  $: picker?.setOptions({ color: $settingsStore.colors[$settingsStore.selectedColor] });
</script>

<div>
  <div id="container-color-picker"></div>
</div>

<style>
  :global(.picker-wrapper) {
    width: 600px;
    height: 300px;
  }

  :global(.layout_default.picker_wrapper) {
    background-color: transparent;
    box-shadow: none;
    border: 0;
    padding: 0 !important;
  }
</style>
