<script lang="ts">
  import createPopperAction from '~/utils/usePopper';

  export let tooltipContent: string;

  const [popperTooltipTrigger, popperTooltipContent] = createPopperAction();
</script>

<div class="wrapper">
  <slot name="input" />

  <div class="icon" use:popperTooltipTrigger>
    <slot name="icon" />
  </div>
</div>

<div class="tooltip" use:popperTooltipContent>
  <div data-popper-arrow></div>

  <!-- eslint-disable svelte/no-at-html-tags -->
  {@html tooltipContent}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    gap: 10px;
    align-items: center;

    :global(> *:not(.icon)) {
      flex: 1;
      width: 0;
    }

    .icon {
      flex: 0;
      display: inline-flex;
      align-items: center;
    }
  }

  $tooltip-size: 16px;
  $tooltip-color: #161616;

  .tooltip {
    padding: 15px;
    font-size: 14px;
    border-radius: 4px;
    box-shadow: 0px 0px 13px 3px rgba(0, 0, 0, 0.7);
    background-color: $tooltip-color;
    color: var(--text-color);
    max-width: 400px;
    z-index: 999;

    :global(code) {
      color: #b0e1bd;
      background-color: var(--box-bg-color);
      padding: 2px 4px;
    }

    [data-popper-arrow],
    [data-popper-arrow]::before {
      position: absolute;
      width: $tooltip-size;
      height: $tooltip-size;
      z-index: -1;
    }

    [data-popper-arrow]::before {
      content: '';
      background: $tooltip-color;
      transform: rotate(45deg);
    }
  }

  :global(.tooltip[data-popper-placement^='bottom'] > [data-popper-arrow]) {
    top: -(calc($tooltip-size / 2));
  }

  :global(.tooltip[data-popper-placement^='top'] > [data-popper-arrow]) {
    bottom: -(calc($tooltip-size / 2));
  }

  :global(.tooltip[data-popper-placement^='left'] > [data-popper-arrow]) {
    right: -(calc($tooltip-size / 2));
  }

  :global(.tooltip[data-popper-placement^='right'] > [data-popper-arrow]) {
    left: -(calc($tooltip-size / 2));
  }
</style>
