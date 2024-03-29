<script lang="ts">
  import { Close } from 'svelte-ionicons';
  export let showModal: boolean;

  let dialog: HTMLDialogElement;

  $: if (dialog && showModal) dialog.showModal();

  $: if (dialog && !showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="wrapper" on:click|stopPropagation on:mousedown|stopPropagation>
    <div class="header-row">
      <slot name="header" />
      <button on:click={() => dialog.close()}>
        <Close size="32" style="vertical-align: middle;" /></button
      >
    </div>

    <div class="content">
      <slot />
    </div>
  </div>
</dialog>

<style lang="scss">
  dialog {
    border: none;
    padding: 0;
    box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.5);
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: modal-appear 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  dialog[open]::backdrop {
    animation: fade 200ms ease-out;
  }

  .wrapper {
    width: 700px;
    min-height: 500px;
    background-color: var(--bg-color);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
  }

  .header-row {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: space-between;
    background-color: var(--box-bg-color);
    padding: 15px;
    margin-bottom: var(--box-gap);

    button {
      background-color: transparent;
      color: var(--text-color);
      border: 0;
      cursor: pointer;

      &:hover {
        background-color: var(--bg-color);
      }
    }

    :global(h2) {
      padding: 0;
      margin: 0;
    }
  }

  .content {
    flex: 1 1 0;
    background-color: var(--box-bg-color);
    padding: 15px;
    height: 100%;
  }
</style>
