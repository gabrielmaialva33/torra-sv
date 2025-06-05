<script>
  import { Package, Clock, Archive, Calendar, TrendingUp, TrendingDown } from 'lucide-svelte';
  
  export let title = '';
  export let value = 0;
  export let icon = 'package';
  export let trend = null;
  export let trendUp = null;
  
  const icons = {
    package: Package,
    clock: Clock,
    archive: Archive,
    calendar: Calendar
  };
  
  $: IconComponent = icons[icon] || Package;
</script>

<div class="bg-white p-6 rounded-lg shadow-card hover:shadow-lg transition-all duration-300">
  <div class="flex items-center justify-between">
    <div class="flex-1">
      <p class="text-sm text-torra-gray-500 mb-1">{title}</p>
      <p class="text-3xl font-bold text-torra-dark">{value.toLocaleString('pt-BR')}</p>
      
      {#if trend}
        <div class="flex items-center mt-2">
          {#if trendUp === true}
            <TrendingUp class="w-4 h-4 text-green-500 mr-1" />
            <span class="text-sm text-green-500">{trend}</span>
          {:else if trendUp === false}
            <TrendingDown class="w-4 h-4 text-red-500 mr-1" />
            <span class="text-sm text-red-500">{trend}</span>
          {:else}
            <span class="text-sm text-torra-gray-400">{trend}</span>
          {/if}
          <span class="text-xs text-torra-gray-400 ml-1">vs mês anterior</span>
        </div>
      {/if}
    </div>
    
    <div class="w-12 h-12 bg-torra-orange/10 rounded-lg flex items-center justify-center">
      <svelte:component this={IconComponent} class="w-6 h-6 text-torra-orange" />
    </div>
  </div>
</div>