<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="box">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <div class="content"><slot></slot></div>
  </div>
</template>

<style scoped>
.box {
  background-color: var(--box-bg-color);
  padding: 15px;
  position: relative;
}

.title {
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
