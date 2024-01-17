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

  function onKeyPressHandler(e: KeyboardEvent) {
    if (e.key == 'ArrowDown' || e.key === 'ArrowRight') {
      cycle(1);
    }
    if (e.key == 'ArrowUp' || e.key === 'ArrowLeft') {
      cycle(-1);
    }
  }
</script>

<span class="input-cycle">
  <input
    bind:this={inputEl}
    on:keydown={onKeyPressHandler}
    type="text"
    readonly
    value={showIndex ? `${currentIndex + 1}. ${value}` : value}
  />
  <button type="button" class="prev" on:click={() => cycle(-1)}>
    <ChevronBackOutline size="18" />
  </button>
  <button type="button" class="next" on:click={() => cycle(1)}>
    <ChevronForwardOutline size="18" />
  </button>
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
    background-color: transparent;
    border: 0;

    &:hover {
      opacity: 1;
      background-color: var(--border-dark-color);
    }

    &:active {
      transform: translateY(1px);
    }
  }

  input {
    display: block;
    width: 100%;
    padding-right: 50px;
  }

  .prev {
    right: 28px;
  }

  .next {
    right: 2px;
  }
</style>
