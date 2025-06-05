<script>
    import {Archive, BarChart, CheckCircle} from 'lucide-svelte';

    export let stats = {
        total: 0,
        available: 0,
        occupied: 0,
        maintenance: 0
    };
    export let isLoading = false;

    $: occupancyRate = stats.total > 0 ? Math.round((stats.occupied / stats.total) * 100) : 0;
</script>

<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <!-- Total -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Total de Lockers</p>
                <p class="mt-2 text-3xl font-bold text-gray-900">
                    {#if isLoading}
                        <span class="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse"></span>
                    {:else}
                        {stats.total}
                    {/if}
                </p>
            </div>
            <div class="p-3 bg-gray-100 rounded-full">
                <Archive class="h-6 w-6 text-gray-600"/>
            </div>
        </div>
    </div>

    <!-- Available -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Disponíveis</p>
                <p class="mt-2 text-3xl font-bold text-green-600">
                    {#if isLoading}
                        <span class="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse"></span>
                    {:else}
                        {stats.available}
                    {/if}
                </p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
                <CheckCircle class="h-6 w-6 text-green-600"/>
            </div>
        </div>
    </div>

    <!-- Occupied -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Ocupados</p>
                <p class="mt-2 text-3xl font-bold text-blue-600">
                    {#if isLoading}
                        <span class="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse"></span>
                    {:else}
                        {stats.occupied}
                    {/if}
                </p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
                <Archive class="h-6 w-6 text-blue-600"/>
            </div>
        </div>
    </div>

    <!-- Occupancy Rate -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-600">Taxa de Ocupação</p>
                <p class="mt-2 text-3xl font-bold text-torra-purple">
                    {#if isLoading}
                        <span class="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse"></span>
                    {:else}
                        {occupancyRate}%
                    {/if}
                </p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
                <BarChart class="h-6 w-6 text-torra-purple"/>
            </div>
        </div>

        <!-- Progress Bar -->
        {#if !isLoading}
            <div class="mt-4">
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                            class="h-2 rounded-full transition-all duration-500 {
              occupancyRate > 80 ? 'bg-red-500' : 
              occupancyRate > 60 ? 'bg-yellow-500' : 
              'bg-green-500'
            }"
                            style="width: {occupancyRate}%"
                    ></div>
                </div>
            </div>
        {/if}
    </div>
</div>
