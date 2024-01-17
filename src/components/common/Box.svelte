<script lang="ts">
  // @todo: optional flex-direction and stuff
  export let title: string = '';
  export let style: string = '';
  export let contentStyle: string = '';

  export let contentEl: HTMLDivElement | undefined = undefined;
</script>

<div class="box" style={style}>
  {#if title}
    <h2 class="title">{title}</h2>
  {/if}

  <div bind:this={contentEl} class="content" style={contentStyle}><slot /></div>
</div>

<style>
  .box {
    background-color: var(--box-bg-color);
    padding: 15px;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .title {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 0;
  }

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
</style>
