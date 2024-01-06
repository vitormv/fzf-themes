import AppIndex from './components/Index.svelte';

import './styles/main.css';

const app = new AppIndex({
  target: document.getElementById('app') as HTMLElement,
});

export default app;
