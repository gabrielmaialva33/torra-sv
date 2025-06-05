<script>
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { User, Lock } from 'lucide-svelte';
  import Button from './Button.svelte';
  
  let username = '';
  let password = '';
  let isSubmitting = false;
  
  // Animation state for interactive elements
  let linkHovered = false;
  
  /**
   * Handles the login form submission
   * This is a placeholder for actual authentication logic
   */
  async function handleSubmit() {
    isSubmitting = true;
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', { username, password });
      isSubmitting = false;
    }, 1500);
  }
</script>

<div class="min-h-screen bg-[#EFEFEF] flex flex-col">
  <!-- Main Content Area -->
  <div class="flex-1 flex items-center justify-center p-4">
    <div class="w-full max-w-[1180px] h-[560px] flex rounded-lg overflow-hidden shadow-xl">
      <!-- Left Panel - Login Form -->
      <div 
        class="w-full md:w-[476px] bg-white p-8 flex flex-col justify-center relative"
        in:fly={{ x: -50, duration: 800, delay: 200, easing: quintOut }}
      >
        <!-- Logo -->
        <div class="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div class="w-28 h-20 bg-torra-orange rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">TORRA</span>
          </div>
        </div>
        
        <!-- Form Container -->
        <div class="mt-16">
          <!-- Title -->
          <h1 class="text-[32px] font-roboto font-medium text-torra-dark text-center mb-10">
            Entrar no Painel
          </h1>
          
          <!-- Login Form -->
          <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <!-- Username Field -->
            <div class="flex rounded-lg overflow-hidden border border-torra-gray-300 transition-all duration-200 hover:border-torra-orange-light">
              <div class="bg-torra-gray-100 px-3 py-3 border-r border-torra-gray-300">
                <User class="w-4 h-4 text-torra-gray-600" />
              </div>
              <input
                type="text"
                bind:value={username}
                placeholder="Usuário"
                class="flex-1 px-3 py-3 text-[15px] font-roboto text-torra-gray-600 placeholder-torra-gray-500 focus:outline-none"
              />
            </div>
            
            <!-- Password Field -->
            <div class="flex rounded-lg overflow-hidden border border-torra-gray-300 transition-all duration-200 hover:border-torra-orange-light">
              <div class="bg-torra-gray-100 px-3 py-3 border-r border-torra-gray-300">
                <Lock class="w-4 h-4 text-torra-gray-600" />
              </div>
              <input
                type="password"
                bind:value={password}
                placeholder="Senha"
                class="flex-1 px-3 py-3 text-[15px] font-roboto text-torra-gray-600 placeholder-torra-gray-500 focus:outline-none"
              />
            </div>
            
            <!-- Submit Button -->
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="w-full py-3 px-6 rounded text-base"
            >
              {isSubmitting ? 'ENTRANDO...' : 'ACESSAR'}
            </Button>
          </form>
          
          <!-- Password Recovery Link -->
          <div class="mt-8 text-center">
            <span class="text-base font-roboto text-torra-dark">
              Não se lembra da sua senha?
            </span>
            <a
              href="#"
              on:mouseenter={() => linkHovered = true}
              on:mouseleave={() => linkHovered = false}
              class="text-base font-roboto text-torra-orange-light ml-2 hover:text-torra-orange transition-colors duration-200 {linkHovered ? 'underline' : ''}"
            >
              Resgate aqui
            </a>
          </div>
        </div>
      </div>
      
      <!-- Right Panel - Gradient Background with Illustrations -->
      <div 
        class="hidden md:block flex-1 gradient-panel relative overflow-hidden"
        in:fade={{ duration: 1000, delay: 600 }}
      >
        <!-- Click & Retire Logo -->
        <div class="absolute top-24 left-1/2 transform -translate-x-1/2 z-10">
          <div class="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold text-torra-orange">Click & Retire</h2>
          </div>
        </div>
        
        <!-- Character Illustrations (Animated) -->
        <div class="absolute bottom-0 left-12 w-[153px] h-[468px]">
          <div 
            class="w-full h-full bg-gradient-to-t from-purple-400/20 to-purple-300/20 rounded-t-full animate-pulse"
            in:fly={{ y: 100, duration: 1200, delay: 800, easing: quintOut }}
          ></div>
        </div>
        
        <div class="absolute bottom-0 right-12 w-[204px] h-[454px]">
          <div 
            class="w-full h-full bg-gradient-to-t from-purple-500/20 to-purple-400/20 rounded-t-full animate-pulse"
            in:fly={{ y: 100, duration: 1200, delay: 1000, easing: quintOut }}
          ></div>
        </div>
        
        <!-- Floating Elements Animation -->
        {#each Array(5) as _, i}
          <div
            class="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style="left: {20 + i * 15}%; top: {30 + i * 10}%; animation-delay: {i * 0.5}s"
          ></div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Footer -->
  <footer class="bg-white border-t border-torra-gray-200 shadow-torra-footer">
    <div class="max-w-[1440px] mx-auto px-6 py-5">
      <p class="text-center text-[13px] font-inter text-black">
        Copyright © 2023, Lojas Torra. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</div>

<style>
  /* Custom floating animation */
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-20px) translateX(10px);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-10px) translateX(-10px);
      opacity: 0.4;
    }
    75% {
      transform: translateY(-30px) translateX(5px);
      opacity: 0.7;
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
</style>