<script setup lang="ts">
import { options } from '~/state/options'

const allTokens = Object.keys(options.colors)
</script>

<template>
  <div class="wrapper">
    <button type="button" class="js-reset-all btn btn-sm btn-outline-secondary">Reset all</button>

    <div class="color-grid">
      <ColorItem v-for="token in allTokens" :key="token" :token="token" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  overflow-y: scroll;
}

button {
  position: absolute;
  top: 15px;
  right: 15px;
}

.color-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 12px;
}

input[data-jscolor] {
  &:placeholder-shown {
    font-style: italic;
    font-size: 12px;
  }

  &::placeholder {
    font-style: italic;
    color: #aaa;
    font-size: 12px;
  }
}
</style>
