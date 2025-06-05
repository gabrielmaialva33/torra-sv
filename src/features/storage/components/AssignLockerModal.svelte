<script>
    import {createEventDispatcher} from 'svelte';
    import {fade, fly} from 'svelte/transition';
    import {Archive, X} from 'lucide-svelte';

    export let order = null;
    export let availableLockers = [];

    const dispatch = createEventDispatcher();

    let selectedLocker = '';

    function handleConfirm() {
        if (!selectedLocker) {
            alert('Por favor, selecione um locker');
            return;
        }

        dispatch('confirm', selectedLocker);
    }

    function handleClose() {
        dispatch('close');
    }

    // Group lockers by size
    $: lockersBySize = availableLockers.reduce((acc, locker) => {
        if (!acc[locker.size]) {
            acc[locker.size] = [];
        }
        acc[locker.size].push(locker);
        return acc;
    }, {});
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
                <div class="p-2 bg-blue-100 rounded-full">
                    <Archive class="h-6 w-6 text-blue-600"/>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Atribuir Locker</h3>
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
                    Selecione um locker para o pedido:
                </p>
                <p class="mt-2 font-medium text-gray-900">
                    #{order?.code} - {order?.customerName}
                </p>
            </div>

            <!-- Locker Selection -->
            <div class="space-y-4">
                <p class="block text-sm font-medium text-gray-700">
                    Locker Disponível <span class="text-red-500">*</span>
                </p>

                {#if availableLockers.length === 0}
                    <div class="text-center py-8 text-gray-500">
                        <Archive class="h-12 w-12 mx-auto mb-3 text-gray-400"/>
                        <p>Nenhum locker disponível no momento</p>
                    </div>
                {:else}
                    <div class="space-y-3">
                        {#each Object.entries(lockersBySize) as [size, lockers]}
                            <div>
                                <p class="text-xs font-medium text-gray-500 uppercase mb-2">
                                    Tamanho {size}
                                </p>
                                <div class="grid grid-cols-4 gap-2">
                                    {#each lockers as locker}
                                        <label class="relative">
                                            <input
                                                    type="radio"
                                                    name="locker"
                                                    value={locker.id}
                                                    bind:group={selectedLocker}
                                                    class="sr-only peer"
                                            />
                                            <div class="
                        p-3 border-2 rounded-lg cursor-pointer text-center
                        border-gray-300 hover:border-blue-400
                        peer-checked:border-blue-500 peer-checked:bg-blue-50
                        transition-all
                      ">
                        <span class="font-medium text-gray-900">
                          {locker.number}
                        </span>
                                            </div>
                                        </label>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
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
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedLocker || availableLockers.length === 0}
                    on:click={handleConfirm}
            >
                Confirmar
            </button>
        </div>
    </div>
</div>
