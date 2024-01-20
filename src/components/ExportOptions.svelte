<script lang="ts">
  import Modal from '~/components/common/Modal.svelte';
  import { colorsStore, initialColors } from '~/data/colors.store';
  import { optionsStore } from '~/data/options.store';
  import { ChevronForwardOutline, ClipboardOutline } from 'svelte-ionicons';
  import { exportToEnvVariable } from '~/data/export/exportToEnvVariable';
  import { exportToUrlHash } from '~/data/export/exportToUrlHash';
  import Checkbox from '~/components/common/Checkbox.svelte';

  let exportEnvString = '';
  let exportPermalink = '';

  let permalinkInputEl: HTMLInputElement;
  let isModalOpen = false;

  let exportColorsOnly = false;

  $: if (isModalOpen) {
    exportEnvString = exportToEnvVariable($optionsStore, $colorsStore.colors, exportColorsOnly);
    exportPermalink = exportToUrlHash($optionsStore, $colorsStore.colors, exportColorsOnly);
  }

  function onCopyUrl() {
    if (!permalinkInputEl) return;

    permalinkInputEl.select();
    navigator.clipboard.writeText(permalinkInputEl.value);
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
      <div class="row-url-export" style="justify-content: space-between;">
        <Checkbox
          checked={exportColorsOnly}
          label="Colors only?"
          on:change={(e) => {
            exportColorsOnly = e.currentTarget?.checked;
          }}
        />
        <Checkbox
          checked={!$colorsStore.colors.bg}
          label="Use terminal bg"
          on:change={(e) => {
            const isChecked = e.currentTarget?.checked;
            colorsStore.updateColor('bg', isChecked ? '' : initialColors.bg);
          }}
        />
        <Checkbox
          checked={!$colorsStore.colors.fg}
          label="Use terminal fg"
          on:change={(e) => {
            const isChecked = e.currentTarget?.checked;
            colorsStore.updateColor('fg', isChecked ? '' : initialColors.fg);
          }}
        />
      </div>
      <div class="row-url-export">
        <h3>Permalink</h3>
        <div style="flex: 1;">
          <input
            type="text"
            bind:this={permalinkInputEl}
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
