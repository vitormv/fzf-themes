<script lang="ts">
  // @todo: optional flex-direction and stuff
  export let title: string = '';
  export let style: string = '';
  export let contentStyle: string = '';

  export let contentEl: HTMLDivElement | undefined = undefined;

  const hasButtons = !!$$slots.buttons;
</script>

<div class="box" style={style}>
  {#if hasButtons || title}
    <div class="header">
      {#if title}
        <h2 class="title">{title}</h2>
      {/if}

      {#if hasButtons}
        <div class="buttons">
          <slot name="buttons" />
        </div>
      {/if}
    </div>
  {/if}

  <div bind:this={contentEl} class="content" style={contentStyle}><slot /></div>
</div>

<style lang="scss">
  .box {
    background-color: var(--box-bg-color);
    padding: 15px;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    gap: 15px;

    .buttons {
      display: flex;
      gap: 15px;
    }
  }

  .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0;
  }

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
</style>
