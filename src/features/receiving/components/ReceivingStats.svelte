<script>
    import {Clock, Package, TrendingUp} from 'lucide-svelte';

    export let stats = {
        pendingCount: 0,
        receivedToday: 0,
        avgReceivingTime: '0h'
    };
    export let isLoading = false;
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Pending Orders -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Aguardando Recebimento</p>
                <p class="mt-2 text-3xl font-bold text-gray-900">
                    {#if isLoading}
                        <span class="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse"></span>
                    {:else}
                        {stats.pendingCount}
                    {/if}
                </p>
            </div>
            <div class="p-3 bg-yellow-100 rounded-full">
                <Package class="h-6 w-6 text-yellow-600"/>
            </div>
        </div>
    </div>

    <!-- Received Today -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Recebidos Hoje</p>
                <p class="mt-2 text-3xl font-bold text-gray-900">
                    {#if isLoading}
                        <span class="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse"></span>
                    {:else}
                        {stats.receivedToday}
                    {/if}
                </p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
                <TrendingUp class="h-6 w-6 text-green-600"/>
            </div>
        </div>
    </div>

    <!-- Average Time -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Tempo Médio Recebimento</p>
                <p class="mt-2 text-3xl font-bold text-gray-900">
                    {#if isLoading}
                        <span class="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse"></span>
                    {:else}
                        {stats.avgReceivingTime}
                    {/if}
                </p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
                <Clock class="h-6 w-6 text-blue-600"/>
            </div>
        </div>
    </div>
</div>
