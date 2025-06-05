<script>
    import {createEventDispatcher} from 'svelte';
    import {fade, fly} from 'svelte/transition';
    import {Edit2, X} from 'lucide-svelte';

    export let order = null;

    const dispatch = createEventDispatcher();

    let formData = {
        customerName: order?.customerName || '',
        customerPhone: order?.customerPhone || '',
        customerEmail: order?.customerEmail || '',
        notes: order?.notes || ''
    };

    let isLoading = false;

    function handleConfirm() {
        dispatch('confirm', formData);
    }

    function handleClose() {
        dispatch('close');
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        on:click={handleClose}
        transition:fade={{ duration: 200 }}
>
    <div
            class="bg-white rounded-lg shadow-xl max-w-lg w-full"
            on:click|stopPropagation
            transition:fly={{ y: 20, duration: 300 }}
    >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 rounded-full">
                    <Edit2 class="h-6 w-6 text-blue-600"/>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Editar Pedido</h3>
            </div>
            <button
                    class="text-gray-400 hover:text-gray-500 transition-colors"
                    on:click={handleClose}
            >
                <X class="h-5 w-5"/>
            </button>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
            <div>
                <p class="text-sm text-gray-600 mb-4">
                    Pedido #{order?.code}
                </p>
            </div>

            <!-- Customer Name -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="customerName">
                    Nome do Cliente
                </label>
                <input
                        bind:value={formData.customerName}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                        id="customerName"
                        type="text"
                />
            </div>

            <!-- Phone -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="customerPhone">
                    Telefone
                </label>
                <input
                        bind:value={formData.customerPhone}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                        id="customerPhone"
                        placeholder="(00) 00000-0000"
                        type="tel"
                />
            </div>

            <!-- Email -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="customerEmail">
                    E-mail
                </label>
                <input
                        bind:value={formData.customerEmail}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                        id="customerEmail"
                        placeholder="cliente@email.com"
                        type="email"
                />
            </div>

            <!-- Notes -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="notes">
                    Observações
                </label>
                <textarea
                        bind:value={formData.notes}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        disabled={isLoading}
                        id="notes"
                        placeholder="Observações adicionais..."
                        rows="3"
                />
            </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg">
            <button
                    class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                    on:click={handleClose}
            >
                Cancelar
            </button>
            <button
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                    on:click={handleConfirm}
            >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
        </div>
    </div>
</div>
