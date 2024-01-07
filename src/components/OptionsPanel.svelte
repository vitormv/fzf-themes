<script lang="ts">
  import FormControl from '~/components/common/FormControl.svelte';
  import { borderTypes, layoutTypes } from '~/data/fzfBorders';
  import { themeStore } from '~/data/themeStore';
  import InputCycle from '~/components/common/InputCycle.svelte';
  import { boxCoordinatesToString, stringToBoxCoordinates } from '~/utils/boxCoordinates';
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
      <input
        type="text"
        value={$themeStore.separator}
        on:input={(e) => void themeStore.set('separator', e.target?.value)}
      />
    </FormControl>
  </div>

  <div class="group">
    <div class="group-title">Box</div>

    <FormControl label="Layout">
      <InputCycle
        showIndex
        items={layoutTypes}
        value={$themeStore.layout}
        on:change={(e) => {
          themeStore.set('layout', e.detail);
        }}
      />
    </FormControl>

    <FormControl label="Margin">
      <input
        type="text"
        pattern={'^[0-9](,[0-9]){0,3}$'}
        value={boxCoordinatesToString($themeStore.margin)}
        on:input={(e) => {
          const coords = stringToBoxCoordinates(e.target?.value);

          if (coords) {
            themeStore.set('margin', coords);
          }
        }}
      />
    </FormControl>

    <FormControl label="Padding">
      <input
        type="text"
        pattern={'^[0-9](,[0-9]){0,3}$'}
        value={boxCoordinatesToString($themeStore.padding)}
        on:input={(e) => {
          const coords = stringToBoxCoordinates(e.target?.value);

          if (coords) {
            themeStore.set('padding', coords);
          }
        }}
      />
    </FormControl>

    <FormControl label="Scrollbar">
      <input
        type="text"
        maxlength="2"
        value={$themeStore.scrollbar}
        on:input={(e) => void themeStore.set('scrollbar', e.target?.value)}
      />
    </FormControl>
  </div>

  <div class="group">
    <div class="group-title">Indicators</div>

    <FormControl label="Prompt">
      <input
        type="text"
        value={$themeStore.prompt}
        on:input={(e) => void themeStore.set('prompt', e.target?.value)}
      />
    </FormControl>

    <FormControl label="Pointer">
      <input
        type="text"
        maxlength="2"
        value={$themeStore.pointer}
        on:input={(e) => void themeStore.set('pointer', e.target?.value)}
      />
    </FormControl>

    <FormControl label="Marker">
      <input
        type="text"
        maxlength="2"
        value={$themeStore.marker}
        on:input={(e) => void themeStore.set('marker', e.target?.value)}
      />
    </FormControl>

    <FormControl label="Info">
      <input type="text" />
    </FormControl>
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    gap: 20px;

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
