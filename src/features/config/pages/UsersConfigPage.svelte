<script>
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition';
    import MainLayout from '../../../layouts/MainLayout.svelte';
    import UsersTable from '../components/UsersTable.svelte';
    import AddUserModal from '../components/AddUserModal.svelte';
    import EditUserModal from '../components/EditUserModal.svelte';
    import {configService} from '../../../api/services/config.service';

    let users = [];
    let stores = [];
    let isLoading = true;
    let error = null;
    let showAddModal = false;
    let showEditModal = false;
    let selectedUser = null;

    onMount(async () => {
        await loadData();
    });

    async function loadData() {
        try {
            isLoading = true;

            const [usersResponse, storesResponse] = await Promise.all([
                configService.getUsers(),
                configService.getStores()
            ]);

            if (usersResponse.success) {
                users = usersResponse.data;
            }

            if (storesResponse.success) {
                stores = storesResponse.data;
            }
        } catch (err) {
            error = 'Erro ao carregar dados';
        } finally {
            isLoading = false;
        }
    }

    function handleAdd() {
        showAddModal = true;
    }

    function handleEdit(user) {
        selectedUser = user;
        showEditModal = true;
    }

    async function handleDelete(user) {
        if (confirm(`Deseja realmente excluir o usuário ${user.name}? Esta ação não pode ser desfeita.`)) {
            try {
                const response = await configService.deleteUser(user.id);
                if (response.success) {
                    await loadData();
                }
            } catch (err) {
                console.error('Erro ao excluir usuário:', err);
            }
        }
    }

    async function handleToggleStatus(user) {
        try {
            const response = await configService.updateUser(user.id, {
                ...user,
                active: !user.active
            });
            if (response.success) {
                await loadData();
            }
        } catch (err) {
            console.error('Erro ao alterar status:', err);
        }
    }

    async function handleAddUser(data) {
        try {
            const response = await configService.createUser(data);
            if (response.success) {
                await loadData();
                showAddModal = false;
            }
        } catch (err) {
            console.error('Erro ao adicionar usuário:', err);
        }
    }

    async function handleEditUser(data) {
        try {
            const response = await configService.updateUser(selectedUser.id, data);
            if (response.success) {
                await loadData();
                showEditModal = false;
            }
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err);
        }
    }
</script>

<MainLayout>
    <div class="page-container">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6" in:fly={{ y: -20, duration: 500 }}>
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Configuração de Usuários</h1>
                <p class="text-gray-600 mt-1">Gerencie os usuários do sistema</p>
            </div>
            <button
                    class="px-4 py-2 bg-torra-orange text-white rounded-lg hover:bg-torra-orange-dark transition-colors"
                    on:click={handleAdd}
            >
                Adicionar Usuário
            </button>
        </div>

        <!-- Content -->
        {#if isLoading}
            <div class="flex items-center justify-center h-64">
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-torra-orange"></div>
                    <p class="mt-2 text-gray-500">Carregando usuários...</p>
                </div>
            </div>
        {:else if error}
            <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
            </div>
        {:else}
            <div in:fly={{ y: 20, duration: 500 }}>
                <UsersTable
                        {users}
                        {stores}
                        on:edit={e => handleEdit(e.detail)}
                        on:delete={e => handleDelete(e.detail)}
                        on:toggleStatus={e => handleToggleStatus(e.detail)}
                />
            </div>
        {/if}
    </div>

    <!-- Modals -->
    {#if showAddModal}
        <AddUserModal
                {stores}
                on:confirm={e => handleAddUser(e.detail)}
                on:close={() => showAddModal = false}
        />
    {/if}

    {#if showEditModal}
        <EditUserModal
                user={selectedUser}
                {stores}
                on:confirm={e => handleEditUser(e.detail)}
                on:close={() => showEditModal = false}
        />
    {/if}
</MainLayout>
