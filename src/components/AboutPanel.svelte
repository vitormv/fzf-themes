<script lang="ts">
  import LayoutBox from '~/components/common/LayoutBox.svelte';
  import { Heart } from 'svelte-ionicons';
</script>

<div class="wrapper">
  <LayoutBox>
    <div class="brand">
      <div class="fzf-logo">
        <span class="gt">&gt;&nbsp;</span>
        <span class="highlight">fz</span>f
      </div>
      <div style="font-size: 1.5rem; font-weight: bold;">Theme Playground</div>
    </div>
  </LayoutBox>

  <LayoutBox title="About" style="flex: 1">
    <div>
      Very heavily inspired by <a href="https://terminal.sexy" target="_blank">terminal.sexy</a>
      and
      <a href="https://terminal.love" target="_blank">terminal.love</a>, this offers a quick way to
      preview <strong>*some*</strong> of the many styling options available for fzf.<br />Made with
      <Heart size="16" style="color: red; vertical-align: middle;" />
      by <a href="https://github.com/vitormv" target="_blank">@vitormv</a>.
    </div>
  </LayoutBox>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
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
