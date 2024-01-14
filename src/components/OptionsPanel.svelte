<script lang="ts">
  import FormControl from '~/components/common/FormControl.svelte';
  import { themeStore } from '~/data/themeStore';
  import InputCycle from '~/components/common/InputCycle.svelte';
  import { borderTypes, borderTypesNonNullable, infoTypes, layoutTypes } from '~/fzf/fzfBorders';
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
      <input
        type="text"
        value={$themeStore.borderLabel}
        placeholder="none"
        on:input={(e) => void themeStore.set('borderLabel', e.target?.value)}
      />
    </FormControl>

    <FormControl label="Label Pos">
      <input
        type="number"
        value={$themeStore.borderLabelPosition}
        on:input={(e) =>
          void themeStore.set('borderLabelPosition', Number.parseInt(e.target?.value, 10))}
      />
    </FormControl>

    <FormControl label="Separator">
      <input
        type="text"
        value={$themeStore.separator}
        on:input={(e) => void themeStore.set('separator', e.target?.value)}
      />
    </FormControl>

    <FormControl label="Preview">
      <InputCycle
        items={borderTypesNonNullable}
        value={$themeStore.previewBorderStyle}
        showIndex
        on:change={(e) => {
          themeStore.set('previewBorderStyle', e.detail);
        }}
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
        pattern={'^[0-9]+(,[0-9]+){0,3}$'}
        value={$themeStore.margin}
        on:input={(e) => {
          if (e.target.checkValidity()) {
            themeStore.set('margin', e.target?.value);
          }
        }}
      />
    </FormControl>

    <FormControl label="Padding">
      <input
        type="text"
        pattern={'^[0-9]+(,[0-9]+){0,3}$'}
        value={$themeStore.padding}
        on:input={(e) => {
          if (e.target.checkValidity()) {
            themeStore.set('padding', e.target?.value);
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
      <InputCycle
        items={infoTypes}
        value={$themeStore.info}
        showIndex
        on:change={(e) => {
          themeStore.set('info', e.detail);
        }}
      />
    </FormControl>
  </div>
</div>

<style lang="scss">
  @media (min-width: $tablet-breakpoint) {
    .wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      > div {
        max-width: 50%;
        flex: 1 0 0;
      }
    }
  }

  @media (min-width: $desktop-breakpoint) {
    .wrapper {
      display: flex;
      gap: 20px;

      > div {
        flex: 1 1 0;
      }
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
