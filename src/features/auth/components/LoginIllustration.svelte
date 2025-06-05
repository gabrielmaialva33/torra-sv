<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import womanIllustration from '../../../assets/images/figma/woman-illustration.png';
  import manIllustration from '../../../assets/images/figma/man-illustration.png';
  
  let visible = false;
  
  onMount(() => {
    visible = true;
  });
</script>

<div class="relative w-full h-[560px] bg-radial-purple overflow-hidden">
  <!-- Animated background particles -->
  <div class="absolute inset-0">
    {#each Array(5) as _, i}
      <div 
        class="absolute rounded-full bg-white/5 animate-float"
        style="
          width: {20 + Math.random() * 40}px;
          height: {20 + Math.random() * 40}px;
          left: {10 + i * 20}%;
          top: {20 + Math.random() * 60}%;
          animation-delay: {i * 2}s;
          animation-duration: {15 + i * 5}s;
        "
      ></div>
    {/each}
  </div>
  
  <!-- Click & Retire Logo -->
  {#if visible}
    <div 
      class="absolute top-24 left-1/2 transform -translate-x-1/2 z-20"
      in:fade={{ duration: 800, delay: 300 }}
    >
      <div class="text-white text-center">
        <div class="flex items-center justify-center space-x-3">
          <span class="text-[40px] font-bold tracking-tight drop-shadow-lg">
            CLICK
          </span>
          <span class="text-[32px] font-light">
            &
          </span>
          <span class="bg-torra-orange px-4 py-1 rounded text-[40px] font-bold tracking-tight">
            RETIRE
          </span>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Illustrations -->
  <div class="absolute bottom-0 left-0 right-0">
    {#if visible}
      <!-- Woman -->
      <div 
        class="absolute left-[52px] bottom-[-268px]"
        in:fly={{ y: 100, duration: 1000, delay: 600, easing: quintOut }}
      >
        <img 
          src={womanIllustration} 
          alt="" 
          class="w-[153px] h-[468px] drop-shadow-2xl"
        />
      </div>
      
      <!-- Man -->
      <div 
        class="absolute left-[202px] bottom-[-254px]"
        in:fly={{ y: 100, duration: 1000, delay: 800, easing: quintOut }}
      >
        <img 
          src={manIllustration} 
          alt="" 
          class="w-[204px] h-[454px] drop-shadow-2xl"
        />
      </div>
    {/if}
  </div>
  
  <!-- Bottom gradient -->
  <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#181945] to-transparent"></div>
</div>

<style>
  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-30px) scale(1.1);
      opacity: 0.5;
    }
  }
  
  .animate-float {
    animation: float ease-in-out infinite;
  }
</style>