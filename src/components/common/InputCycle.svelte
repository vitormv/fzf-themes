<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ChevronBackOutline, ChevronForwardOutline } from 'svelte-ionicons';

  const dispatch = createEventDispatcher();

  export let value: string;
  export let items: string[];
  export let showIndex = false;

  let inputEl: HTMLInputElement;

  $: currentIndex = items.findIndex((item) => item === value) || 0;

  function cycle(increment: 1 | -1) {
    let newIndex = currentIndex + increment;

    if (newIndex >= items.length) {
      newIndex = 0;
    }

    inputEl.focus();
    dispatch('change', items.at(newIndex));
  }
</script>

<span class="input-cycle">
  <input
    bind:this={inputEl}
    type="text"
    readonly
    value={showIndex ? `${currentIndex + 1}. ${value}` : value}
  />
  <span class="prev">
    <ChevronBackOutline size="18" on:click={() => cycle(-1)} />
  </span>
  <span class="next">
    <ChevronForwardOutline size="18" on:click={() => cycle(1)} />
  </span>
</span>

<style lang="scss">
  .input-cycle {
    display: inline-block;
    position: relative;
  }

  .prev,
  .next {
    position: absolute;
    display: inline-flex;
    align-items: center;
    padding: 2px 4px;
    top: 2px;
    bottom: 2px;
    color: var(--text-color);
    cursor: pointer;
    opacity: 0.8;

    &:hover {
      opacity: 1;
      background-color: var(--border-color);
    }
  }

  .prev {
    right: 28px;
  }

  .next {
    right: 2px;
  }
</style>
