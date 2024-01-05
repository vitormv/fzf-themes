<script lang="ts">
  export let title: string = '';
</script>

<div class="box">
  {#if title}
    <h2 class="title">{title}</h2>
  {/if}

  <div class="content"><slot /></div>
</div>

<style>
  .box {
    background-color: var(--box-bg-color);
    padding: 15px;
    position: relative;
  }

  .title {
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
