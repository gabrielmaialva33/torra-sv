<script>
    import {createEventDispatcher} from 'svelte';
    import {Edit, Eye, X} from 'lucide-svelte';

    export let orders = [];

    const dispatch = createEventDispatcher();

    function getStatusBadge(status) {
        const statusConfig = {
            sent: {label: 'Enviado', color: 'bg-blue-100 text-blue-800'},
            received: {label: 'Recebido', color: 'bg-indigo-100 text-indigo-800'},
            checked: {label: 'Conferido', color: 'bg-purple-100 text-purple-800'},
            stored: {label: 'Armazenado', color: 'bg-yellow-100 text-yellow-800'},
            ready: {label: 'Pronto', color: 'bg-green-100 text-green-800'},
            picked: {label: 'Retirado', color: 'bg-gray-100 text-gray-800'},
            cancelled: {label: 'Cancelado', color: 'bg-red-100 text-red-800'}
        };

        return statusConfig[status] || {label: status, color: 'bg-gray-100 text-gray-800'};
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
                    Código
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loja
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Pedido
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            {#each orders as order}
                {@const statusConfig = getStatusBadge(order.status)}
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.code}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customerName}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customerCpf}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex px-2 text-xs leading-5 font-semibold rounded-full {statusConfig.color}">
                            {statusConfig.label}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.storeName}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            <button
                                    on:click={() => dispatch('view', order)}
                                    class="text-torra-purple hover:text-torra-purple-dark transition-colors"
                                    title="Visualizar"
                            >
                                <Eye class="h-4 w-4"/>
                            </button>
                            {#if order.status !== 'cancelled' && order.status !== 'picked'}
                                <button
                                        on:click={() => dispatch('edit', order)}
                                        class="text-blue-600 hover:text-blue-900 transition-colors"
                                        title="Editar"
                                >
                                    <Edit class="h-4 w-4"/>
                                </button>
                                <button
                                        on:click={() => dispatch('cancel', order)}
                                        class="text-red-600 hover:text-red-900 transition-colors"
                                        title="Cancelar"
                                >
                                    <X class="h-4 w-4"/>
                                </button>
                            {/if}
                        </div>
                    </td>
                </tr>
            {:else}
                <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                        <div class="flex flex-col items-center">
                            <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            <p class="text-lg font-medium">Nenhum pedido encontrado</p>
                            <p class="mt-1">Tente ajustar os filtros de busca</p>
                        </div>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
