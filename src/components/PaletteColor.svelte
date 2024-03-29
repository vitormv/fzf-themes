<script lang="ts">
  import { getColorOrFallback, colorsStore } from '~/data/colors.store';
  import { colorDefinitions } from '~/fzf/fzfColorDefinitions';
  import { toFzfColorName } from '~/utils/colors/toFzfColorName';
  import { beforeUpdate } from 'svelte';
  import { getContrastColor } from '~/utils/colors/getContrastColor';
  import { hexColorToRgb } from '~/utils/colors/hexColorToRgb';
  import type { ColorName } from '~/data/colors.schema';

  export let token: ColorName;

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
    const isDesktop = document.body.getBoundingClientRect().width >= 1200;

    if (isDesktop && $colorsStore.selectedColor === token && wrapperEl) {
      wrapperEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  $: color = getColorOrFallback(token, $colorsStore.colors).value || 'transparent';
  $: contrastColor = getContrastColor(color);
  $: borderColor = hexColorToRgb(contrastColor === 'dark' ? '#dddddd' : '#ffffff');
</script>

<div class="wrapper" bind:this={wrapperEl}>
  <button
    type="button"
    class="color"
    class:selected={$colorsStore.selectedColor === token}
    class:unset={!getColorOrFallback(token, $colorsStore.colors).value}
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
    padding: 8px 4px 12px;
    border-radius: 0;
    border: 0;
    transition: none;
    outline: 3px solid transparent;
    outline-offset: -3px;
    overflow: hidden;

    &:active {
      transform: scale(0.98);
    }

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 10px;
      opacity: 0;
      transform: translateY(100%);
    }

    &.selected,
    &:hover {
      outline: 3px solid var(--border-color-hover);
      border: 0;
    }

    &.selected::before {
      opacity: 0.2;
      transform: translateY(0);
      background-color: currentColor;
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

    &.unset {
      border: 2px dashed var(--bg-color);
    }
  }
</style>
