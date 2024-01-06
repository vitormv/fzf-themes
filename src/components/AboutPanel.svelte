<script lang="ts">
  import LayoutBox from '~/components/common/LayoutBox.svelte';
  import heartSvg from '~/assets/heart-outline.svg';
</script>

<div class="wrapper">
  <LayoutBox>
    <div class="brand">
      <div class="fzf-logo">
        <span class="gt">&gt;&nbsp;</span>
        <span class="highlight">fz</span>
        f
      </div>
      <div>Theme Playground</div>
    </div>
  </LayoutBox>

  <LayoutBox title="About" style="flex: 1">
    <div>
      Heavily inspired by <a href="https://terminal.sexy" target="_blank">terminal.sexy</a>, and
      uses the awesome hsluv and lolight libraries to generate pretty terminal color schemes. Made
      with
      <img src={heartSvg} height="20px" alt="heart icon" style="color: red;" />
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
