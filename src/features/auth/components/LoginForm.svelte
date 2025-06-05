<script>
    import {Lock, User} from 'lucide-svelte';
    import {authStore} from '$src/stores/auth.store.js';

    import Button from "$src/components/ui/Button.svelte";
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
                alt="Lojas Torra"
                class="w-[111px] h-[76px] mx-auto"
                src={torraLogo}
        />
    </div>

    <!-- Separator -->
    <div class="w-full h-px bg-torra-gray-200 mb-10"></div>

    <!-- Form -->
    <div class="flex-1">
        <h1 class="text-[32px] font-roboto font-medium text-torra-dark text-center mb-6 leading-tight">
            Entrar no Painel
        </h1>

        <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
            <!-- Username -->
            <div>
                <InputField
                        bind:value={username}
                        disabled={isLoading}
                        error={showError && !username ? 'Campo obrigatório' : ''}
                        icon={User}
                        on:keydown={handleKeydown}
                        placeholder="Usuário"
                        type="text"
                />
            </div>

            <!-- Password -->
            <div>
                <InputField
                        bind:value={password}
                        disabled={isLoading}
                        error={showError && !password ? 'Campo obrigatório' : ''}
                        icon={Lock}
                        on:keydown={handleKeydown}
                        placeholder="Senha"
                        type="password"
                />
            </div>

            <!-- Remember me -->
            <div class="flex items-center">
                <input
                        bind:checked={rememberMe}
                        class="w-4 h-4 text-torra-orange bg-white border-torra-gray-300 rounded
                 focus:ring-torra-orange focus:ring-2"
                        id="remember"
                        type="checkbox"
                />
                <label class="ml-2 text-sm text-torra-gray-600" for="remember">
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
                    className="w-full uppercase"
                    disabled={isLoading}
                    loading={isLoading}
                    type="submit"
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
                    class="text-sm text-torra-orange hover:text-torra-orange-light ml-1
               transition-colors duration-200 font-medium"
                    on:click={() => console.log('Password recovery')}
                    type="button"
            >
                Resgate aqui
            </button>
        </div>
    </div>
</div>