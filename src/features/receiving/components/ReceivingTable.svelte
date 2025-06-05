<script>
    import {createEventDispatcher} from 'svelte';
    import {Check, Eye, Package, X} from 'lucide-svelte';
    import RejectOrderModal from './RejectOrderModal.svelte';

    export let orders = [];
    export let showActions = true;

    const dispatch = createEventDispatcher();

    let showRejectModal = false;
    let selectedOrder = null;

    function handleReceive(order) {
        if (confirm(`Confirma o recebimento do pedido #${order.code}?`)) {
            dispatch('receive', order);
        }
    }

    function handleReject(order) {
        selectedOrder = order;
        showRejectModal = true;
    }

    function confirmReject(reason) {
        dispatch('reject', {order: selectedOrder, reason});
        showRejectModal = false;
        selectedOrder = null;
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
                    Itens
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Envio
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nota Fiscal
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                </th>
                {#if showActions}
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                    </th>
                {/if}
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            {#each orders as order}
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.code}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customerName}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="flex items-center">
                            <Package class="h-4 w-4 mr-1 text-gray-400"/>
                            {order.items} {order.items === 1 ? 'item' : 'itens'}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.sentAt)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.invoiceNumber || '-'}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {#if order.status === 'received'}
                <span class="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Recebido
                </span>
                        {:else}
                <span class="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Aguardando
                </span>
                        {/if}
                    </td>
                    {#if showActions}
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex space-x-2">
                                <button
                                        on:click={() => dispatch('view', order)}
                                        class="text-torra-purple hover:text-torra-purple-dark transition-colors"
                                        title="Visualizar"
                                >
                                    <Eye class="h-4 w-4"/>
                                </button>
                                <button
                                        on:click={() => handleReceive(order)}
                                        class="text-green-600 hover:text-green-900 transition-colors"
                                        title="Receber"
                                >
                                    <Check class="h-4 w-4"/>
                                </button>
                                <button
                                        on:click={() => handleReject(order)}
                                        class="text-red-600 hover:text-red-900 transition-colors"
                                        title="Rejeitar"
                                >
                                    <X class="h-4 w-4"/>
                                </button>
                            </div>
                        </td>
                    {/if}
                </tr>
            {:else}
                <tr>
                    <td colspan={showActions ? 7 : 6} class="px-6 py-12 text-center text-gray-500">
                        <div class="flex flex-col items-center">
                            <Package class="w-12 h-12 text-gray-400 mb-4"/>
                            <p class="text-lg font-medium">Nenhum pedido encontrado</p>
                            <p class="mt-1">
                                {#if showActions}
                                    Não há pedidos aguardando recebimento
                                {:else}
                                    Nenhum pedido foi recebido hoje
                                {/if}
                            </p>
                        </div>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

{#if showRejectModal}
    <RejectOrderModal
            order={selectedOrder}
            on:confirm={e => confirmReject(e.detail)}
            on:close={() => showRejectModal = false}
    />
{/if}
