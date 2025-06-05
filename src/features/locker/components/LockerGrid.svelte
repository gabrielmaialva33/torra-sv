<script>
    import {createEventDispatcher} from 'svelte';
    import {AlertCircle, Archive, Clock, Lock, Package, Settings, User} from 'lucide-svelte';

    export let lockers = [];

    const dispatch = createEventDispatcher();

    // Group lockers by rows (10 per row)
    $: lockerRows = lockers.reduce((rows, locker, index) => {
        const rowIndex = Math.floor(index / 10);
        if (!rows[rowIndex]) {
            rows[rowIndex] = [];
        }
        rows[rowIndex].push(locker);
        return rows;
    }, []);

    function getLockerClass(status) {
        switch (status) {
            case 'available':
                return 'bg-green-100 border-green-300 hover:bg-green-50 cursor-pointer';
            case 'occupied':
                return 'bg-blue-100 border-blue-300 hover:bg-blue-50 cursor-pointer';
            case 'maintenance':
                return 'bg-red-100 border-red-300 hover:bg-red-50 cursor-pointer';
            default:
                return 'bg-gray-100 border-gray-300 hover:bg-gray-50';
        }
    }

    function getSizeClass(size) {
        switch (size) {
            case 'P':
                return 'h-20';
            case 'M':
                return 'h-24';
            case 'G':
                return 'h-28';
            default:
                return 'h-24';
        }
    }

    function getIcon(status) {
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

    function handleLockerClick(locker) {
        if (locker.status === 'maintenance') {
            handleMaintenanceToggle(locker);
        }
    }

    function handleMaintenanceToggle(locker) {
        const newStatus = locker.status === 'maintenance' ? 'available' : 'maintenance';
        if (confirm(`Deseja ${newStatus === 'maintenance' ? 'colocar em manutenção' : 'liberar da manutenção'} o locker ${locker.number}?`)) {
            dispatch('statusChange', {locker, status: newStatus});
        }
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return 'Hoje';
        } else if (diffInDays === 1) {
            return '1 dia';
        } else {
            return `${diffInDays} dias`;
        }
    }
</script>

<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
    <!-- Legend -->
    <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span class="text-sm text-gray-600">Disponível</span>
            </div>
            <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                <span class="text-sm text-gray-600">Ocupado</span>
            </div>
            <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span class="text-sm text-gray-600">Manutenção</span>
            </div>
        </div>

        <div class="flex items-center space-x-4 text-sm text-gray-600">
            <span>P = Pequeno</span>
            <span>M = Médio</span>
            <span>G = Grande</span>
        </div>
    </div>

    <!-- Locker Grid -->
    <div class="space-y-4">
        {#each lockerRows as row, rowIndex}
            <div class="grid grid-cols-10 gap-2">
                {#each row as locker}
                    {@const Icon = getIcon(locker.status)}
                    <button
                            class="relative group text-left w-full"
                            on:click={() => handleLockerClick(locker)}
                            type="button"
                    >
                        <div class="
              p-2 rounded-lg border-2 transition-all
              {getLockerClass(locker.status)}
              {getSizeClass(locker.size)}
              flex flex-col items-center justify-center
            ">
                            <!-- Locker Number -->
                            <div class="font-bold text-gray-900 text-sm">
                                {locker.number}
                            </div>

                            <!-- Size Badge -->
                            <div class="text-xs text-gray-600 font-medium">
                                {locker.size}
                            </div>

                            <!-- Icon -->
                            <Icon class="h-4 w-4 mt-1 text-gray-600"/>

                            <!-- Days indicator for occupied lockers -->
                            {#if locker.status === 'occupied' && locker.order}
                                {@const days = formatDate(locker.order.storedAt)}
                                <div class="text-xs mt-1 font-medium {
                  days.includes('30') || parseInt(days) > 30 ? 'text-red-600' : 'text-gray-600'
                }">
                                    {days}
                                </div>
                            {/if}
                        </div>

                        <!-- Tooltip -->
                        {#if locker.status === 'occupied' && locker.order}
                            <div class="
                absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                opacity-0 group-hover:opacity-100 transition-opacity
                bg-gray-900 text-white text-xs rounded-lg p-2 whitespace-nowrap
                pointer-events-none z-10
              ">
                                <div class="flex items-center space-x-1 mb-1">
                                    <User class="h-3 w-3"/>
                                    <span>{locker.order.customerName}</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <Clock class="h-3 w-3"/>
                                    <span>Pedido #{locker.order.code}</span>
                                </div>
                                <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                    <div class="border-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        {/if}

                        <!-- Maintenance button -->
                        {#if locker.status === 'available'}
                            <button
                                    on:click|stopPropagation={() => handleMaintenanceToggle(locker)}
                                    class="
                  absolute -top-2 -right-2
                  opacity-0 group-hover:opacity-100 transition-opacity
                  p-1 bg-white rounded-full shadow-md border border-gray-200
                  hover:bg-gray-50
                "
                                    title="Colocar em manutenção"
                            >
                                <Settings class="h-3 w-3 text-gray-600"/>
                            </button>
                        {/if}
                    </button>
                {/each}
            </div>
        {/each}
    </div>

    {#if lockers.length === 0}
        <div class="text-center py-12 text-gray-500">
            <Archive class="h-12 w-12 mx-auto mb-4 text-gray-400"/>
            <p class="text-lg font-medium">Nenhum locker encontrado</p>
            <p class="mt-1">Ajuste os filtros ou adicione novos lockers</p>
        </div>
    {/if}
</div>
