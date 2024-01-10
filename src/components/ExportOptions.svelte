<script lang="ts">
  import { colorsStore } from '~/data/colorsStore';
  import { themeStore } from '~/data/themeStore';
  import { exportThemeToVariable } from '~/utils/exportThemeToVariable';

  $: exportString = exportThemeToVariable($themeStore, $colorsStore);
</script>

<div class="wrapper">
  <textarea>{exportString}</textarea>
</div>

<style lang="scss">
  .wrapper {
    height: 100%;
  }

  textarea {
    width: 100%;
    height: 100%;
  }
</style>
