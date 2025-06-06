<script>
    import {createEventDispatcher} from 'svelte';
    import {Bell, LogOut, Menu, Search, User} from 'lucide-svelte';
    import {authStore} from '../../stores/auth.store';
    import {clickOutside} from '$lib/actions/clickOutside.js';
    import {location} from 'svelte-spa-router';

    export let showMenuButton = false;

    const dispatch = createEventDispatcher();

    let showUserMenu = false;
    let showNotifications = false;
    let searchQuery = '';

    $: user = $authStore.user;
    $: currentPath = $location;

    // Page titles mapping
    const pageTitles = {
        '/dashboard': 'Dashboard',
        '/tracking': 'Acompanhamento de Pedidos',
        '/receiving': 'Recebimento de Mercadorias',
        '/storage': 'Armazenamento',
        '/pickup': 'Retirada de Clientes',
        '/lockers': 'Gestão de Lockers',
        '/config/stores': 'Configuração de Lojas',
        '/config/users': 'Configuração de Usuários',
        '/support': 'Central de Atendimento (SAC)',
        '/reports': 'Relatórios'
    };

    $: pageTitle = pageTitles[currentPath] || 'Click & Retire';

    function handleMenuClick() {
        dispatch('menuClick');
    }

    function handleLogout() {
        authStore.logout();
    }

    // Mock notifications
    const notifications = [
        {
            id: 1,
            title: 'Novo pedido recebido',
            message: 'Pedido #1234 aguardando processamento',
            time: '5 min atrás',
            read: false
        },
        {
            id: 2,
            title: 'Cliente retirou pedido',
            message: 'Pedido #1230 foi retirado com sucesso',
            time: '1 hora atrás',
            read: true
        }
    ];

    const unreadCount = notifications.filter(n => !n.read).length;
</script>

<header class="h-16 bg-white border-b border-torra-gray-200 flex items-center justify-between px-6">
    <div class="flex items-center flex-1">
        {#if showMenuButton}
            <button
                    on:click={handleMenuClick}
                    class="p-2 rounded-lg hover:bg-torra-gray-100 transition-colors duration-200 mr-4"
            >
                <Menu class="w-5 h-5 text-torra-gray-600"/>
            </button>
        {/if}

        <h1 class="text-xl font-semibold text-torra-dark">
            {pageTitle}
        </h1>
    </div>

    <!-- Search bar -->
    <div class="flex-1 max-w-md mx-4">
        <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-torra-gray-400"/>
            <input
                    bind:value={searchQuery}
                    class="w-full pl-10 pr-4 py-2 border border-torra-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-torra-orange focus:border-transparent
                       text-sm placeholder-torra-gray-400"
                    on:keydown={(e) => e.key === 'Enter' && searchQuery.trim() && console.log('Search:', searchQuery)}
                    placeholder="Buscar pedido, cliente ou produto..."
                    type="text"
            />
        </div>
    </div>

    <div class="flex items-center space-x-4">
        <!-- Notifications -->
        <div class="relative">
            <button
                    class="relative p-2 rounded-lg hover:bg-torra-gray-100 transition-colors duration-200"
                    on:click={() => showNotifications = !showNotifications}
            >
                <Bell class="w-5 h-5 text-torra-gray-600"/>
                {#if unreadCount > 0}
          <span class="absolute top-0 right-0 w-5 h-5 bg-torra-orange text-white 
                       text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
                {/if}
            </button>

            {#if showNotifications}
                <div
                        use:clickOutside
                        on:click_outside={() => showNotifications = false}
                        class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border
                 border-torra-gray-200 py-2 z-50"
                >
                    <div class="px-4 py-2 border-b border-torra-gray-200">
                        <h3 class="font-semibold text-torra-dark">Notificações</h3>
                    </div>

                    <div class="max-h-80 overflow-y-auto">
                        {#each notifications as notification}
                            <div
                                    class="px-4 py-3 hover:bg-torra-gray-50 cursor-pointer
                       {!notification.read ? 'bg-torra-orange/5' : ''}"
                            >
                                <div class="flex justify-between items-start">
                                    <div>
                                        <p class="font-medium text-sm text-torra-dark">
                                            {notification.title}
                                        </p>
                                        <p class="text-xs text-torra-gray-500 mt-1">
                                            {notification.message}
                                        </p>
                                    </div>
                                    {#if !notification.read}
                                        <span class="w-2 h-2 bg-torra-orange rounded-full mt-1"></span>
                                    {/if}
                                </div>
                                <p class="text-xs text-torra-gray-400 mt-2">
                                    {notification.time}
                                </p>
                            </div>
                        {/each}
                    </div>

                    <div class="px-4 py-2 border-t border-torra-gray-200">
                        <button class="text-sm text-torra-orange hover:text-torra-orange-light">
                            Ver todas
                        </button>
                    </div>
                </div>
            {/if}
        </div>

        <!-- User menu -->
        <div class="relative">
            <button
                    class="flex items-center space-x-3 p-2 rounded-lg hover:bg-torra-gray-100
               transition-colors duration-200"
                    on:click={() => showUserMenu = !showUserMenu}
            >
                <div class="text-right">
                    <p class="text-sm font-medium text-torra-dark">
                        {user?.name || 'Usuário'}
                    </p>
                    <p class="text-xs text-torra-gray-500">
                        {user?.role === 'admin' ? 'Administrador' :
                            user?.role === 'manager' ? 'Gerente' :
                                user?.role === 'attendant' ? 'Atendente' : 'Suporte'}
                    </p>
                </div>
                <div class="w-10 h-10 bg-torra-gray-200 rounded-full flex items-center justify-center">
                    <User class="w-5 h-5 text-torra-gray-600"/>
                </div>
            </button>

            {#if showUserMenu}
                <div
                        use:clickOutside
                        on:click_outside={() => showUserMenu = false}
                        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border
                 border-torra-gray-200 py-2 z-50"
                >
                    <a
                            href="#/profile"
                            class="flex items-center px-4 py-2 hover:bg-torra-gray-50 text-torra-gray-700"
                    >
                        <User class="w-4 h-4 mr-3"/>
                        <span class="text-sm">Meu Perfil</span>
                    </a>

                    <div class="border-t border-torra-gray-200 my-2"></div>

                    <button
                            on:click={handleLogout}
                            class="w-full flex items-center px-4 py-2 hover:bg-torra-gray-50
                   text-torra-gray-700"
                    >
                        <LogOut class="w-4 h-4 mr-3"/>
                        <span class="text-sm">Sair</span>
                    </button>
                </div>
            {/if}
        </div>
    </div>
</header>