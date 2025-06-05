<script>
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition';
    import MainLayout from '../../../layouts/MainLayout.svelte';
    import LockerGrid from '../components/LockerGrid.svelte';
    import LockerFilters from '../components/LockerFilters.svelte';
    import LockerStats from '../components/LockerStats.svelte';
    import AddLockerModal from '../components/AddLockerModal.svelte';
    import {lockerService} from '../../../api/services/locker.service';

    let lockers = [];
    let stats = {
        total: 0,
        available: 0,
        occupied: 0,
        maintenance: 0
    };
    let isLoading = true;
    let error = null;
    let showAddModal = false;

    // Filters
    let filters = {
        status: 'all',
        size: 'all',
        search: ''
    };

    onMount(async () => {
        await loadData();
    });

    async function loadData() {
        try {
            isLoading = true;

            const [lockersResponse, statsResponse] = await Promise.all([
                lockerService.getLockers(filters),
                lockerService.getStats()
            ]);

            if (lockersResponse.success) {
                lockers = lockersResponse.data;
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

    function handleFilterChange(event) {
        filters = event.detail;
        loadData();
    }

    async function handleStatusChange(locker, newStatus) {
        try {
            const response = await lockerService.updateStatus(locker.id, newStatus);
            if (response.success) {
                await loadData();
            }
        } catch (err) {
            console.error('Erro ao atualizar status:', err);
        }
    }

    async function handleAddLocker(data) {
        try {
            const response = await lockerService.createLocker(data);
            if (response.success) {
                await loadData();
                showAddModal = false;
            }
        } catch (err) {
            console.error('Erro ao adicionar locker:', err);
        }
    }
</script>

<MainLayout>
    <div class="page-container">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6" in:fly={{ y: -20, duration: 500 }}>
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Gestão de Lockers</h1>
                <p class="text-gray-600 mt-1">Gerencie todos os lockers da loja</p>
            </div>
            <button
                    class="px-4 py-2 bg-torra-orange text-white rounded-lg hover:bg-torra-orange-dark transition-colors"
                    on:click={() => showAddModal = true}
            >
                Adicionar Locker
            </button>
        </div>

        <!-- Stats -->
        <div in:fly={{ y: 20, duration: 500, delay: 100 }}>
            <LockerStats {isLoading} {stats}/>
        </div>

        <!-- Filters -->
        <div class="mt-6" in:fly={{ y: 20, duration: 500, delay: 200 }}>
            <LockerFilters
                    bind:filters
                    on:change={handleFilterChange}
            />
        </div>

        <!-- Content -->
        {#if isLoading}
            <div class="flex items-center justify-center h-64">
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-torra-orange"></div>
                    <p class="mt-2 text-gray-500">Carregando lockers...</p>
                </div>
            </div>
        {:else if error}
            <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-6">
                {error}
            </div>
        {:else}
            <div class="mt-6" in:fly={{ y: 20, duration: 500, delay: 300 }}>
                <LockerGrid
                        {lockers}
                        on:statusChange={e => handleStatusChange(e.detail.locker, e.detail.status)}
                />
            </div>
        {/if}
    </div>

    <!-- Add Modal -->
    {#if showAddModal}
        <AddLockerModal
                on:confirm={e => handleAddLocker(e.detail)}
                on:close={() => showAddModal = false}
        />
    {/if}
</MainLayout>
