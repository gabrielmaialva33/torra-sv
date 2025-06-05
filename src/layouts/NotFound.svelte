<script>
  import { push } from 'svelte-spa-router';
  import { Package } from 'lucide-svelte';
  
  function goHome() {
    push('/');
  }
</script>

<div class="min-h-screen bg-torra-gray-150 flex items-center justify-center px-4">
  <div class="text-center">
    <div class="inline-block p-6 bg-torra-orange/10 rounded-full mb-6">
      <Package class="w-16 h-16 text-torra-orange" />
    </div>
    
    <h1 class="text-6xl font-bold text-torra-dark mb-4">404</h1>
    
    <p class="text-xl text-torra-gray-600 mb-8">
      Oops! Página não encontrada
    </p>
    
    <p class="text-torra-gray-500 mb-8 max-w-md mx-auto">
      A página que você está procurando não existe ou foi movida.
    </p>
    
    <button
      on:click={goHome}
      class="px-6 py-3 bg-torra-orange text-white rounded-lg hover:bg-torra-orange-light 
             transition-colors duration-200 font-medium"
    >
      Voltar ao Início
    </button>
  </div>
</div>