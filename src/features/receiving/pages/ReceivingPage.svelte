<script>
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition';
    import MainLayout from '../../../layouts/MainLayout.svelte';
    import ReceivingTable from '../components/ReceivingTable.svelte';
    import ReceivingStats from '../components/ReceivingStats.svelte';
    import {receivingService} from '../../../api/services/receiving.service';

    let pendingOrders = [];
    let receivedOrders = [];
    let isLoading = true;
    let error = null;
    let activeTab = 'pending';

    // Stats
    let stats = {
        pendingCount: 0,
        receivedToday: 0,
        avgReceivingTime: '0h'
    };

    onMount(async () => {
        await loadData();
    });

    async function loadData() {
        try {
            isLoading = true;

            // Load orders
            const [pendingResponse, receivedResponse, statsResponse] = await Promise.all([
                receivingService.getPendingOrders(),
                receivingService.getReceivedOrders({date: new Date().toISOString().split('T')[0]}),
                receivingService.getStats()
            ]);

            if (pendingResponse.success) {
                pendingOrders = pendingResponse.data.items;
            }

            if (receivedResponse.success) {
                receivedOrders = receivedResponse.data.items;
            }

            if (statsResponse.success) {
                stats = statsResponse.data;
            }
        } catch (err) {
            error = 'Erro ao carregar dados';
        } finally {
            isLoading = false;
        }
    }

    async function handleReceiveOrder(order) {
        try {
            const response = await receivingService.receiveOrder(order.id);
            if (response.success) {
                await loadData();
            }
        } catch (err) {
            console.error('Erro ao receber pedido:', err);
        }
    }

    async function handleRejectOrder(order, reason) {
        try {
            const response = await receivingService.rejectOrder(order.id, reason);
            if (response.success) {
                await loadData();
            }
        } catch (err) {
            console.error('Erro ao rejeitar pedido:', err);
        }
    }
</script>

<MainLayout>
    <div class="page-container">
        <!-- Header -->
        <div class="mb-6" in:fly={{ y: -20, duration: 500 }}>
            <h1 class="text-2xl font-bold text-gray-900">Recebimento de Pedidos</h1>
            <p class="text-gray-600 mt-1">Confira e receba os pedidos enviados para a loja</p>
        </div>

        <!-- Stats -->
        <div in:fly={{ y: 20, duration: 500, delay: 100 }}>
            <ReceivingStats {isLoading} {stats}/>
        </div>

        <!-- Tabs -->
        <div class="mt-6 border-b border-gray-200" in:fly={{ y: 20, duration: 500, delay: 200 }}>
            <nav class="-mb-px flex space-x-8">
                <button
                        class="py-2 px-1 border-b-2 font-medium text-sm transition-colors {
            activeTab === 'pending'
              ? 'border-torra-orange text-torra-orange'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }"
                        on:click={() => activeTab = 'pending'}
                >
                    Aguardando Recebimento ({pendingOrders.length})
                </button>
                <button
                        class="py-2 px-1 border-b-2 font-medium text-sm transition-colors {
            activeTab === 'received'
              ? 'border-torra-orange text-torra-orange'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }"
                        on:click={() => activeTab = 'received'}
                >
                    Recebidos Hoje ({receivedOrders.length})
                </button>
            </nav>
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
            <div class="mt-6" in:fly={{ y: 20, duration: 500, delay: 300 }}>
                {#if activeTab === 'pending'}
                    <ReceivingTable
                            orders={pendingOrders}
                            showActions={true}
                            on:receive={e => handleReceiveOrder(e.detail)}
                            on:reject={e => handleRejectOrder(e.detail.order, e.detail.reason)}
                    />
                {:else}
                    <ReceivingTable
                            orders={receivedOrders}
                            showActions={false}
                    />
                {/if}
            </div>
        {/if}
    </div>
</MainLayout>
