<script lang="ts">
  export let label: string;
  export let disabled = false;
</script>

<label class="control" class:disabled={disabled}>
  <span class="label">{label}</span>
  <slot />
</label>

<style lang="scss">
  .control {
    display: flex;
    gap: 10px;

    &.disabled {
      cursor: not-allowed;

      :global(input) {
        opacity: 0.3;
      }
      .label {
        opacity: 0.3;

        text-decoration: line-through;
      }
    }
  }

  .control .label {
    display: block;
    flex: 0 0 78px;
    text-align: right;
    line-height: 21px;
    padding: 5px 0;
  }

  :global(.control > *:not(.label)) {
    flex: 1;
    width: 100%;
  }
</style>
