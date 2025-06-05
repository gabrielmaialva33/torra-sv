<script>
  import {onMount} from 'svelte';
  import Router from 'svelte-spa-router';
  import {authStore} from './stores/auth.store';
  import routes from './routes/router';

  // Initialize auth store
    onMount(() => {
        authStore.init();
    });
</script>

<Router {routes}/>

<style>
    :global(html, body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }

    :global(body) {
        font-family: 'Inter', 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    :global(*) {
        box-sizing: border-box;
    }

    /* Custom scrollbar */
    :global(::-webkit-scrollbar) {
        width: 8px;
        height: 8px;
    }

    :global(::-webkit-scrollbar-track) {
        background: #f1f1f1;
    }

    :global(::-webkit-scrollbar-thumb) {
        background: #FF5101;
        border-radius: 4px;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background: #FF7B3D;
    }
</style>