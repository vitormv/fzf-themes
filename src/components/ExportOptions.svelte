<script lang="ts">
  import Modal from '~/components/common/Modal.svelte';
  import { colorsStore } from '~/data/color.store';
  import { themeStore } from '~/data/theme.store';
  import { exportThemeToEnvVariable, exportToUrlHash } from '~/utils/exportThemeToEnvVariable';
  import { ChevronForwardOutline, ClipboardOutline } from 'svelte-ionicons';

  let exportEnvString = '';
  let exportPermalink = '';

  let urlEl: HTMLInputElement;
  let isModalOpen = false;

  $: if (isModalOpen) {
    exportEnvString = exportThemeToEnvVariable($themeStore, $colorsStore.colors);
    exportPermalink = exportToUrlHash($themeStore, $colorsStore.colors);
  }

  function onCopyUrl() {
    if (!urlEl) return;

    urlEl.select();
    navigator.clipboard.writeText(urlEl.value);
  }
</script>

<button class="export btn btn-primary" on:click={() => (isModalOpen = true)}>
  Export <ChevronForwardOutline size="16" />
</button>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="wrapper" on:mousemove|stopPropagation>
  <Modal bind:showModal={isModalOpen}>
    <h2 slot="header">Export & Share</h2>

    <div class="content">
      <div class="row-url-export">
        <h3>Permalink</h3>
        <div style="flex: 1;">
          <input
            type="text"
            bind:this={urlEl}
            readonly
            style="display: inline-block; width: 100%;"
            value={exportPermalink}
          />
        </div>
        <button type="button" class="copy-url btn btn-primary" on:click={onCopyUrl}>
          <ClipboardOutline size="16" />
        </button>
      </div>

      <h3>Variable Export</h3>
      <textarea readonly>{exportEnvString}</textarea>
    </div>
  </Modal>
</div>

<style lang="scss">
  h3 {
    margin: 0;
  }
  .export {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
  }

  .row-url-export {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 15px;
  }

  .copy-url {
    background-color: var(--color-primary);
    border: 0;
    flex: 0 0 auto;
    align-self: stretch;
  }

  textarea {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
