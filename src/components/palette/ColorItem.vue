<script setup lang="ts">
import { getContrastColor } from '~/utils/getConstrastColor'
import { hexColorToRgb } from '~/utils/hexColorToRgb'
import { options } from '~/state/options'
import { FzfColor } from '~/types/fzf'
import { computed } from 'vue'

const props = defineProps<{ token: FzfColor }>()

const toFzfName = (name: string) => {
  return name.replace('-plus', '+')
}

const getColorValue = (color: string) => {
  if (color.startsWith('#')) {
    return color
  }

  const matches = color.match(/var\(--fzf-([a-z-]+)\)/)
  if (matches && matches[1]) {
    return `same as ${toFzfName(matches[1])}`
  }

  return ''
}

const contrastColor = computed(() => getContrastColor(options.colors[props.token]))
const contrastRgb = computed(() =>
  hexColorToRgb(contrastColor.value === 'dark' ? '#dddddd' : '#ffffff'),
)
</script>

<template>
  <div class="wrapper">
    <button
      class="color"
      :class="{ selected: options.selectedColor === token }"
      :style="{
        'backgroundColor': options.colors[token],
        'color': contrastColor === 'dark' ? '#000' : '#fff',
        '--border-color-hover': `rgba(${contrastRgb?.r}, ${contrastRgb?.g}, ${contrastRgb?.b}, .8)`,
      }"
      @click="options.selectedColor = props.token"
    >
      <div class="name">{{ toFzfName(token) }}</div>
      <div class="hex">{{ getColorValue(options.colors[props.token]) }}</div>
    </button>
  </div>
</template>

<style scoped>
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
  &:focus,
  &:hover,
  &:focus {
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

  input {
    width: 0;
    height: 0;
    visibility: hidden;
    pointer-events: none;
    position: absolute;
    bottom: 0;
  }
}
</style>
