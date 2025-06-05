<script>
    import {fade, fly} from 'svelte/transition';
    import MainLayout from '../../../layouts/MainLayout.svelte';
    import PickupSearch from '../components/PickupSearch.svelte';
    import PickupOrderCard from '../components/PickupOrderCard.svelte';
    import PickupConfirmModal from '../components/PickupConfirmModal.svelte';
    import {pickupService} from '../../../api/services/pickup.service';

    let searchQuery = '';
    let searchType = 'code'; // 'code' or 'cpf'
    let foundOrders = [];
    let isLoading = false;
    let error = null;
    let showConfirmModal = false;
    let selectedOrder = null;

    async function handleSearch(event) {
        const {query, type} = event.detail;
        searchQuery = query;
        searchType = type;

        if (!query.trim()) {
            foundOrders = [];
            return;
        }

        try {
            isLoading = true;
            error = null;

            const response = await pickupService.searchOrders(query, type);

            if (response.success) {
                foundOrders = response.data;
            } else {
                error = response.error || 'Erro ao buscar pedidos';
            }
        } catch (err) {
            error = 'Erro ao conectar com o servidor';
        } finally {
            isLoading = false;
        }
    }

    function handlePickup(order) {
        selectedOrder = order;
        showConfirmModal = true;
    }

    async function confirmPickup(data) {
        try {
            const response = await pickupService.confirmPickup(selectedOrder.id, {
                method: data.method,
                document: data.document
            });

            if (response.success) {
                // Remove order from list
                foundOrders = foundOrders.filter(o => o.id !== selectedOrder.id);
                showConfirmModal = false;
                selectedOrder = null;

                // Show success message
                alert('Pedido retirado com sucesso!');
            }
        } catch (err) {
            console.error('Erro ao confirmar retirada:', err);
        }
    }
</script>

<MainLayout>
    <div class="page-container">
        <!-- Header -->
        <div class="mb-6" in:fly={{ y: -20, duration: 500 }}>
            <h1 class="text-2xl font-bold text-gray-900">Retirada de Pedidos</h1>
            <p class="text-gray-600 mt-1">Busque e registre a retirada de pedidos pelos clientes</p>
        </div>

        <!-- Search -->
        <div in:fly={{ y: 20, duration: 500, delay: 100 }}>
            <PickupSearch on:search={handleSearch}/>
        </div>

        <!-- Results -->
        <div class="mt-8">
            {#if isLoading}
                <div class="flex items-center justify-center h-64">
                    <div class="text-center">
                        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-torra-orange"></div>
                        <p class="mt-2 text-gray-500">Buscando pedidos...</p>
                    </div>
                </div>
            {:else if error}
                <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg" in:fade>
                    {error}
                </div>
            {:else if foundOrders.length > 0}
                <div class="space-y-4" in:fly={{ y: 20, duration: 500 }}>
                    <h3 class="text-lg font-medium text-gray-900">
                        {foundOrders.length} {foundOrders.length === 1 ? 'pedido encontrado' : 'pedidos encontrados'}
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {#each foundOrders as order}
                            <PickupOrderCard
                                    {order}
                                    on:pickup={() => handlePickup(order)}
                            />
                        {/each}
                    </div>
                </div>
            {:else if searchQuery}
                <div class="text-center py-12" in:fade>
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum pedido encontrado</h3>
                    <p class="mt-1 text-sm text-gray-500">
                        Não encontramos pedidos com o {searchType === 'code' ? 'código' : 'CPF'} informado
                    </p>
                </div>
            {:else}
                <div class="text-center py-12 text-gray-500" in:fade>
                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <p class="text-lg">Digite o código do pedido ou CPF do cliente para buscar</p>
                </div>
            {/if}
        </div>
    </div>

    <!-- Confirmation Modal -->
    {#if showConfirmModal}
        <PickupConfirmModal
                order={selectedOrder}
                on:confirm={e => confirmPickup(e.detail)}
                on:close={() => showConfirmModal = false}
        />
    {/if}
</MainLayout>
