<template>
  <div>
    <div id="container-color-picker"></div>
  </div>
</template>

<script setup lang="ts" allowJs>
import Picker from 'vanilla-picker'
import { onMounted, watchEffect } from 'vue'
import { options } from '~/state/options'

let picker: Picker

onMounted(() => {
  const parent = document.querySelector('#container-color-picker') as HTMLElement

  picker = new Picker({
    parent: parent,
    popup: false,
    alpha: false,
    layout: 'default',
    onChange: (color) => {
      options.colors[options.selectedColor] = color.hex.substring(0, 7)
    },
  })
})

watchEffect(() => {
  options.selectedColor // @todo investigate why this is needed for ref unwrapping

  picker?.setOptions({ color: options.colors[options.selectedColor] })
})

/* onDone is similar to onChange, but only called when you click 'Ok' */
</script>

<style scoped>
.picker-wrapper {
  width: 600px;
  height: 300px;
}
</style>

<style>
.layout_default.picker_wrapper {
  background-color: transparent;
  box-shadow: none;
  border: 0;
  padding: 0 !important;
}
</style>
