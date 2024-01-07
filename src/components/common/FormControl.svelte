<script lang="ts">
  export let label: string;
</script>

<label class="control">
  <span class="label">{label}</span>
  <slot />
</label>

<style lang="scss">
  .control {
    display: inline-flex;
    gap: 10px;
  }

  .control .label {
    display: block;
    text-align: right;
    margin-right: 10px;
    line-height: 21px;
    padding: 5px 0;
    width: 120px;
  }
</style>
