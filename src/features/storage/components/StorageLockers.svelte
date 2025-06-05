<script>
    import {createEventDispatcher} from 'svelte';
    import {AlertCircle, Clock, Lock, Package, User} from 'lucide-svelte';

    export let lockers = [];

    const dispatch = createEventDispatcher();

    function getLockerStatusColor(status) {
        switch (status) {
            case 'available':
                return 'bg-green-100 border-green-300 hover:bg-green-50';
            case 'occupied':
                return 'bg-blue-100 border-blue-300 hover:bg-blue-50';
            case 'maintenance':
                return 'bg-red-100 border-red-300 hover:bg-red-50';
            default:
                return 'bg-gray-100 border-gray-300 hover:bg-gray-50';
        }
    }

    function getLockerIcon(status) {
        switch (status) {
            case 'available':
                return Package;
            case 'occupied':
                return Lock;
            case 'maintenance':
                return AlertCircle;
            default:
                return Package;
        }
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours}h atrás`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'} atrás`;
        }
    }
</script>

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each lockers as locker}
        {@const Icon = getLockerIcon(locker.status)}
        <div class="relative">
            <button
                    class="p-4 rounded-lg border-2 transition-all cursor-pointer {getLockerStatusColor(locker.status)} w-full text-left"
                    on:click={() => locker.status === 'occupied' && dispatch('view', locker)}
                    type="button"
                    disabled={locker.status !== 'occupied'}
            >
                <!-- Locker Number -->
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-lg font-bold text-gray-900">
                        Locker {locker.number}
                    </h3>
                    <Icon class="h-5 w-5 text-gray-600"/>
                </div>

                <!-- Size -->
                <div class="text-sm text-gray-600 mb-2">
                    Tamanho: {locker.size}
                </div>

                <!-- Status -->
                {#if locker.status === 'available'}
                    <div class="text-green-700 font-medium">
                        Disponível
                    </div>
                {:else if locker.status === 'occupied'}
                    <div class="space-y-2">
                        <div class="text-blue-700 font-medium">
                            Ocupado
                        </div>

                        {#if locker.order}
                            <div class="text-xs text-gray-600 space-y-1">
                                <div class="flex items-center">
                                    <User class="h-3 w-3 mr-1"/>
                                    {locker.order.customerName}
                                </div>
                                <div class="flex items-center">
                                    <Clock class="h-3 w-3 mr-1"/>
                                    {formatDate(locker.order.storedAt)}
                                </div>
                            </div>

                            <button
                                    on:click|stopPropagation={() => dispatch('release', locker.id)}
                                    class="mt-2 w-full px-3 py-1 bg-white text-red-600 border border-red-300 rounded text-sm hover:bg-red-50 transition-colors"
                            >
                                Liberar
                            </button>
                        {/if}
                    </div>
                {:else if locker.status === 'maintenance'}
                    <div class="text-red-700 font-medium">
                        Em Manutenção
                    </div>
                {/if}
            </button>
        </div>
    {/each}
</div>
