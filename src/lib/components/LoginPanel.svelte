<script>
  import { fade } from 'svelte/transition';
  import IconInput from './IconInput.svelte';
  import TorraLogo from './TorraLogo.svelte';
  
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

<div class="relative w-full h-full">
  <!-- Logo - positioned at top center -->
  <div class="absolute top-[30px] left-1/2 transform -translate-x-1/2">
    <TorraLogo />
  </div>
  
  <!-- Container for form - centered -->
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="w-[442.8px] flex flex-col items-center" style="margin-top: 60px;">
      <!-- Separator line -->
      <div class="w-[394.8px] h-[1px] bg-[#EBECF1] mb-[42px]"></div>
    
    <!-- Title -->
    <h1 class="font-roboto font-medium text-[32px] leading-[35.2px] text-[#1A1630] mb-[53px]">
      Entrar no Painel
    </h1>
    
    <!-- Login Form -->
    <form on:submit={handleSubmit} class="w-[394px] space-y-[15px]">
      <!-- Username Input -->
      <IconInput
        type="text"
        placeholder="Usuário"
        bind:value={username}
        icon="user"
        required
      />
      
      <!-- Password Input -->
      <IconInput
        type="password"
        placeholder="Senha"
        bind:value={password}
        icon="lock"
        required
      />
      
      <!-- Submit Button -->
      <div class="pt-[8px]">
        <button
          type="submit"
          disabled={isLoading}
          class="w-full h-[45px] bg-[#FF5101] hover:bg-[#FF7B3D] 
                 transition-all duration-200 text-white font-inter font-bold text-[16px]
                 leading-[45px] tracking-[0.45px] text-center
                 rounded border border-[#FF7B3D] shadow-[0px_0px_10px_-5px_rgba(112,94,200,0.5)]
                 disabled:opacity-70 disabled:cursor-not-allowed"
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
      </div>
    </form>
    
    <!-- Password Recovery Link -->
    <div class="mt-[23px] flex items-center justify-center">
      <span class="font-roboto text-[16px] leading-[24px] text-[#1A1630]">
        Não se lembra da sua senha?
      </span>
      <button
        type="button"
        class="font-roboto text-[16px] leading-[24px] text-[#FF7B3D] 
               hover:text-[#FF5101] transition-colors duration-200 ml-1
               bg-transparent border-none cursor-pointer"
      >
        Resgate aqui
      </button>
    </div>
    </div>
  </div>
</div>
