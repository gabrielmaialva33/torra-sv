<script>
  export let type = 'text';
  export let placeholder = '';
  export let value = '';
  export let icon = null;
  
  // Icon component passed as prop
  $: IconComponent = icon;
</script>

<div class="flex h-[45px]">
  <!-- Icon Container -->
  <div class="w-[40px] bg-[#F0F0F2] border border-[#E3E4E9] border-r-0 rounded-l-[3px] flex items-center justify-center">
    {#if IconComponent}
      <svelte:component this={IconComponent} class="w-[15px] h-[15px] text-[#495057]" />
    {/if}
  </div>
  
  <!-- Input Field -->
  <input
    {type}
    bind:value
    {placeholder}
    class="flex-1 px-3 text-[15px] font-roboto text-[#6C757D] placeholder-[#6C757D] border border-[#EBECF1] rounded-r-[5px] focus:outline-none focus:border-[#FF7B3D] transition-colors duration-200"
  />
</div>