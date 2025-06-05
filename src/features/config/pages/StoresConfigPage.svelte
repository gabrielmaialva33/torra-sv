<script>
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition';
    import MainLayout from '../../../layouts/MainLayout.svelte';
    import StoresTable from '../components/StoresTable.svelte';
    import AddStoreModal from '../components/AddStoreModal.svelte';
    import EditStoreModal from '../components/EditStoreModal.svelte';
    import {configService} from '../../../api/services/config.service';

    let stores = [];
    let isLoading = true;
    let error = null;
    let showAddModal = false;
    let showEditModal = false;
    let selectedStore = null;

    onMount(async () => {
        await loadStores();
    });

    async function loadStores() {
        try {
            isLoading = true;
            const response = await configService.getStores();

            if (response.success) {
                stores = response.data;
            } else {
                error = response.error;
            }
        } catch (err) {
            error = 'Erro ao carregar lojas';
        } finally {
            isLoading = false;
        }
    }

    function handleAdd() {
        showAddModal = true;
    }

    function handleEdit(store) {
        selectedStore = store;
        showEditModal = true;
    }

    async function handleDelete(store) {
        if (confirm(`Deseja realmente excluir a loja ${store.name}? Esta ação não pode ser desfeita.`)) {
            try {
                const response = await configService.deleteStore(store.id);
                if (response.success) {
                    await loadStores();
                }
            } catch (err) {
                console.error('Erro ao excluir loja:', err);
            }
        }
    }

    async function handleAddStore(data) {
        try {
            const response = await configService.createStore(data);
            if (response.success) {
                await loadStores();
                showAddModal = false;
            }
        } catch (err) {
            console.error('Erro ao adicionar loja:', err);
        }
    }

    async function handleEditStore(data) {
        try {
            const response = await configService.updateStore(selectedStore.id, data);
            if (response.success) {
                await loadStores();
                showEditModal = false;
            }
        } catch (err) {
            console.error('Erro ao atualizar loja:', err);
        }
    }
</script>

<MainLayout>
    <div class="page-container">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6" in:fly={{ y: -20, duration: 500 }}>
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Configuração de Lojas</h1>
                <p class="text-gray-600 mt-1">Gerencie as lojas do sistema</p>
            </div>
            <button
                    class="px-4 py-2 bg-torra-orange text-white rounded-lg hover:bg-torra-orange-dark transition-colors"
                    on:click={handleAdd}
            >
                Adicionar Loja
            </button>
        </div>

        <!-- Content -->
        {#if isLoading}
            <div class="flex items-center justify-center h-64">
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-torra-orange"></div>
                    <p class="mt-2 text-gray-500">Carregando lojas...</p>
                </div>
            </div>
        {:else if error}
            <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
            </div>
        {:else}
            <div in:fly={{ y: 20, duration: 500 }}>
                <StoresTable
                        {stores}
                        on:edit={e => handleEdit(e.detail)}
                        on:delete={e => handleDelete(e.detail)}
                />
            </div>
        {/if}
    </div>

    <!-- Modals -->
    {#if showAddModal}
        <AddStoreModal
                on:confirm={e => handleAddStore(e.detail)}
                on:close={() => showAddModal = false}
        />
    {/if}

    {#if showEditModal}
        <EditStoreModal
                store={selectedStore}
                on:confirm={e => handleEditStore(e.detail)}
                on:close={() => showEditModal = false}
        />
    {/if}
</MainLayout>
