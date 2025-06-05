<script>
  export let type = 'text';
  export let placeholder = '';
  export let value = '';
  export let icon = 'user';
  export let required = false;
  
  let focused = false;
  let inputElement;
</script>

<div class="relative flex w-full h-[45px] group">
  <!-- Icon Container -->
  <div class="flex items-center justify-center w-[39.8px] h-full 
              bg-[#F0F0F2] border border-[#E3E4E9] 
              border-r-0 rounded-l-[3px]
              transition-colors duration-200
              {focused ? 'border-[#FF5101] bg-[#FFF5F0]' : ''}">
    <div class="w-[15px] h-[15px] flex items-center justify-center transition-opacity duration-200
                {focused ? 'opacity-100' : 'opacity-60'}">
      {#if icon === 'user'}
        <!-- User icon -->
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6.5C7.65625 6.5 9 5.15625 9 3.5C9 1.84375 7.65625 0.5 6 0.5C4.34375 0.5 3 1.84375 3 3.5C3 5.15625 4.34375 6.5 6 6.5ZM6 8C3.99375 8 0 9.00625 0 11V12.5H12V11C12 9.00625 8.00625 8 6 8Z" 
                fill="{focused ? '#FF5101' : '#495057'}"/>
        </svg>
      {:else}
        <!-- Lock icon -->
        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.125 5H9.5V3.5C9.5 1.8425 8.1575 0.5 6.5 0.5C4.8425 0.5 3.5 1.8425 3.5 3.5V5H2.875C2.115 5 1.5 5.615 1.5 6.375V11.625C1.5 12.385 2.115 13 2.875 13H10.125C10.885 13 11.5 12.385 11.5 11.625V6.375C11.5 5.615 10.885 5 10.125 5ZM6.5 10.25C5.74 10.25 5.125 9.635 5.125 8.875C5.125 8.115 5.74 7.5 6.5 7.5C7.26 7.5 7.875 8.115 7.875 8.875C7.875 9.635 7.26 10.25 6.5 10.25ZM8.3125 5H4.6875V3.5C4.6875 2.465 5.465 1.6875 6.5 1.6875C7.535 1.6875 8.3125 2.465 8.3125 3.5V5Z" 
                fill="{focused ? '#FF5101' : '#495057'}"/>
        </svg>
      {/if}
    </div>
  </div>
  
  <!-- Input Field -->
  <input
    bind:this={inputElement}
    {type}
    {placeholder}
    bind:value
    {required}
    on:focus={() => focused = true}
    on:blur={() => focused = false}
    class="flex-1 h-full px-3 font-roboto text-[15px] leading-[17.578px] text-[#1A1630]
           placeholder:text-[#6C757D] bg-white
           border border-[#EBECF1] border-l-0 rounded-r-[5px]
           outline-none transition-all duration-200
           {focused ? 'border-[#FF5101] shadow-[0_0_0_3px_rgba(255,81,1,0.08)]' : 'hover:border-[#D6D7DC]'}"
    style="font-weight: 400;"
  />
</div>

<style>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: #1A1630;
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    transition: background-color 5000s ease-in-out 0s;
  }
</style>
