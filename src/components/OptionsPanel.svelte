<script lang="ts">
  import { onMount } from 'svelte';
  import Picker from 'vanilla-picker';
  import { colorDefinitions } from '~/data/fzfDefinitions';
  import { settingsStore } from '~/data/settingsStore';

  let picker: Picker;

  onMount(() => {
    const parent = document.querySelector('#container-color-picker') as HTMLElement;

    picker = new Picker({
      parent: parent,
      popup: false,
      alpha: false,
      layout: 'default',
      color: colorDefinitions.fg.initial, // initial color only
      onChange: (color) => {
        // update settingsStore
        settingsStore.updateColor($settingsStore.selectedColor, color.hex.substring(0, 7));
      },
    });
  });

  // when "selectedColor" changes in the store, also update the currentcolor in the ColorPicker
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
