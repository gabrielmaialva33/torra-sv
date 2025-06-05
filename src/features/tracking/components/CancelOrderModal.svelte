<script>
    import {createEventDispatcher} from 'svelte';
    import {fade, fly} from 'svelte/transition';
    import {AlertTriangle, X} from 'lucide-svelte';

    export let order = null;

    const dispatch = createEventDispatcher();

    let reason = '';
    let isLoading = false;

    function handleConfirm() {
        if (!reason.trim()) {
            alert('Por favor, informe o motivo do cancelamento');
            return;
        }

        dispatch('confirm', reason);
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
            class="bg-white rounded-lg shadow-xl max-w-md w-full"
            on:click|stopPropagation
            transition:fly={{ y: 20, duration: 300 }}
    >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center space-x-3">
                <div class="p-2 bg-red-100 rounded-full">
                    <AlertTriangle class="h-6 w-6 text-red-600"/>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Cancelar Pedido</h3>
            </div>
            <button
                    class="text-gray-400 hover:text-gray-500 transition-colors"
                    on:click={handleClose}
            >
                <X class="h-5 w-5"/>
            </button>
        </div>

        <!-- Content -->
        <div class="p-6">
            <div class="mb-4">
                <p class="text-sm text-gray-600">
                    Você está prestes a cancelar o pedido:
                </p>
                <p class="mt-2 font-medium text-gray-900">
                    #{order?.code} - {order?.customerName}
                </p>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="reason">
                    Motivo do cancelamento <span class="text-red-500">*</span>
                </label>
                <textarea
                        bind:value={reason}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        disabled={isLoading}
                        id="reason"
                        placeholder="Descreva o motivo do cancelamento..."
                        rows="4"
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
                Voltar
            </button>
            <button
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading || !reason.trim()}
                    on:click={handleConfirm}
            >
                {isLoading ? 'Cancelando...' : 'Confirmar Cancelamento'}
            </button>
        </div>
    </div>
</div>
