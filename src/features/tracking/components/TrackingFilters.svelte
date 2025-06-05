<script>
    import {createEventDispatcher} from 'svelte';
    import {Search} from 'lucide-svelte';

    export let filters = {
        search: '',
        status: 'all',
        dateFrom: '',
        dateTo: ''
    };

    const dispatch = createEventDispatcher();

    function handleFilterChange() {
        dispatch('change', filters);
    }

    const statusOptions = [
        {value: 'all', label: 'Todos os Status'},
        {value: 'sent', label: 'Enviado para Loja'},
        {value: 'received', label: 'Recebido pela Loja'},
        {value: 'checked', label: 'Conferido'},
        {value: 'stored', label: 'Armazenado'},
        {value: 'ready', label: 'Pronto para Retirada'},
        {value: 'picked', label: 'Retirado'},
        {value: 'cancelled', label: 'Cancelado'}
    ];
</script>

<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Search -->
        <div class="lg:col-span-2">
            <div class="relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                <input
                        bind:value={filters.search}
                        class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                        on:input={handleFilterChange}
                        placeholder="Buscar por código, cliente ou CPF..."
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

        <!-- Date From -->
        <div>
            <input
                    bind:value={filters.dateFrom}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                    on:change={handleFilterChange}
                    placeholder="Data inicial"
                    type="date"
            />
        </div>

        <!-- Date To -->
        <div>
            <input
                    bind:value={filters.dateTo}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                    on:change={handleFilterChange}
                    placeholder="Data final"
                    type="date"
            />
        </div>
    </div>
</div>
