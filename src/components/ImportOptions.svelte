<script lang="ts">
  import Modal from '~/components/common/Modal.svelte';
  import { toast } from '@zerodevx/svelte-toast';

  import { ArrowForwardOutline, CodeDownloadOutline } from 'svelte-ionicons';
  import { importFromEnvArgs } from '~/data/import/importFromEnvArgs';

  let textareaEl: HTMLTextAreaElement;
  let isModalOpen = false;

  let errorMessage = '';

  function validateInput(textareaValue: string) {
    if (textareaValue.startsWith('export ') || textareaValue.includes('FZF_DEFAULT_OPTS')) {
      errorMessage =
        'Invalid input. Text should not start with "export" and should not contain "FZF_DEFAULT_OPTS".';
      return false;
    }
    errorMessage = '';
    return true;
  }

  function onClickImport() {
    if (!textareaEl) return;

    const value = textareaEl.value;

    if (validateInput(value)) {
      importFromEnvArgs(value);
      isModalOpen = false;

      textareaEl.value = '';
      toast.push('Imported theme and colors!', {});
    }
  }
</script>

<button
  class="export btn btn-primary"
  on:click={() => (isModalOpen = true)}
  on:change={() => (errorMessage = '')}
>
  Import Options <CodeDownloadOutline size="16" />
</button>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="wrapper" on:mousemove|stopPropagation>
  <Modal bind:showModal={isModalOpen}>
    <h2 slot="header">Import Options</h2>

    <div class="content">
      <p style="flex: 1;">
        Paste the <strong>contents</strong> of your <code>FZF_DEFAULT_OPTS</code> variable.
      </p>

      <textarea
        bind:this={textareaEl}
        placeholder="Paste only the variable contents (inside the quotes)..."
      ></textarea>

      <div class="footer">
        <div class="error" style="word-wrap: break-word; overflow-wrap: break-word;">
          {errorMessage}
        </div>
        <button class="export btn btn-primary" on:click={onClickImport}>
          Import <ArrowForwardOutline size="16" />
        </button>
      </div>
    </div>
  </Modal>
</div>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
  }

  textarea {
    display: block;
    width: 100%;
    height: 100%;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
</style>
