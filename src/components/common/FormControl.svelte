<script lang="ts">
  export let label: string;
</script>

<label class="control">
  <span class="label">{label}</span>
  <slot />
</label>

<style lang="scss">
  .control {
    display: flex;
    gap: 10px;
  }

  .control .label {
    display: block;
    flex: 0 0 78px;
    text-align: right;
    margin-right: 10px;
    line-height: 21px;
    padding: 5px 0;
  }

  :global(.control > *:not(.label)) {
    flex: 1;
    width: 100%;
  }
</style>
