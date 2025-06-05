<script>
  import { User, Lock } from 'lucide-svelte';
  import { authStore } from '../../../stores/auth.store';
  import Button from '../../../components/ui/button.svelte';
  import InputField from '../../../components/ui/InputField.svelte';
  import torraLogo from '../../../assets/icons/brand/torra-logo-square.png';
  
  let username = '';
  let password = '';
  let rememberMe = false;
  let showError = false;
  
  $: error = $authStore.error;
  $: isLoading = $authStore.isLoading;
  
  // Clear error when user types
  $: if (username || password) {
    if (showError) {
      authStore.clearError();
      showError = false;
    }
  }
  
  async function handleSubmit() {
    if (!username || !password) {
      showError = true;
      return;
    }
    
    const result = await authStore.login(username, password);
    
    if (!result.success) {
      showError = true;
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }
</script>

<div class="h-[560px] p-10 flex flex-col">
  <!-- Logo -->
  <div class="text-center mb-8">
    <img 
      src={torraLogo} 
      alt="Lojas Torra" 
      class="w-[111px] h-[76px] mx-auto"
    />
  </div>
  
  <!-- Separator -->
  <div class="w-full h-px bg-torra-gray-200 mb-10"></div>
  
  <!-- Form -->
  <div class="flex-1">
    <h1 class="text-[32px] font-roboto font-medium text-torra-dark text-center mb-6 leading-tight">
      Entrar no Painel
    </h1>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <!-- Username -->
      <div>
        <InputField 
          type="text"
          bind:value={username}
          placeholder="Usuário"
          icon={User}
          disabled={isLoading}
          on:keydown={handleKeydown}
          error={showError && !username ? 'Campo obrigatório' : ''}
        />
      </div>
      
      <!-- Password -->
      <div>
        <InputField 
          type="password"
          bind:value={password}
          placeholder="Senha"
          icon={Lock}
          disabled={isLoading}
          on:keydown={handleKeydown}
          error={showError && !password ? 'Campo obrigatório' : ''}
        />
      </div>
      
      <!-- Remember me -->
      <div class="flex items-center">
        <input
          type="checkbox"
          id="remember"
          bind:checked={rememberMe}
          class="w-4 h-4 text-torra-orange bg-white border-torra-gray-300 rounded 
                 focus:ring-torra-orange focus:ring-2"
        />
        <label for="remember" class="ml-2 text-sm text-torra-gray-600">
          Lembrar-me
        </label>
      </div>
      
      <!-- Error message -->
      {#if error && showError}
        <div class="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {error}
        </div>
      {/if}
      
      <!-- Submit button -->
      <Button
        type="submit"
        className="w-full uppercase"
        loading={isLoading}
        disabled={isLoading}
      >
        Acessar
      </Button>
    </form>
    
    <!-- Password recovery -->
    <div class="mt-6 text-center">
      <span class="text-sm text-torra-gray-600">
        Não se lembra da sua senha?
      </span>
      <button
        type="button"
        class="text-sm text-torra-orange hover:text-torra-orange-light ml-1 
               transition-colors duration-200 font-medium"
        on:click={() => console.log('Password recovery')}
      >
        Resgate aqui
      </button>
    </div>
  </div>
</div>