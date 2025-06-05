<script>
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition';
    import MainLayout from '../../../layouts/MainLayout.svelte';
    import StatsCard from '../components/StatsCard.svelte';
    import OrdersChart from '../components/OrdersChart.svelte';
    import RecentOrders from '../components/RecentOrders.svelte';
    import {dashboardService} from '../../../api/services/dashboard.service';

    let stats = {
        todayOrders: 0,
        pendingPickups: 0,
        availableLockers: 0,
        monthlyOrders: 0
    };

    let isLoading = true;
    let error = null;

    onMount(async () => {
        try {
            const response = await dashboardService.getStats();
            if (response.success) {
                stats = response.data;
            }
        } catch (err) {
            error = 'Erro ao carregar dados do dashboard';
        } finally {
            isLoading = false;
        }
    });
</script>

<MainLayout>
    <div class="page-container">
        <div class="mb-8" in:fly={{ y: -20, duration: 500 }}>
            <h1 class="text-2xl font-bold text-torra-dark">Dashboard</h1>
            <p class="text-torra-gray-500">Visão geral do sistema Click & Retire</p>
        </div>

        {#if isLoading}
            <div class="flex items-center justify-center h-64">
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-torra-orange"></div>
                    <p class="mt-2 text-torra-gray-500">Carregando dados...</p>
                </div>
            </div>
        {:else if error}
            <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
            </div>
        {:else}
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div in:fly={{ y: 20, duration: 500, delay: 100 }}>
                    <StatsCard
                            title="Pedidos Hoje"
                            value={stats.todayOrders}
                            icon="package"
                            trend="+12%"
                            trendUp={true}
                    />
                </div>

                <div in:fly={{ y: 20, duration: 500, delay: 200 }}>
                    <StatsCard
                            title="Aguardando Retirada"
                            value={stats.pendingPickups}
                            icon="clock"
                            trend="-5%"
                            trendUp={false}
                    />
                </div>

                <div in:fly={{ y: 20, duration: 500, delay: 300 }}>
                    <StatsCard
                            title="Lockers Disponíveis"
                            value={stats.availableLockers}
                            icon="archive"
                            trend="0%"
                    />
                </div>

                <div in:fly={{ y: 20, duration: 500, delay: 400 }}>
                    <StatsCard
                            title="Pedidos no Mês"
                            value={stats.monthlyOrders}
                            icon="calendar"
                            trend="+18%"
                            trendUp={true}
                    />
                </div>
            </div>

            <!-- Charts and Tables -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2" in:fly={{ x: -20, duration: 500, delay: 500 }}>
                    <OrdersChart/>
                </div>

                <div in:fly={{ x: 20, duration: 500, delay: 600 }}>
                    <RecentOrders/>
                </div>
            </div>
        {/if}
    </div>
</MainLayout>