<script>
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { User, Lock } from 'lucide-svelte';
  import InputField from './InputField.svelte';
  
  let username = '';
  let password = '';
  let isSubmitting = false;
  
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

<!-- Main container matching Figma dimensions -->
<div class="w-[1440px] h-[1024px] bg-[#EFEFEF] mx-auto relative overflow-hidden">
  <!-- Content Area with both panels -->
  <div class="absolute top-[170px] left-1/2 transform -translate-x-1/2 flex">
    <!-- Left Panel - Login Form -->
    <div 
      class="w-[476px] h-[560px] bg-white rounded-l-lg border border-[#DBE2EB] shadow-[0px_6px_8px_0px_rgba(4,4,7,0.1)] relative"
      in:fly={{ x: -50, duration: 800, delay: 200, easing: quintOut }}
    >
      <!-- Logo Torra -->
      <div class="absolute top-[31.85px] left-1/2 transform -translate-x-1/2 z-10">
        <div class="w-[111.19px] h-[76px] bg-[#FF5101] rounded-lg flex items-center justify-center shadow-lg">
          <span class="text-white font-bold text-2xl">TORRA</span>
        </div>
      </div>
      
      <!-- Separator line -->
      <div class="absolute top-[136.85px] left-[41px] w-[394.8px] h-[1px] bg-[#EBECF1]"></div>
      
      <!-- Form Container -->
      <div class="px-[41px] pt-[178.85px]">
        <!-- Title -->
        <h1 class="text-[32px] font-roboto font-medium text-[#1A1630] text-center mb-[23px] leading-[35.2px]">
          Entrar no Painel
        </h1>
        
        <!-- Login Form -->
        <form on:submit|preventDefault={handleSubmit}>
          <!-- Username Field -->
          <div class="mb-[16px]">
            <InputField 
              type="text"
              bind:value={username}
              placeholder="Usuário"
              icon={User}
            />
          </div>
          
          <!-- Password Field -->
          <div class="mb-[23px]">
            <InputField 
              type="password"
              bind:value={password}
              placeholder="Senha"
              icon={Lock}
            />
          </div>
          
          <!-- Submit Button -->
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full h-[45px] bg-[#FF5101] text-white font-inter font-bold text-[16px] tracking-[0.45px] rounded border border-[#FF7B3D] shadow-[0px_0px_10px_-5px_rgba(112,94,200,0.5)] transition-all duration-300 hover:bg-[#FF7B3D] hover:shadow-lg hover:transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
          >
            {isSubmitting ? 'ENTRANDO...' : 'ACESSAR'}
          </button>
        </form>
        
        <!-- Password Recovery Link -->
        <div class="mt-[22px] text-center">
          <span class="text-[16px] font-roboto text-[#1A1630]">
            Não se lembra da sua senha?
          </span>
          <button
            type="button"
            on:click={() => console.log('Password recovery clicked')}
            class="text-[16px] font-roboto text-[#FF7B3D] hover:text-[#FF5101] hover:underline transition-all duration-200 bg-transparent border-none cursor-pointer ml-1"
          >
            Resgate aqui
          </button>
        </div>
      </div>
    </div>
    
    <!-- Right Panel - Gradient Background with Illustrations -->
    <div 
      class="w-[444px] h-[560px] gradient-panel border border-l-0 border-[#DBE2EB] relative overflow-hidden"
      in:fade={{ duration: 1000, delay: 600 }}
    >
      <!-- Click & Retire Logo -->
      <div class="absolute top-[96px] left-1/2 transform -translate-x-1/2 z-10">
        <div class="w-[258px] h-[50px] bg-white rounded-lg shadow-xl flex items-center justify-center">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-[#FF5101] rounded-full"></div>
            <span class="text-[#FF5101] font-bold text-2xl">Click & Retire</span>
          </div>
        </div>
      </div>
      
      <!-- Character Illustrations (placeholders) -->
      <div 
        class="absolute bottom-0 left-[52px] w-[153px] h-[468px]"
        in:fly={{ y: 100, duration: 1200, delay: 800, easing: quintOut }}
      >
        <div class="w-full h-full bg-gradient-to-t from-purple-400/40 to-transparent rounded-t-full animate-pulse"></div>
        <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/30 text-sm">
          Ilustração
        </div>
      </div>
      
      <div 
        class="absolute bottom-0 right-[38px] w-[204px] h-[454px]"
        in:fly={{ y: 100, duration: 1200, delay: 1000, easing: quintOut }}
      >
        <div class="w-full h-full bg-gradient-to-t from-purple-500/40 to-transparent rounded-t-full animate-pulse"></div>
        <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/30 text-sm">
          Ilustração
        </div>
      </div>
      
      <!-- Floating decorative elements -->
      {#each Array(3) as _, i}
        <div
          class="absolute w-16 h-16 rounded-full bg-white/5 animate-float"
          style="left: {20 + i * 30}%; top: {40 + i * 15}%; animation-delay: {i * 2}s"
        ></div>
      {/each}
    </div>
  </div>
  
  <!-- Footer -->
  <footer class="absolute bottom-0 left-0 right-0 h-[62px] bg-white border-t border-[#EBECF1] shadow-[16px_0px_16px_0px_rgba(24,23,38,0.06)]">
    <div class="h-full flex items-center justify-center">
      <p class="text-[13px] font-inter text-black leading-[15.73px]">
        Copyright © 2023, Lojas Torra. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</div>

<style>
  /* Custom gradient background for the right panel */
  .gradient-panel {
    background: radial-gradient(circle at 50% 58%, #42437B 0%, #181945 100%);
  }
  
  /* Floating animation for decorative elements */
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.1;
    }
    25% {
      transform: translateY(-20px) rotate(90deg);
      opacity: 0.2;
    }
    50% {
      transform: translateY(-10px) rotate(180deg);
      opacity: 0.15;
    }
    75% {
      transform: translateY(-30px) rotate(270deg);
      opacity: 0.25;
    }
  }
  
  .animate-float {
    animation: float 10s ease-in-out infinite;
  }
</style>