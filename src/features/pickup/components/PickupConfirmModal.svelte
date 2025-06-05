<script>
    import {createEventDispatcher} from 'svelte';
    import {fade, fly} from 'svelte/transition';
    import {CheckCircle, MessageSquare, X} from 'lucide-svelte';

    export let order = null;

    const dispatch = createEventDispatcher();

    let confirmationMethod = 'document';
    let documentNumber = '';
    let sendWhatsApp = false;

    function handleConfirm() {
        if (confirmationMethod === 'document' && !documentNumber.trim()) {
            alert('Por favor, informe o documento');
            return;
        }

        dispatch('confirm', {
            method: confirmationMethod,
            document: documentNumber,
            sendWhatsApp
        });
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
                <div class="p-2 bg-green-100 rounded-full">
                    <CheckCircle class="h-6 w-6 text-green-600"/>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Confirmar Retirada</h3>
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
            <!-- Order Info -->
            <div class="mb-6">
                <p class="text-sm text-gray-600">Confirmar retirada do pedido:</p>
                <div class="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium text-gray-900">Pedido #{order?.code}</p>
                    <p class="text-sm text-gray-600 mt-1">{order?.customerName}</p>
                    {#if order?.lockerNumber}
                        <p class="text-sm text-gray-600">Locker {order.lockerNumber}</p>
                    {/if}
                </div>
            </div>

            <!-- Confirmation Method -->
            <div class="space-y-4">
                <p class="text-sm font-medium text-gray-700">Método de confirmação</p>

                <label class="flex items-center space-x-3 cursor-pointer">
                    <input
                            bind:group={confirmationMethod}
                            class="h-4 w-4 text-torra-orange focus:ring-torra-orange"
                            type="radio"
                            value="document"
                    />
                    <span class="text-sm text-gray-700">Documento com foto</span>
                </label>

                <label class="flex items-center space-x-3 cursor-pointer">
                    <input
                            bind:group={confirmationMethod}
                            class="h-4 w-4 text-torra-orange focus:ring-torra-orange"
                            type="radio"
                            value="code"
                    />
                    <span class="text-sm text-gray-700">Código de retirada</span>
                </label>

                {#if confirmationMethod === 'document'}
                    <div class="mt-4">
                        <label for="document" class="block text-sm font-medium text-gray-700 mb-1">
                            Número do documento
                        </label>
                        <input
                                type="text"
                                id="document"
                                bind:value={documentNumber}
                                placeholder="RG, CNH ou outro documento"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                        />
                    </div>
                {/if}
            </div>

            <!-- WhatsApp Option -->
            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                <label class="flex items-start space-x-3 cursor-pointer">
                    <input
                            bind:checked={sendWhatsApp}
                            class="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                            type="checkbox"
                    />
                    <div class="flex-1">
                        <div class="flex items-center space-x-2">
                            <MessageSquare class="h-4 w-4 text-blue-600"/>
                            <span class="text-sm font-medium text-blue-900">
                Enviar confirmação por WhatsApp
              </span>
                        </div>
                        <p class="text-xs text-blue-700 mt-1">
                            O cliente receberá uma mensagem confirmando a retirada
                        </p>
                    </div>
                </label>
            </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg">
            <button
                    class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    on:click={handleClose}
            >
                Cancelar
            </button>
            <button
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    on:click={handleConfirm}
            >
                Confirmar Retirada
            </button>
        </div>
    </div>
</div>
