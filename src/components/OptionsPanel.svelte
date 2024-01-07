<script lang="ts">
  import FormControl from '~/components/common/FormControl.svelte';
  // @ts-ignore
  import AutoComplete from 'simple-svelte-autocomplete';
  import { borderTypes, type BorderStyle } from '~/data/fzfBorders';
  import { borderStore } from '~/data/borderStore';
</script>

<div>
  <FormControl label="Border">
    <AutoComplete
      items={borderTypes}
      selectedItem={$borderStore.style}
      onChange={(newBorderStyle) => void borderStore.setStyle(newBorderStyle)}
    />
  </FormControl>

  <FormControl label="Border Label">
    <input type="text" />
  </FormControl>
  <FormControl label="Border Pos">
    <input type="text" />
  </FormControl>
  <FormControl label="Layout">
    <input type="text" />
  </FormControl>
  <FormControl label="Margin">
    <input type="text" />
  </FormControl>
  <FormControl label="Padding">
    <input type="text" />
  </FormControl>
  <FormControl label="Separator">
    <input type="text" />
  </FormControl>
  <FormControl label="Prompt">
    <input type="text" />
  </FormControl>
  <FormControl label="Pointer">
    <input type="text" />
  </FormControl>
  <FormControl label="Marker">
    <input type="text" />
  </FormControl>
  <FormControl label="Info">
    <input type="text" />
  </FormControl>
</div>

<style>
</style>
