<script>
    import {createEventDispatcher} from 'svelte';
    import {Search} from 'lucide-svelte';

    export let filters = {
        search: '',
        status: 'all',
        locker: 'all'
    };
    export let lockers = [];

    const dispatch = createEventDispatcher();

    function handleFilterChange() {
        dispatch('change', filters);
    }

    const statusOptions = [
        {value: 'all', label: 'Todos os Status'},
        {value: 'available', label: 'Disponível'},
        {value: 'occupied', label: 'Ocupado'},
        {value: 'maintenance', label: 'Manutenção'}
    ];
</script>

<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
            <div class="relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                <input
                        bind:value={filters.search}
                        class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                        on:input={handleFilterChange}
                        placeholder="Buscar por código ou cliente..."
                        type="text"
                />
            </div>
        </div>

        <!-- Status -->
        <div>
            <select
                    bind:value={filters.status}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                    on:change={handleFilterChange}
            >
                {#each statusOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>

        <!-- Locker -->
        <div>
            <select
                    bind:value={filters.locker}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                    on:change={handleFilterChange}
            >
                <option value="all">Todos os Lockers</option>
                {#each lockers as locker}
                    <option value={locker.id}>Locker {locker.number}</option>
                {/each}
            </select>
        </div>
    </div>
</div>
