<script>
    import {createEventDispatcher} from 'svelte';
    import {Archive, CheckCircle, Clock, Package, User} from 'lucide-svelte';

    export let order;

    const dispatch = createEventDispatcher();

    function handlePickup() {
        dispatch('pickup');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return 'Hoje';
        } else if (diffInDays === 1) {
            return 'Ontem';
        } else {
            return `${diffInDays} dias atrás`;
        }
    }
</script>

<div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div class="p-6">
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
            <div>
                <h3 class="text-lg font-bold text-gray-900">Pedido #{order.code}</h3>
                <p class="text-sm text-gray-500 mt-1">{order.storeName}</p>
            </div>
            {#if order.status === 'ready'}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle class="h-3 w-3 mr-1"/>
          Pronto
        </span>
            {/if}
        </div>

        <!-- Customer Info -->
        <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm text-gray-600">
                <User class="h-4 w-4 mr-2 text-gray-400"/>
                {order.customerName}
            </div>
            <div class="flex items-center text-sm text-gray-600">
                <Package class="h-4 w-4 mr-2 text-gray-400"/>
                {order.items} {order.items === 1 ? 'item' : 'itens'}
            </div>
            {#if order.lockerNumber}
                <div class="flex items-center text-sm text-gray-600">
                    <Archive class="h-4 w-4 mr-2 text-gray-400"/>
                    Locker {order.lockerNumber}
                </div>
            {/if}
            <div class="flex items-center text-sm text-gray-600">
                <Clock class="h-4 w-4 mr-2 text-gray-400"/>
                Armazenado {formatDate(order.storedAt)}
            </div>
        </div>

        <!-- Warning for old orders -->
        {#if new Date().getTime() - new Date(order.storedAt).getTime() > 30 * 24 * 60 * 60 * 1000}
            <div class="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <p class="text-sm text-red-800">
                    <strong>Atenção:</strong> Pedido há mais de 30 dias no locker
                </p>
            </div>
        {/if}

        <!-- Action Button -->
        <button
                class="w-full py-2 bg-torra-orange text-white font-medium rounded-lg hover:bg-torra-orange-dark transition-colors"
                on:click={handlePickup}
        >
            Registrar Retirada
        </button>
    </div>
</div>
