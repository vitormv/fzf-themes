<script lang="ts">
  /** DOM element of the wrapper element */
  export let wrapper: HTMLElement;

  /** indicator of the popup state */
  export let isOpen: boolean;

  /** if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise */
  export let isDialog: boolean;
</script>

<div
  bind:this={wrapper}
  class="wrapper"
  class:is-open={isOpen}
  role={isDialog ? 'dialog' : undefined}
  aria-label="color picker"
>
  <slot />
</div>

<style>
  div {
    padding: 0;
    margin: 0 0 10px;
    display: none;
    width: max-content;
    height: 100%;
  }

  .is-open {
    display: inline-block;
  }

  [role='dialog'] {
    position: absolute;
    top: 30px;
    z-index: var(--picker-z-index, 2);
  }
</style>
