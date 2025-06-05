<script>
  import {onMount} from 'svelte';
  import Router from 'svelte-spa-router';
  import {authStore} from './stores/auth.store';
  import routes from './routes/router';
  import './app.global.css';

  // Initialize auth store
    onMount(() => {
        authStore.init();
    });
</script>

<Router {routes}/>