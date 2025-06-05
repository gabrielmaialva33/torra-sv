<script>
    import {onMount} from 'svelte';
    import {dashboardService} from '../../../api/services/dashboard.service';

    let chartData = null;
    let selectedPeriod = 'week';
    let isLoading = true;

    async function loadChartData(period) {
        isLoading = true;
        const response = await dashboardService.getOrdersChart(period);
        if (response.success) {
            chartData = response.data;
        }
        isLoading = false;
    }

    onMount(() => {
        loadChartData(selectedPeriod);
    });

    function changePeriod(period) {
        selectedPeriod = period;
        loadChartData(period);
    }
</script>

<div class="bg-white rounded-lg shadow-card p-6">
    <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-torra-dark">
            Fluxo de Pedidos
        </h3>

        <div class="flex space-x-2">
            <button
                    class="px-3 py-1 text-sm rounded-lg transition-colors duration-200
               {selectedPeriod === 'week'
                 ? 'bg-torra-orange text-white'
                 : 'text-torra-gray-600 hover:bg-torra-gray-100'}"
                    on:click={() => changePeriod('week')}
            >
                Semana
            </button>
            <button
                    class="px-3 py-1 text-sm rounded-lg transition-colors duration-200
               {selectedPeriod === 'month'
                 ? 'bg-torra-orange text-white'
                 : 'text-torra-gray-600 hover:bg-torra-gray-100'}"
                    on:click={() => changePeriod('month')}
            >
                Mês
            </button>
        </div>
    </div>

    {#if isLoading}
        <div class="h-64 flex items-center justify-center">
            <div class="animate-pulse w-full h-full bg-gray-100 rounded"></div>
        </div>
    {:else if chartData}
        <!-- Simplified chart visualization -->
        <div class="h-64 relative">
            <div class="absolute inset-0 flex items-end justify-between space-x-2">
                {#each chartData.labels as label, i}
                    <div class="flex-1 flex flex-col items-center">
                        <div class="w-full flex flex-col justify-end h-48 space-y-1">
                            <div
                                    class="w-full bg-torra-orange/20 rounded-t"
                                    style="height: {(chartData.datasets[0].data[i] / 60) * 100}%"
                            >
                                <div class="text-xs text-center pt-1 font-medium text-torra-orange">
                                    {chartData.datasets[0].data[i]}
                                </div>
                            </div>
                        </div>
                        <p class="text-xs text-torra-gray-500 mt-2">{label}</p>
                    </div>
                {/each}
            </div>
        </div>

        <div class="flex items-center justify-center mt-4 space-x-6">
            <div class="flex items-center">
                <div class="w-3 h-3 bg-torra-orange rounded mr-2"></div>
                <span class="text-sm text-torra-gray-600">Pedidos Recebidos</span>
            </div>
            <div class="flex items-center">
                <div class="w-3 h-3 bg-torra-purple-light rounded mr-2"></div>
                <span class="text-sm text-torra-gray-600">Pedidos Retirados</span>
            </div>
        </div>
    {/if}
</div>