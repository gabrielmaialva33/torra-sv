<script>
    import {createEventDispatcher} from 'svelte';
    import {Archive, Eye} from 'lucide-svelte';

    export let orders = [];

    const dispatch = createEventDispatcher();

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
                    Locker
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Armazenamento
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tempo no Locker
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
            {#each orders as order}
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.code}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customerName}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {#if order.lockerNumber}
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-torra-purple-light text-white">
                  Locker {order.lockerNumber}
                </span>
                        {:else}
                            <span class="text-gray-500">-</span>
                        {/if}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.storedAt)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {#if order.storedAt}
                            {@const now = new Date()}
                            {@const stored = new Date(order.storedAt)}
                            {@const diffInHours = Math.floor((now - stored) / (1000 * 60 * 60))}
                            {@const diffInDays = Math.floor(diffInHours / 24)}
                            {#if diffInDays > 0}
                  <span class:text-red-600={diffInDays > 30}>
                    {diffInDays} {diffInDays === 1 ? 'dia' : 'dias'}
                  </span>
                            {:else}
                                {diffInHours}h
                            {/if}
                        {:else}
                            -
                        {/if}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {#if order.lockerNumber}
                <span class="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Armazenado
                </span>
                        {:else}
                <span class="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Aguardando Locker
                </span>
                        {/if}
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
                            {#if !order.lockerNumber}
                                <button
                                        on:click={() => dispatch('assign', order)}
                                        class="text-blue-600 hover:text-blue-900 transition-colors"
                                        title="Atribuir Locker"
                                >
                                    <Archive class="h-4 w-4"/>
                                </button>
                            {/if}
                        </div>
                    </td>
                </tr>
            {:else}
                <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                        <div class="flex flex-col items-center">
                            <Archive class="w-12 h-12 text-gray-400 mb-4"/>
                            <p class="text-lg font-medium">Nenhum pedido encontrado</p>
                            <p class="mt-1">Ajuste os filtros para ver mais resultados</p>
                        </div>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
