<script>
  import { onMount } from 'svelte';
  import { Package, Clock, CheckCircle } from 'lucide-svelte';
  import { dashboardService } from '../../../api/services/dashboard.service';
  
  let orders = [];
  let isLoading = true;
  
  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    ready: {
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    picked: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  };
  
  onMount(async () => {
    const response = await dashboardService.getRecentOrders();
    if (response.success) {
      orders = response.data;
    }
    isLoading = false;
  });
</script>

<div class="bg-white rounded-lg shadow-card p-6">
  <h3 class="text-lg font-semibold text-torra-dark mb-4">
    Pedidos Recentes
  </h3>
  
  {#if isLoading}
    <div class="space-y-3">
      {#each Array(3) as _}
        <div class="animate-pulse">
          <div class="h-16 bg-gray-100 rounded"></div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="space-y-3">
      {#each orders as order}
        <div class="flex items-center justify-between p-3 rounded-lg hover:bg-torra-gray-50 
                    transition-colors duration-200 cursor-pointer">
          <div class="flex items-center space-x-3">
            <div class="{statusConfig[order.status].bgColor} p-2 rounded-lg">
              <svelte:component 
                this={statusConfig[order.status].icon} 
                class="w-5 h-5 {statusConfig[order.status].color}"
              />
            </div>
            
            <div>
              <p class="font-medium text-torra-dark">
                Pedido #{order.id}
              </p>
              <p class="text-sm text-torra-gray-500">
                {order.customer} • {order.items} {order.items === 1 ? 'item' : 'itens'}
              </p>
            </div>
          </div>
          
          <div class="text-right">
            <p class="text-sm font-medium {statusConfig[order.status].color}">
              {order.statusLabel}
            </p>
            <p class="text-xs text-torra-gray-400">
              {order.time}
            </p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  
  <button class="w-full mt-4 text-sm text-torra-orange hover:text-torra-orange-light 
                 font-medium transition-colors duration-200">
    Ver todos os pedidos →
  </button>
</div>