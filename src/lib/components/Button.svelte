<script>
  import { spring } from 'svelte/motion';
  import { cn } from '../utils.js';
  
  export let type = 'button';
  export let variant = 'primary';
  export let disabled = false;
  export let loading = false;
  export let className = '';
  
  // Spring animation for smooth hover effects
  const scale = spring(1, { stiffness: 0.1, damping: 0.5 });
  const x = spring(0, { stiffness: 0.1, damping: 0.5 });
  const y = spring(0, { stiffness: 0.1, damping: 0.5 });
  
  let buttonEl;
  let ripples = [];
  
  // Mouse tracking for magnetic effect
  function handleMouseMove(e) {
    if (disabled) return;
    
    const rect = buttonEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    
    // Magnetic effect strength
    const strength = 0.3;
    x.set(distX * strength);
    y.set(distY * strength);
  }
  
  function handleMouseEnter() {
    if (!disabled) scale.set(1.02);
  }
  
  function handleMouseLeave() {
    scale.set(1);
    x.set(0);
    y.set(0);
  }
  
  // Ripple effect on click
  function createRipple(e) {
    if (disabled) return;
    
    const rect = buttonEl.getBoundingClientRect();
    const ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now()
    };
    
    ripples = [...ripples, ripple];
    
    setTimeout(() => {
      ripples = ripples.filter(r => r.id !== ripple.id);
    }, 1000);
  }
  
  $: classes = cn(
    "relative overflow-hidden transition-all duration-300 font-inter font-bold tracking-wider",
    {
      // Primary variant
      "bg-torra-orange text-white border border-torra-orange-light shadow-torra-button hover:bg-torra-orange-light hover:shadow-lg": 
        variant === 'primary',
      
      // Secondary variant
      "bg-white text-torra-orange border-2 border-torra-orange hover:bg-torra-orange hover:text-white": 
        variant === 'secondary',
      
      // Disabled state
      "opacity-50 cursor-not-allowed": disabled,
      "cursor-pointer": !disabled
    },
    className
  );
</script>

<button
  {type}
  {disabled}
  bind:this={buttonEl}
  on:click
  on:click={createRipple}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:mousemove={handleMouseMove}
  class={classes}
  style="transform: translateX({$x}px) translateY({$y}px) scale({$scale})"
>
  <span class="relative z-10 flex items-center justify-center gap-2">
    {#if loading}
      <!-- Loading spinner -->
      <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle 
          class="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          stroke-width="4"
          fill="none"
        />
        <path 
          class="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    {/if}
    <slot />
  </span>
  
  <!-- Ripple effects -->
  {#each ripples as ripple (ripple.id)}
    <span
      class="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
      style="
        left: {ripple.x}px;
        top: {ripple.y}px;
        transform: translate(-50%, -50%);
      "
    />
  {/each}
</button>

<style>
  @keyframes ripple {
    from {
      width: 0;
      height: 0;
      opacity: 0.5;
    }
    to {
      width: 500px;
      height: 500px;
      opacity: 0;
    }
  }
  
  .animate-ripple {
    animation: ripple 1s ease-out;
  }
</style>