<script lang="ts">
  import { hexColorToRgb } from '~/utils/hexColorToRgb';
  import type { FzfColor } from '~/types/fzf';
  import { getContrastColor } from '~/utils/getContrastColor';
  import { getColorOrFallback, settingsStore } from '~/data/settingsStore';
  import { isNil } from '~/utils/isNil';
  import { colorDefinitions } from '~/data/fzfDefinitions';

  export let token: FzfColor;

  const toFzfName = (name: string) => {
    return name.replace('-plus', '+');
  };

  const getColorLabel = (color: string) => {
    if (color.startsWith('#')) {
      return color;
    }

    if (!color && colorDefinitions[token].inherits) {
      return 'inherit';
    }

    return '---';
  };

  $: color = getColorOrFallback(token, $settingsStore.colors);
  $: contrastColor = getContrastColor(color);
  $: borderColor = hexColorToRgb(contrastColor === 'dark' ? '#dddddd' : '#ffffff');
</script>

<div class="wrapper">
  <button
    type="button"
    class="color"
    class:selected={$settingsStore.selectedColor === token}
    style:color={contrastColor === 'dark' ? '#000' : '#fff'}
    style:background-color={color}
    style:--border-color-hover={`rgba(${borderColor?.r}, ${borderColor?.g}, ${borderColor?.b}, .8)`}
    on:click={void settingsStore.setSelected(token)}
  >
    <div class="name">{toFzfName(token)}</div>
    <div class="hex">{getColorLabel($settingsStore.colors[token])}</div>
  </button>
</div>

<style lang="scss">
  .wrapper {
    padding: 3px;
  }

  .color {
    display: flex;
    text-align: center;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    /* height: 80px; */
    position: relative;
    justify-content: space-between;
    cursor: pointer;
    padding: 8px 4px 4px;
    border-radius: 0;
    border: 0;
    transition: none;

    outline: 3px solid transparent;

    &.selected,
    &:hover {
      outline: 3px solid var(--border-color-hover);
      border: 0;
    }

    .name {
      font-size: 16px;
      text-transform: uppercase;
      font-weight: bold;
      opacity: 0.7;
    }

    .hex {
      font-size: 1rem;
      opacity: 0.7;
    }
  }
</style>
