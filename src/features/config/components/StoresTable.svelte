<script>
    import {createEventDispatcher} from 'svelte';
    import {Clock, Edit, MapPin, Phone, Trash2} from 'lucide-svelte';

    export let stores = [];

    const dispatch = createEventDispatcher();
</script>

<div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loja
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Endereço
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horário
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
            {#each stores as store}
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div>
                            <div class="text-sm font-medium text-gray-900">
                                {store.name}
                            </div>
                            <div class="text-sm text-gray-500">
                                CNPJ: {store.cnpj}
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-start space-x-1">
                            <MapPin class="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0"/>
                            <div class="text-sm text-gray-900">
                                {store.address}<br/>
                                {store.city} - {store.state}<br/>
                                CEP: {store.zipCode}
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="space-y-1">
                            <div class="flex items-center text-sm text-gray-900">
                                <Phone class="h-4 w-4 text-gray-400 mr-1"/>
                                {store.phone}
                            </div>
                            {#if store.manager}
                                <div class="text-sm text-gray-500">
                                    Gerente: {store.manager}
                                </div>
                            {/if}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center text-sm text-gray-900">
                            <Clock class="h-4 w-4 text-gray-400 mr-1"/>
                            {store.openingHours}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {#if store.active}
                <span class="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Ativa
                </span>
                        {:else}
                <span class="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Inativa
                </span>
                        {/if}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            <button
                                    on:click={() => dispatch('edit', store)}
                                    class="text-blue-600 hover:text-blue-900 transition-colors"
                                    title="Editar"
                            >
                                <Edit class="h-4 w-4"/>
                            </button>
                            <button
                                    on:click={() => dispatch('delete', store)}
                                    class="text-red-600 hover:text-red-900 transition-colors"
                                    title="Excluir"
                            >
                                <Trash2 class="h-4 w-4"/>
                            </button>
                        </div>
                    </td>
                </tr>
            {:else}
                <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                        <div class="flex flex-col items-center">
                            <MapPin class="h-12 w-12 text-gray-400 mb-4"/>
                            <p class="text-lg font-medium">Nenhuma loja cadastrada</p>
                            <p class="mt-1">Adicione a primeira loja para começar</p>
                        </div>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
