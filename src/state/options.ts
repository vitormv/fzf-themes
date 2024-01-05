import { reactive } from 'vue'
import { FzfColor } from '~/types/fzf'

export type Options = {
  selectedColor: FzfColor
  colors: Record<FzfColor, string>
}

export const options = reactive<Options>({
  selectedColor: 'fg',
  colors: {
    'fg': '#d0d0d0',
    'fg-plus': '#d0d0d0',
    'bg': '#121212',
    'bg-plus': '#262626',
    'hl': '#5f87af',
    'hl-plus': '#5fd7ff',
    'info': '#afaf87',
    'marker': '#87ff00',
    'prompt': '#d7005f',
    'spinner': '#af5fff',
    'pointer': '#af5fff',
    'header': '#87afaf',
    'gutter': '#262626',
    'border': '#262626',
    'separator': 'var(--fzf-border)',
  },
})
