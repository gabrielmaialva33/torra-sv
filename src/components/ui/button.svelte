<script>
  import { cva } from "class-variance-authority";
  import { cn } from "$lib/utils";
  
  export let variant = "default";
  export let size = "default";
  export let className = "";
  export let disabled = false;
  export let href = null;
  export let loading = false;
  
  const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torra-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default:
            "bg-torra-orange text-white shadow hover:bg-torra-orange-light hover:shadow-lg hover:scale-105",
          destructive:
            "bg-red-500 text-white shadow-sm hover:bg-red-600",
          outline:
            "border border-torra-gray-400 bg-white shadow-sm hover:bg-torra-gray-100 hover:border-torra-orange",
          secondary:
            "bg-torra-gray-200 text-torra-dark shadow-sm hover:bg-torra-gray-300",
          ghost: "hover:bg-torra-gray-100 hover:text-torra-orange",
          link: "text-torra-orange underline-offset-4 hover:underline",
        },
        size: {
          default: "h-11 px-6 py-2",
          sm: "h-9 rounded-md px-3 text-xs",
          lg: "h-12 rounded-md px-8 text-base",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  );
  
  $: computedClass = cn(buttonVariants({ variant, size }), className);
  $: tag = href ? 'a' : 'button';
</script>

<!-- Dynamic element based on href prop -->
{#if tag === 'a'}
  <a 
    {href}
    class={computedClass}
    {disabled}
    on:click
    {...$$restProps}
  >
    {#if loading}
      <svg 
        class="animate-spin -ml-1 mr-2 h-4 w-4" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          class="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          stroke-width="4"
        />
        <path 
          class="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    {/if}
    <slot />
  </a>
{:else}
  <button 
    type="button"
    class={computedClass}
    {disabled}
    on:click
    {...$$restProps}
  >
    {#if loading}
      <svg 
        class="animate-spin -ml-1 mr-2 h-4 w-4" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          class="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          stroke-width="4"
        />
        <path 
          class="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    {/if}
    <slot />
  </button>
{/if}