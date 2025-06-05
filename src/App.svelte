<script>
  import LandingPage from './lib/pages/LandingPage.svelte';
</script>

<main>
  <LandingPage />
</main>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #EFEFEF;
  }
  
  :global(body) {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  :global(*) {
    box-sizing: border-box;
  }
  
  :global(#app) {
    width: 100%;
    height: 100vh;
  }
</style>
