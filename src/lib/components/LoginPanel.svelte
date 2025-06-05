<script>
  import { fade } from 'svelte/transition';
  import IconInput from './IconInput.svelte';
  import torraLogo from '../../assets/images/figma/torra-logo-login.png';
  
  let username = '';
  let password = '';
  let isLoading = false;
  
  async function handleSubmit(e) {
    e.preventDefault();
    isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      isLoading = false;
      console.log('Login attempt:', { username, password });
    }, 1500);
  }
</script>

<div class="relative w-full h-full bg-white">
  <div class="absolute inset-0 flex flex-col" style="padding: 16.8px;">
    <div class="w-[442.8px] mx-auto flex flex-col">
      <!-- Logo Torra -->
      <div class="flex justify-center mt-[15px] mb-[45px]">
        <img 
          src={torraLogo} 
          alt="TORRA" 
          class="h-[76px] w-auto object-contain"
          in:fade={{ duration: 300, delay: 100 }}
        />
      </div>
      
      <!-- Separator line -->
      <div class="w-[394.8px] h-[1px] bg-[#EBECF1] mx-auto mb-[42px]"></div>
      
      <!-- Title -->
      <h1 class="font-roboto font-medium text-[32px] leading-[35.2px] text-[#1A1630] text-center mb-[53px]"
          in:fade={{ duration: 300, delay: 200 }}>
        Entrar no Painel
      </h1>
      
      <!-- Login Form -->
      <form on:submit={handleSubmit} class="w-[394px] mx-auto">
        <!-- Username Input -->
        <div class="mb-[15px]" in:fade={{ duration: 300, delay: 300 }}>
          <IconInput
            type="text"
            placeholder="Usuário"
            bind:value={username}
            icon="user"
            required
          />
        </div>
        
        <!-- Password Input -->
        <div class="mb-[23px]" in:fade={{ duration: 300, delay: 400 }}>
          <IconInput
            type="password"
            placeholder="Senha"
            bind:value={password}
            icon="lock"
            required
          />
        </div>
        
        <!-- Submit Button -->
        <button
          type="submit"
          disabled={isLoading}
          class="w-full h-[45px] bg-[#FF5101] hover:bg-[#E54A00] 
                 transition-all duration-200 text-white font-inter font-bold text-[16px]
                 tracking-[0.45px] text-center rounded-[4px]
                 border border-[#FF7B3D] shadow-[0px_0px_10px_-5px_rgba(112,94,200,0.5)]
                 disabled:opacity-70 disabled:cursor-not-allowed
                 transform hover:-translate-y-[1px] active:translate-y-0"
          in:fade={{ duration: 300, delay: 500 }}
        >
          {#if isLoading}
            <span class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Acessando...
            </span>
          {:else}
            Acessar
          {/if}
        </button>
      </form>
      
      <!-- Password Recovery Link -->
      <div class="mt-[23px] text-center" in:fade={{ duration: 300, delay: 600 }}>
        <span class="font-roboto text-[16px] leading-[24px] text-[#1A1630]">
          Não se lembra da sua senha?
        </span>
        <button
          type="button"
          class="font-roboto text-[16px] leading-[24px] text-[#FF7B3D] 
                 hover:text-[#FF5101] transition-colors duration-200 ml-1
                 bg-transparent border-none cursor-pointer underline-offset-2 hover:underline"
        >
          Resgate aqui
        </button>
      </div>
    </div>
  </div>
</div>
