<script lang="ts">
  export let name: string = '';
  export let value: string = '';
  export let checked: boolean = false;
  export let label: string = '';

  export let invertOrder = false;
</script>

<label class:inverted={invertOrder}>
  <input type="checkbox" name={name} value={value} checked={checked} on:click on:change />
  <span class="checkbox"></span>

  <span class="label">{label}</span>
</label>

<style lang="scss">
  label {
    position: relative;
    display: flex;
    align-items: center;
    text-align: left;
    gap: 10px;

    &.inverted {
      flex-flow: row-reverse;
    }
  }

  input {
    display: none;
  }

  input + span.checkbox {
    display: inline-flex;
    height: 18px;
    width: 18px;
    margin: 0;
    padding: 0;
    background: transparent;
    border: 2px solid var(--border-color);
    box-sizing: border-box;
    align-items: center;
    justify-content: center;

    &::after {
      content: '';
      z-index: 2;
      display: block;
      height: 6px;
      width: 6px;
      transition: background-color 150ms ease-out;
    }
  }

  input:checked + span.checkbox {
    &::after {
      background-color: var(--text-color);
    }
  }

  .label {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
</style>
