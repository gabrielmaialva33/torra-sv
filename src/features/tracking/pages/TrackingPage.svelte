<script>
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition';
    import MainLayout from '../../../layouts/MainLayout.svelte';
    import TrackingTable from '../components/TrackingTable.svelte';
    import TrackingFilters from '../components/TrackingFilters.svelte';
    import CancelOrderModal from '../components/CancelOrderModal.svelte';
    import EditOrderModal from '../components/EditOrderModal.svelte';
    import {trackingService} from '../../../api/services/tracking.service';

    let orders = [];
    let isLoading = true;
    let error = null;
    let showCancelModal = false;
    let showEditModal = false;
    let selectedOrder = null;

    // Filters
    let filters = {
        search: '',
        status: 'all',
        dateFrom: '',
        dateTo: ''
    };

    onMount(async () => {
        await loadOrders();
    });

    async function loadOrders() {
        try {
            isLoading = true;
            const response = await trackingService.getOrders(filters);
            if (response.success) {
                orders = response.data.items;
            } else {
                error = response.error;
            }
        } catch (err) {
            error = 'Erro ao carregar pedidos';
        } finally {
            isLoading = false;
        }
    }

    function handleFilterChange(event) {
        filters = event.detail;
        loadOrders();
    }

    function handleCancelOrder(order) {
        selectedOrder = order;
        showCancelModal = true;
    }

    function handleEditOrder(order) {
        selectedOrder = order;
        showEditModal = true;
    }

    async function confirmCancelOrder(reason) {
        try {
            const response = await trackingService.cancelOrder(selectedOrder.id, reason);
            if (response.success) {
                await loadOrders();
                showCancelModal = false;
            }
        } catch (err) {
            console.error('Erro ao cancelar pedido:', err);
        }
    }

    async function confirmEditOrder(updatedData) {
        try {
            const response = await trackingService.updateOrder(selectedOrder.id, updatedData);
            if (response.success) {
                await loadOrders();
                showEditModal = false;
            }
        } catch (err) {
            console.error('Erro ao atualizar pedido:', err);
        }
    }
</script>

<MainLayout>
    <div class="page-container">
        <!-- Header -->
        <div class="mb-6" in:fly={{ y: -20, duration: 500 }}>
            <h1 class="text-2xl font-bold text-gray-900">Acompanhamento de Pedidos</h1>
            <p class="text-gray-600 mt-1">Gerencie e acompanhe todos os pedidos do sistema</p>
        </div>

        <!-- Filters -->
        <div in:fly={{ y: 20, duration: 500, delay: 100 }}>
            <TrackingFilters
                    bind:filters
                    on:change={handleFilterChange}
            />
        </div>

        <!-- Content -->
        {#if isLoading}
            <div class="flex items-center justify-center h-64">
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-torra-orange"></div>
                    <p class="mt-2 text-gray-500">Carregando pedidos...</p>
                </div>
            </div>
        {:else if error}
            <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-6">
                {error}
            </div>
        {:else}
            <div in:fly={{ y: 20, duration: 500, delay: 200 }}>
                <TrackingTable
                        {orders}
                        on:cancel={e => handleCancelOrder(e.detail)}
                        on:edit={e => handleEditOrder(e.detail)}
                />
            </div>
        {/if}
    </div>

    <!-- Modals -->
    {#if showCancelModal}
        <CancelOrderModal
                order={selectedOrder}
                on:confirm={e => confirmCancelOrder(e.detail)}
                on:close={() => showCancelModal = false}
        />
    {/if}

    {#if showEditModal}
        <EditOrderModal
                order={selectedOrder}
                on:confirm={e => confirmEditOrder(e.detail)}
                on:close={() => showEditModal = false}
        />
    {/if}
</MainLayout>
