<script>
  import LandingPage from './lib/pages/LandingPage.svelte';
</script>

<LandingPage />

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: auto;
  }
  
  :global(body) {
    font-family: 'Inter', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  :global(*) {
    box-sizing: border-box;
  }
</style>
