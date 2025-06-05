<script>
    import {createEventDispatcher} from 'svelte';
    import {location} from 'svelte-spa-router';
    import {
        Archive,
        BarChart3,
        ChevronLeft,
        ChevronRight,
        HeadphonesIcon,
        Home,
        LogOut,
        Package,
        Store,
        Truck,
        Users
    } from 'lucide-svelte';
    import {authStore} from '../../stores/auth.store';
    import torraLogo from '../../assets/icons/brand/torra-logo-square.png';

    export let collapsed = false;

    const dispatch = createEventDispatcher();

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: Home,
            path: '/dashboard',
            permissions: ['dashboard.view']
        },
        {
            id: 'tracking',
            label: 'Acompanhamento',
            icon: Package,
            path: '/tracking',
            permissions: ['tracking.view']
        },
        {
            id: 'receiving',
            label: 'Recebimento',
            icon: Truck,
            path: '/receiving',
            permissions: ['receiving.view']
        },
        {
            id: 'storage',
            label: 'Armazenamento',
            icon: Archive,
            path: '/storage',
            permissions: ['storage.view']
        },
        {
            id: 'pickup',
            label: 'Retira Cliente',
            icon: Users,
            path: '/pickup',
            permissions: ['pickup.view']
        },
        {
            id: 'lockers',
            label: 'Lockers',
            icon: Archive,
            path: '/lockers',
            permissions: ['locker.view']
        },
        {
            id: 'support',
            label: 'SAC',
            icon: HeadphonesIcon,
            path: '/support',
            permissions: ['support.view']
        },
        {
            id: 'reports',
            label: 'Relatórios',
            icon: BarChart3,
            path: '/reports',
            permissions: ['reports.view']
        }
    ];

    const configItems = [
        {
            id: 'stores',
            label: 'Lojas',
            icon: Store,
            path: '/config/stores',
            permissions: ['config.view']
        },
        {
            id: 'users',
            label: 'Usuários',
            icon: Users,
            path: '/config/users',
            permissions: ['users.view']
        }
    ];

    $: currentPath = $location;
    $: user = $authStore.user;

    function hasPermission(permissions) {
        if (!user || !user.permissions) return false;
        if (user.permissions.includes('all')) return true;
        return permissions.some(p => user.permissions.includes(p));
    }

    function toggleSidebar() {
        dispatch('toggle');
    }

    function handleLogout() {
        authStore.logout();
    }
</script>

<aside
        class="bg-white h-screen flex flex-col transition-all duration-300 shadow-lg relative
         {collapsed ? 'w-16' : 'w-64'}"
>
    <!-- Logo -->
    <div class="h-16 flex items-center justify-center border-b border-torra-gray-200">
        <img
                alt="Lojas Torra"
                class="h-10 transition-all duration-300
             {collapsed ? 'w-10' : 'w-auto'}"
                src={torraLogo}
        />
    </div>

    <!-- Toggle button -->
    <button
            class="absolute -right-3 top-20 w-6 h-6 bg-white border border-torra-gray-200
           rounded-full flex items-center justify-center shadow-sm hover:shadow-md
           transition-all duration-200 z-10"
            on:click={toggleSidebar}
    >
        {#if collapsed}
            <ChevronRight class="w-3 h-3 text-torra-gray-600"/>
        {:else}
            <ChevronLeft class="w-3 h-3 text-torra-gray-600"/>
        {/if}
    </button>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4">
        <!-- Main menu -->
        <div class="px-3 mb-6">
            {#if !collapsed}
                <h3 class="text-xs font-semibold text-torra-gray-500 uppercase tracking-wider mb-2 px-2">
                    Menu Principal
                </h3>
            {/if}

            <ul class="space-y-1">
                {#each menuItems as item}
                    {#if hasPermission(item.permissions)}
                        <li>
                            <a
                                    href="#{item.path}"
                                    class="flex items-center px-2 py-2.5 rounded-lg transition-all duration-200
                       {currentPath === item.path 
                         ? 'bg-torra-orange text-white' 
                         : 'text-torra-gray-600 hover:bg-torra-gray-100'}"
                            >
                                <svelte:component
                                        this={item.icon}
                                        class="w-5 h-5 {collapsed ? 'mx-auto' : 'mr-3'}"
                                />
                                {#if !collapsed}
                                    <span class="text-sm font-medium">{item.label}</span>
                                {/if}
                            </a>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>

        <!-- Configuration menu -->
        {#if user?.role === 'admin'}
            <div class="px-3 mb-6">
                {#if !collapsed}
                    <h3 class="text-xs font-semibold text-torra-gray-500 uppercase tracking-wider mb-2 px-2">
                        Configurações
                    </h3>
                {/if}

                <ul class="space-y-1">
                    {#each configItems as item}
                        {#if hasPermission(item.permissions)}
                            <li>
                                <a
                                        href="#{item.path}"
                                        class="flex items-center px-2 py-2.5 rounded-lg transition-all duration-200
                         {currentPath === item.path 
                           ? 'bg-torra-orange text-white' 
                           : 'text-torra-gray-600 hover:bg-torra-gray-100'}"
                                >
                                    <svelte:component
                                            this={item.icon}
                                            class="w-5 h-5 {collapsed ? 'mx-auto' : 'mr-3'}"
                                    />
                                    {#if !collapsed}
                                        <span class="text-sm font-medium">{item.label}</span>
                                    {/if}
                                </a>
                            </li>
                        {/if}
                    {/each}
                </ul>
            </div>
        {/if}
    </nav>

    <!-- User section -->
    <div class="border-t border-torra-gray-200 p-3">
        <button
                class="w-full flex items-center px-2 py-2.5 rounded-lg text-torra-gray-600
             hover:bg-torra-gray-100 transition-all duration-200"
                on:click={handleLogout}
        >
            <LogOut class="w-5 h-5 {collapsed ? 'mx-auto' : 'mr-3'}"/>
            {#if !collapsed}
                <span class="text-sm font-medium">Sair</span>
            {/if}
        </button>
    </div>
</aside>

<style>
    /* Custom scrollbar */
    nav::-webkit-scrollbar {
        width: 4px;
    }

    nav::-webkit-scrollbar-track {
        background: transparent;
    }

    nav::-webkit-scrollbar-thumb {
        background: #e5e5e5;
        border-radius: 2px;
    }

    nav::-webkit-scrollbar-thumb:hover {
        background: #d4d4d4;
    }
</style>