<script setup lang="ts">
import LayoutBox from '~/components/common/LayoutBox.vue'
</script>

<template>
  <div class="wrapper">
    <LayoutBox>
      <div class="brand" href="/">
        <div class="fzf-logo">
          <span class="gt">&gt;&nbsp;</span><span class="highlight">fz</span>f
        </div>
        <div>Theme Playground</div>
      </div>
    </LayoutBox>

    <LayoutBox title="About">Lorem ipsum dolor sit amet</LayoutBox>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--box-gap);
}
.brand {
  color: #e9e9e9;
  display: flex;
  gap: 10px;
  align-items: center;

  .fzf-logo {
    font-family: var(--brand-font-family);
    font-size: 36px;

    display: inline-block;
    padding-right: 20px;

    .gt {
      color: var(--brand-marker);
    }

    .highlight {
      color: var(--brand-highlight);
    }
  }
}
</style>
