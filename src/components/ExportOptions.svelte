<script lang="ts">
  import Modal from '~/components/common/Modal.svelte';
  import { colorsStore } from '~/data/colorsStore';
  import { themeStore } from '~/data/themeStore';
  import { exportThemeToVariable } from '~/utils/exportThemeToVariable';

  $: exportString = exportThemeToVariable($themeStore, $colorsStore);

  let showModal = false;
</script>

<div class="wrapper">
  <button on:click={() => (showModal = true)}> show modal </button>

  <Modal bind:showModal={showModal}>
    <h2 slot="header">Export</h2>

    <textarea readonly>{exportString}</textarea>
  </Modal>
</div>

<style lang="scss">
  textarea {
    width: 100%;
    height: 100%;
    padding: 15px;
  }
</style>
