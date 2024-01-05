<script lang="ts">
  import { hexColorToRgb } from '~/utils/hexColorToRgb';
  import type { FzfColor } from '~/types/fzf';
  import { getContrastColor } from '~/utils/getConstrastColor';
  import { settingsStore } from '~/state/settingsContext';

  export let token: FzfColor;

  const toFzfName = (name: string) => {
    return name.replace('-plus', '+');
  };

  const getColorValue = (color: string) => {
    if (color.startsWith('#')) {
      return color;
    }

    const matches = color.match(/var\(--fzf-([a-z-]+)\)/);
    if (matches && matches[1]) {
      // return `same as ${toFzfName(matches[1])}`;
      return `---`;
    }

    return '';
  };

  $: contrastColor = getContrastColor($settingsStore.colors[token]);
  $: borderColor = hexColorToRgb(contrastColor === 'dark' ? '#dddddd' : '#ffffff');
</script>

<div class="wrapper">
  <button
    type="button"
    class="color"
    class:selected={$settingsStore.selectedColor === token}
    style:color={contrastColor === 'dark' ? '#000' : '#fff'}
    style:background-color={$settingsStore.colors[token]}
    style:--border-color-hover={`rgba(${borderColor?.r}, ${borderColor?.g}, ${borderColor?.b}, .8)`}
    on:click={void settingsStore.setSelected(token)}
  >
    <div class="name">{toFzfName(token)}</div>
    <div class="hex">{getColorValue($settingsStore.colors[token])}</div>
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
    padding: 10px 6px 6px;
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
      font-size: 20px;
      font-weight: bold;
      opacity: 0.7;
    }

    .hex {
      font-size: 1rem;
      opacity: 0.7;
    }
  }
</style>
