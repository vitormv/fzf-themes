<script lang="ts">
  import { hexColorToRgb } from '~/utils/hexColorToRgb';
  import type { FzfColor } from '~/types/fzf';
  import { getContrastColor } from '~/utils/getContrastColor';
  import { getColorOrFallback, colorsStore } from '~/data/colorsStore';
  import { colorDefinitions } from '~/data/fzfDefinitions';
  import { toFzfColorName } from '~/utils/toFzfColorName';
  import { beforeUpdate } from 'svelte';

  export let token: FzfColor;

  let wrapperEl: HTMLDivElement;

  const getColorLabel = (color: string) => {
    if (color.startsWith('#')) {
      return color;
    }

    if (!color && colorDefinitions[token].inherits) {
      return 'inherit';
    }

    return '---';
  };

  beforeUpdate(() => {
    if ($colorsStore.selectedColor === token && wrapperEl) {
      wrapperEl.scrollIntoView({ behavior: 'smooth' });
    }
  });

  $: color = getColorOrFallback(token, $colorsStore.colors).value;
  $: contrastColor = getContrastColor(color);
  $: borderColor = hexColorToRgb(contrastColor === 'dark' ? '#dddddd' : '#ffffff');
</script>

<div class="wrapper" bind:this={wrapperEl}>
  <button
    type="button"
    class="color"
    class:selected={$colorsStore.selectedColor === token}
    style:color={contrastColor === 'dark' ? '#000' : '#fff'}
    style:background-color={color}
    style:--border-color-hover={`rgba(${borderColor?.r}, ${borderColor?.g}, ${borderColor?.b}, .8)`}
    on:click={void colorsStore.setSelected(token)}
  >
    <div class="name"><span>{toFzfColorName(token)}</span></div>
    <div class="hex">{getColorLabel($colorsStore.colors[token])}</div>
  </button>
</div>

<style lang="scss">
  .wrapper {
    padding: 3px;
  }

  .color {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    height: 70px;
    position: relative;
    justify-content: space-between;
    align-items: center;
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
      flex: 1;
      display: flex;
      align-items: center;
    }

    .hex {
      font-size: 1rem;
      flex: 0;
      opacity: 0.7;
    }
  }
</style>
