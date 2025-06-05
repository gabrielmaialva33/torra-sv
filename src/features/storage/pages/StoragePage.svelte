<script>
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition';
    import MainLayout from '../../../layouts/MainLayout.svelte';
    import StorageFilters from '../components/StorageFilters.svelte';
    import StorageLockers from '../components/StorageLockers.svelte';
    import StorageTable from '../components/StorageTable.svelte';
    import AssignLockerModal from '../components/AssignLockerModal.svelte';
    import {storageService} from '../../../api/services/storage.service';

    let lockers = [];
    let orders = [];
    let isLoading = true;
    let error = null;
    let viewMode = 'lockers'; // 'lockers' or 'table'

    let showAssignModal = false;
    let selectedOrder = null;

    // Filters
    let filters = {
        search: '',
        status: 'all',
        locker: 'all'
    };

    onMount(async () => {
        await loadData();
    });

    async function loadData() {
        try {
            isLoading = true;

            const [lockersResponse, ordersResponse] = await Promise.all([
                storageService.getLockers(),
                storageService.getStoredOrders(filters)
            ]);

            if (lockersResponse.success) {
                lockers = lockersResponse.data;
            }

            if (ordersResponse.success) {
                orders = ordersResponse.data.items;
            }
        } catch (err) {
            error = 'Erro ao carregar dados';
        } finally {
            isLoading = false;
        }
    }

    function handleFilterChange(event) {
        filters = event.detail;
        loadData();
    }

    function handleAssignLocker(order) {
        selectedOrder = order;
        showAssignModal = true;
    }

    async function confirmAssignLocker(lockerId) {
        try {
            const response = await storageService.assignLocker(selectedOrder.id, lockerId);
            if (response.success) {
                await loadData();
                showAssignModal = false;
            }
        } catch (err) {
            console.error('Erro ao atribuir locker:', err);
        }
    }

    async function handleReleaseLocker(lockerId) {
        if (confirm('Deseja liberar este locker?')) {
            try {
                const response = await storageService.releaseLocker(lockerId);
                if (response.success) {
                    await loadData();
                }
            } catch (err) {
                console.error('Erro ao liberar locker:', err);
            }
        }
    }
</script>

<MainLayout>
    <div class="page-container">
        <!-- Header -->
        <div class="mb-6" in:fly={{ y: -20, duration: 500 }}>
            <h1 class="text-2xl font-bold text-gray-900">Armazenamento</h1>
            <p class="text-gray-600 mt-1">Gerencie os lockers e pedidos armazenados</p>
        </div>

        <!-- View Mode Toggle -->
        <div class="flex items-center justify-between mb-6" in:fly={{ y: 20, duration: 500, delay: 100 }}>
            <div class="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {
            viewMode === 'lockers'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }"
                        on:click={() => viewMode = 'lockers'}
                >
                    Visualização Lockers
                </button>
                <button
                        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {
            viewMode === 'table'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }"
                        on:click={() => viewMode = 'table'}
                >
                    Visualização Tabela
                </button>
            </div>
        </div>

        <!-- Filters -->
        <div in:fly={{ y: 20, duration: 500, delay: 200 }}>
            <StorageFilters
                    bind:filters
                    {lockers}
                    on:change={handleFilterChange}
            />
        </div>

        <!-- Content -->
        {#if isLoading}
            <div class="flex items-center justify-center h-64">
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-torra-orange"></div>
                    <p class="mt-2 text-gray-500">Carregando dados...</p>
                </div>
            </div>
        {:else if error}
            <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-6">
                {error}
            </div>
        {:else}
            <div class="mt-6" in:fly={{ y: 20, duration: 500, delay: 300 }}>
                {#if viewMode === 'lockers'}
                    <StorageLockers
                            {lockers}
                            on:release={e => handleReleaseLocker(e.detail)}
                    />
                {:else}
                    <StorageTable
                            {orders}
                            on:assign={e => handleAssignLocker(e.detail)}
                    />
                {/if}
            </div>
        {/if}
    </div>

    <!-- Modals -->
    {#if showAssignModal}
        <AssignLockerModal
                order={selectedOrder}
                availableLockers={lockers.filter(l => l.status === 'available')}
                on:confirm={e => confirmAssignLocker(e.detail)}
                on:close={() => showAssignModal = false}
        />
    {/if}
</MainLayout>
