<script>
  import { createEventDispatcher } from 'svelte';
  import { cn } from '../../lib/utils';
  
  export let type = 'text';
  export let value = '';
  export let placeholder = '';
  export let icon = null;
  export let disabled = false;
  export let error = '';
  export let className = '';
  
  const dispatch = createEventDispatcher();
  
  let inputElement;
  let isFocused = false;
  
  function handleFocus() {
    isFocused = true;
    dispatch('focus');
  }
  
  function handleBlur() {
    isFocused = false;
    dispatch('blur');
  }
  
  function handleKeydown(event) {
    dispatch('keydown', event);
  }
  
  export function focus() {
    inputElement?.focus();
  }
</script>

<div class="w-full">
  <div 
    class={cn(
      "flex h-[45px] rounded overflow-hidden transition-all duration-200",
      isFocused ? "ring-2 ring-torra-orange/20" : "",
      error ? "ring-2 ring-red-500/20" : "",
      disabled ? "opacity-50 cursor-not-allowed" : "",
      className
    )}
  >
    {#if icon}
      <div 
        class={cn(
          "flex items-center justify-center w-[40px] bg-[#F0F0F2] border border-r-0 rounded-l-[3px] transition-all duration-200",
          isFocused ? "border-torra-orange bg-torra-orange/5" : "border-[#E3E4E9]",
          error ? "border-red-500" : ""
        )}
      >
        <svelte:component 
          this={icon} 
          class={cn(
            "w-[15px] h-[15px] transition-colors duration-200",
            isFocused ? "text-torra-orange" : "text-[#495057]",
            error ? "text-red-500" : ""
          )}
        />
      </div>
    {/if}
    
    <input
      bind:this={inputElement}
      {type}
      bind:value
      {placeholder}
      {disabled}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:keydown={handleKeydown}
      on:input
      on:change
      class={cn(
        "flex-1 px-3 text-[15px] font-roboto text-[#6C757D] placeholder-[#6C757D]",
        "border rounded-r-[5px] transition-all duration-200",
        "focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50",
        isFocused ? "border-torra-orange text-torra-dark" : "border-[#EBECF1]",
        error ? "border-red-500" : "",
        !icon ? "rounded-l-[3px]" : ""
      )}
    />
  </div>
  
  {#if error}
    <p class="mt-1 text-xs text-red-500">{error}</p>
  {/if}
</div>