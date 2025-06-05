<script>
    import {createEventDispatcher} from 'svelte';
    import {Edit, Mail, Power, Shield, Trash2, User} from 'lucide-svelte';

    export let users = [];
    export let stores = [];

    const dispatch = createEventDispatcher();

    function getRoleLabel(role) {
        const roles = {
            admin: 'Administrador',
            manager: 'Gerente',
            operator: 'Operador',
            attendant: 'Atendente',
            support: 'Suporte',
            viewer: 'Visualizador'
        };
        return roles[role] || role;
    }

    function getStoreName(storeId) {
        if (!storeId) return 'Todas as lojas';
        const store = stores.find(s => s.id === storeId);
        return store?.name || storeId;
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
</script>

<div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perfil
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loja
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Acesso
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            {#each users as user}
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0">
                                <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User class="h-5 w-5 text-gray-500"/>
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                    {user.name}
                                </div>
                                <div class="text-sm text-gray-500">
                                    @{user.username}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                            <div class="flex items-center">
                                <Mail class="h-4 w-4 text-gray-400 mr-1"/>
                                {user.email}
                            </div>
                        </div>
                        <div class="text-sm text-gray-500">
                            {user.phone}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center text-sm">
                            <Shield class="h-4 w-4 text-gray-400 mr-1"/>
                            <span class="text-gray-900">{getRoleLabel(user.role)}</span>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getStoreName(user.store)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.lastLogin)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button
                                on:click={() => dispatch('toggleStatus', user)}
                                class="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors {
                  user.active
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }"
                        >
                            <Power class="h-3 w-3 mr-1"/>
                            {user.active ? 'Ativo' : 'Inativo'}
                        </button>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            <button
                                    on:click={() => dispatch('edit', user)}
                                    class="text-blue-600 hover:text-blue-900 transition-colors"
                                    title="Editar"
                            >
                                <Edit class="h-4 w-4"/>
                            </button>
                            {#if user.username !== 'admin'}
                                <button
                                        on:click={() => dispatch('delete', user)}
                                        class="text-red-600 hover:text-red-900 transition-colors"
                                        title="Excluir"
                                >
                                    <Trash2 class="h-4 w-4"/>
                                </button>
                            {/if}
                        </div>
                    </td>
                </tr>
            {:else}
                <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                        <div class="flex flex-col items-center">
                            <User class="h-12 w-12 text-gray-400 mb-4"/>
                            <p class="text-lg font-medium">Nenhum usuário cadastrado</p>
                            <p class="mt-1">Adicione o primeiro usuário para começar</p>
                        </div>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
