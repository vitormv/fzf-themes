<script lang="ts">
  import Modal from '~/components/common/Modal.svelte';
  import { colorsStore } from '~/data/colorsStore';
  import { themeStore } from '~/data/themeStore';
  import { exportThemeToEnvVariable } from '~/utils/exportThemeToEnvVariable';
  import { ChevronForwardOutline } from 'svelte-ionicons';

  $: exportString = exportThemeToEnvVariable($themeStore, $colorsStore);

  let showModal = false;
</script>

<button class="btn btn-primary" on:click={() => (showModal = true)}
  >Export <ChevronForwardOutline size="16" /></button
>

<div class="wrapper">
  <Modal bind:showModal={showModal}>
    <h2 slot="header">Export</h2>

    <textarea readonly>{exportString}</textarea>
  </Modal>
</div>

<style lang="scss">
  .btn.btn-primary {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  textarea {
    width: 100%;
    height: 100%;
    padding: 15px;
  }
</style>
