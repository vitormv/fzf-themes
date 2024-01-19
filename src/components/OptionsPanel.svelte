<script lang="ts">
  import FormControl from '~/components/common/FormControl.svelte';
  import { optionsStore } from '~/data/options.store';
  import InputCycle from '~/components/common/InputCycle.svelte';
  import { borderTypes, borderTypesNonNullable, infoTypes, layoutTypes } from '~/fzf/fzfBorders';
  import { InformationCircleOutline } from 'svelte-ionicons';
  import { html as marginHelp } from '~/data/help/margin.md';
  import { html as paddingHelp } from '~/data/help/padding.md';
  import { html as borderLabelPositionHelp } from '~/data/help/borderLabelPosition.md';
  import InputWithHelp from '~/components/common/InputWithHelp.svelte';

  $: hasBorder = $optionsStore.borderStyle !== 'none';
  $: hasBorderLabel = $optionsStore.borderLabel;
</script>

<div class="wrapper">
  <div class="group">
    <div class="group-title">Border</div>

    <FormControl label="Border">
      <InputCycle
        items={borderTypes}
        value={$optionsStore.borderStyle}
        showIndex
        on:change={(e) => {
          optionsStore.set('borderStyle', e.detail);
        }}
      />
    </FormControl>

    <FormControl label="B. Label" disabled={!hasBorder}>
      <input
        type="text"
        value={$optionsStore.borderLabel}
        disabled={!hasBorder}
        placeholder="none"
        on:input={(e) => void optionsStore.set('borderLabel', e.currentTarget.value)}
      />
    </FormControl>

    <FormControl label="Label Pos" disabled={!hasBorder || !hasBorderLabel}>
      <InputWithHelp tooltipContent={borderLabelPositionHelp}>
        <input
          slot="input"
          type="number"
          disabled={!hasBorder || !hasBorderLabel}
          value={$optionsStore.borderLabelPosition}
          on:input={(e) =>
            void optionsStore.set(
              'borderLabelPosition',
              Number.parseInt(e.currentTarget.value, 10),
            )}
        />
        <InformationCircleOutline size="24" slot="icon" />
      </InputWithHelp>
    </FormControl>

    <FormControl label="Separator">
      <input
        type="text"
        value={$optionsStore.separator}
        on:input={(e) => void optionsStore.set('separator', e.currentTarget.value)}
      />
    </FormControl>

    <FormControl label="Preview">
      <InputCycle
        items={borderTypesNonNullable}
        value={$optionsStore.previewBorderStyle}
        showIndex
        on:change={(e) => {
          optionsStore.set('previewBorderStyle', e.detail);
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
        value={$optionsStore.layout}
        on:change={(e) => {
          optionsStore.set('layout', e.detail);
        }}
      />
    </FormControl>

    <FormControl label="Margin">
      <InputWithHelp tooltipContent={marginHelp}>
        <input
          slot="input"
          type="text"
          pattern={'^[0-9]+(,[0-9]+){0,3}$'}
          style="flex: 1; width: 0;"
          value={$optionsStore.margin}
          on:input={(e) => {
            if (e.currentTarget.checkValidity()) {
              optionsStore.set('margin', e.currentTarget.value);
            }
          }}
        />
        <InformationCircleOutline size="24" slot="icon" />
      </InputWithHelp>
    </FormControl>

    <FormControl label="Padding">
      <InputWithHelp tooltipContent={paddingHelp}>
        <input
          slot="input"
          type="text"
          pattern={'^[0-9]+(,[0-9]+){0,3}$'}
          value={$optionsStore.padding}
          on:input={(e) => {
            if (e.currentTarget.checkValidity()) {
              optionsStore.set('padding', e.currentTarget.value);
            }
          }}
        />
        <InformationCircleOutline size="24" slot="icon" />
      </InputWithHelp>
    </FormControl>

    <FormControl label="Scrollbar">
      <input
        type="text"
        maxlength="1"
        value={$optionsStore.scrollbar}
        on:input={(e) => void optionsStore.set('scrollbar', e.currentTarget.value)}
      />
    </FormControl>
  </div>

  <div class="group">
    <div class="group-title">Indicators</div>

    <FormControl label="Prompt">
      <input
        type="text"
        value={$optionsStore.prompt}
        on:input={(e) => void optionsStore.set('prompt', e.currentTarget.value)}
      />
    </FormControl>

    <FormControl label="Pointer">
      <input
        type="text"
        maxlength="2"
        value={$optionsStore.pointer}
        on:input={(e) => void optionsStore.set('pointer', e.currentTarget.value)}
      />
    </FormControl>

    <FormControl label="Marker">
      <input
        type="text"
        maxlength="2"
        value={$optionsStore.marker}
        on:input={(e) => void optionsStore.set('marker', e.currentTarget.value)}
      />
    </FormControl>

    <FormControl label="Info">
      <InputCycle
        items={infoTypes}
        value={$optionsStore.info}
        showIndex
        on:change={(e) => {
          optionsStore.set('info', e.detail);
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
