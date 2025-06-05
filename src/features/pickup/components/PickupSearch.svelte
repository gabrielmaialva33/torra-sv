<script>
    import {createEventDispatcher} from 'svelte';
    import {CreditCard, Package, Search} from 'lucide-svelte';

    let query = '';
    let searchType = 'code';

    const dispatch = createEventDispatcher();

    function handleSubmit(e) {
        e.preventDefault();
        if (query.trim()) {
            dispatch('search', {query: query.trim(), type: searchType});
        }
    }

    function handleTypeChange(type) {
        searchType = type;
        query = '';
    }
</script>

<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
    <form on:submit={handleSubmit}>
        <!-- Search Type Selector -->
        <div class="flex items-center justify-center space-x-4 mb-6">
            <button
                    class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors {
          searchType === 'code'
            ? 'bg-torra-orange text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }"
                    on:click={() => handleTypeChange('code')}
                    type="button"
            >
                <Package class="h-4 w-4"/>
                <span>Código do Pedido</span>
            </button>

            <button
                    class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors {
          searchType === 'cpf'
            ? 'bg-torra-orange text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }"
                    on:click={() => handleTypeChange('cpf')}
                    type="button"
            >
                <CreditCard class="h-4 w-4"/>
                <span>CPF do Cliente</span>
            </button>
        </div>

        <!-- Search Input -->
        <div class="max-w-xl mx-auto">
            <div class="relative">
                <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                <input
                        autocomplete="off"
                        bind:value={query}
                        class="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                        placeholder={searchType === 'code' ? 'Digite o código do pedido...' : 'Digite o CPF do cliente...'}
                        type="text"
                />
            </div>

            <button
                    class="w-full mt-4 py-3 bg-torra-orange text-white font-medium rounded-lg hover:bg-torra-orange-dark transition-colors"
                    type="submit"
            >
                Buscar Pedido
            </button>
        </div>
    </form>
</div>
