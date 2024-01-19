<script lang="ts">
  import Box from '~/components/common/Box.svelte';
  import { Heart } from 'svelte-ionicons';
</script>

<div class="wrapper">
  <Box>
    <a class="brand" href={`${import.meta.env.BASE_URL}/`}>
      <div class="fzf-logo">
        <span class="gt">&gt;</span><span class="highlight">fz</span>f
      </div>
      <div style="font-size: 1.5rem; font-weight: bold;">Theme Playground</div>
    </a>
  </Box>

  <Box title="About" style="flex: 1">
    <div>
      Very heavily inspired by <a href="https://terminal.sexy" target="_blank">terminal.sexy</a>
      and
      <a href="https://terminal.love" target="_blank">terminal.love</a>, this offers a quick way to
      preview <strong>*some*</strong> of the many styling options available for fzf.<br />Made with
      <Heart size="16" style="color: red; vertical-align: middle;" />
      by <a href="https://github.com/vitormv" target="_blank">@vitormv</a>.
    </div>
  </Box>
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
    text-decoration: none;

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
