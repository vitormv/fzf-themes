<script lang="ts">
  import FormControl from '~/components/common/FormControl.svelte';
  import { borderTypes } from '~/data/fzfBorders';
  import { themeStore } from '~/data/themeStore';
  import InputCycle from '~/components/common/InputCycle.svelte';
</script>

<div class="wrapper">
  <div class="group">
    <div class="group-title">Border</div>

    <FormControl label="Border">
      <InputCycle
        items={borderTypes}
        value={$themeStore.borderStyle}
        showIndex
        on:change={(e) => {
          themeStore.set('borderStyle', e.detail);
        }}
      />
    </FormControl>

    <FormControl label="Label">
      <input type="text" />
    </FormControl>

    <FormControl label="Label Pos">
      <input type="text" />
    </FormControl>

    <FormControl label="Separator">
      <input type="text" value="─" />
    </FormControl>
  </div>

  <div class="group">
    <div class="group-title">Box</div>

    <FormControl label="Layout">
      <InputCycle items={['default', 'reverse', 'reverse-list']} value={'default'} />
    </FormControl>

    <FormControl label="Margin">
      <input type="text" />
    </FormControl>

    <FormControl label="Padding">
      <input type="text" value="0,1" />
    </FormControl>
  </div>

  <div class="group">
    <div class="group-title">Indicators</div>

    <FormControl label="Prompt">
      <input type="text" value="> " />
    </FormControl>
    <FormControl label="Pointer">
      <input type="text" value="◆" maxlength="2" />
    </FormControl>
    <FormControl label="Marker">
      <input type="text" value="> " maxlength="2" />
    </FormControl>

    <FormControl label="Info">
      <input type="text" />
    </FormControl>
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    gap: 40px;

    > div {
      flex: 1 1 0;
    }
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .group-title {
    color: var(--brand-highlight);
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid var(--text-color);
    margin-bottom: 20px;
  }
</style>
