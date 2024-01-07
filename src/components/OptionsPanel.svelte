<script lang="ts">
  import FormControl from '~/components/common/FormControl.svelte';
  import { borderTypes } from '~/data/fzfBorders';
  import { borderStore } from '~/data/borderStore';
  import InputCycle from '~/components/common/InputCycle.svelte';
</script>

<div>
  <FormControl label="Border">
    <InputCycle
      items={borderTypes}
      value={$borderStore.style}
      showIndex
      on:change={(e) => {
        borderStore.setStyle(e.detail);
      }}
    />
  </FormControl>

  <FormControl label="Border Label">
    <input type="text" />
  </FormControl>
  <FormControl label="Border Pos">
    <input type="text" />
  </FormControl>
  <FormControl label="Layout">
    <InputCycle items={['default', 'reverse', 'reverse-list']} value={'default'} />
  </FormControl>
  <FormControl label="Margin">
    <input type="text" />
  </FormControl>
  <FormControl label="Padding">
    <input type="text" value="0,1" />
  </FormControl>
  <FormControl label="Separator">
    <input type="text" value="─" />
  </FormControl>
  <FormControl label="Prompt">
    <input type="text" value="> " />
  </FormControl>
  <FormControl label="Pointer">
    <input type="text" value="◆" />
  </FormControl>
  <FormControl label="Marker">
    <input type="text" value="> " />
  </FormControl>
  <FormControl label="Info">
    <input type="text" />
  </FormControl>
</div>

<style>
</style>
