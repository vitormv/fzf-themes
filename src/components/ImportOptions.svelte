<script lang="ts">
  import Modal from '~/components/common/Modal.svelte';
  import { toast } from '@zerodevx/svelte-toast';

  import { ArrowForwardOutline } from 'svelte-ionicons';
  import { importFromEnvArgs } from '~/data/import/importFromEnvArgs';

  export let isModalOpen = false;

  $: textareaValue = '';

  let errorMessage = '';

  function validateInput() {
    if (textareaValue.startsWith('export ') || textareaValue.includes('FZF_DEFAULT_OPTS')) {
      errorMessage =
        'Invalid input. Text should not start with "export" and should not contain "FZF_DEFAULT_OPTS".';
      return false;
    }
    errorMessage = '';
    return true;
  }

  function isDisabled(textareaValue: string) {
    return !textareaValue?.trim() || !!errorMessage;
  }

  function onClickImport() {
    if (validateInput()) {
      importFromEnvArgs(textareaValue);
      isModalOpen = false;

      textareaValue = '';
      toast.push('Imported theme and colors!', {});
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="wrapper" on:mousemove|stopPropagation>
  <Modal bind:showModal={isModalOpen}>
    <h2 slot="header">Import Options</h2>

    <div class="content">
      <p style="flex: 1;">
        Paste the <strong>contents</strong> of your <code>FZF_DEFAULT_OPTS</code> variable.
      </p>

      <textarea
        bind:value={textareaValue}
        on:input={validateInput}
        placeholder="Paste only the variable contents (inside the quotes)..."
      ></textarea>

      <div class="footer">
        <div class="error" style="word-wrap: break-word; overflow-wrap: break-word;">
          {errorMessage}
        </div>
        <button
          class="export btn btn-secondary"
          on:click={onClickImport}
          disabled={isDisabled(textareaValue)}
        >
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
    align-items: flex-start;
    gap: 20px;
  }
</style>
