import Home from './components/Home.svelte';

import './styles/main.css';

const app = new Home({
  target: document.getElementById('app') as HTMLElement,
});

export default app;
