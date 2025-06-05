<script>
    import {createEventDispatcher} from 'svelte';
    import {fade, fly} from 'svelte/transition';
    import {Plus, X} from 'lucide-svelte';

    const dispatch = createEventDispatcher();

    let formData = {
        number: '',
        size: 'M',
        quantity: 1
    };

    function handleConfirm() {
        if (!formData.number.trim()) {
            alert('Por favor, informe o número do locker');
            return;
        }

        // If quantity > 1, create multiple lockers
        const lockers = [];
        const baseNumber = parseInt(formData.number);

        for (let i = 0; i < formData.quantity; i++) {
            lockers.push({
                number: String(baseNumber + i),
                size: formData.size
            });
        }

        dispatch('confirm', lockers);
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
                <div class="p-2 bg-torra-orange bg-opacity-10 rounded-full">
                    <Plus class="h-6 w-6 text-torra-orange"/>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Adicionar Locker</h3>
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
            <!-- Number -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="number">
                    Número inicial <span class="text-red-500">*</span>
                </label>
                <input
                        bind:value={formData.number}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                        id="number"
                        min="1"
                        placeholder="Ex: 51"
                        type="number"
                />
                <p class="mt-1 text-xs text-gray-500">
                    Se adicionar múltiplos lockers, serão numerados sequencialmente
                </p>
            </div>

            <!-- Size -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="size">
                    Tamanho
                </label>
                <select
                        bind:value={formData.size}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                        id="size"
                >
                    <option value="P">Pequeno (P)</option>
                    <option value="M">Médio (M)</option>
                    <option value="G">Grande (G)</option>
                </select>
            </div>

            <!-- Quantity -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="quantity">
                    Quantidade
                </label>
                <input
                        bind:value={formData.quantity}
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-torra-orange focus:border-transparent"
                        id="quantity"
                        max="50"
                        min="1"
                        type="number"
                />
            </div>

            <!-- Preview -->
            {#if formData.number && formData.quantity > 1}
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="text-sm text-gray-600 mb-2">Serão criados os lockers:</p>
                    <div class="flex flex-wrap gap-1">
                        {#each Array(Math.min(formData.quantity, 10)) as _, i}
              <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white border border-gray-300">
                {parseInt(formData.number) + i}
              </span>
                        {/each}
                        {#if formData.quantity > 10}
              <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-gray-500">
                ... +{formData.quantity - 10} mais
              </span>
                        {/if}
                    </div>
                </div>
            {/if}
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
                    class="px-4 py-2 bg-torra-orange text-white rounded-lg hover:bg-torra-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!formData.number.trim()}
                    on:click={handleConfirm}
            >
                Adicionar {formData.quantity > 1 ? `${formData.quantity} Lockers` : 'Locker'}
            </button>
        </div>
    </div>
</div>
