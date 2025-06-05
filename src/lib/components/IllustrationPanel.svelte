<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  // Use the correct illustrations
  import womanIllustration from '../../assets/images/figma/illustration-woman.png';
  import manIllustration from '../../assets/images/figma/illustration-man.png';
  
  let visible = false;
  
  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
</script>

<div class="relative w-full h-full overflow-hidden" style="background: radial-gradient(circle at 50% 58%, #42437B 0%, #181945 100%);">
  <!-- Background gradient overlay for depth -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#181945]/20"></div>
  
  <!-- Click & Retire Logo -->
  {#if visible}
    <div class="absolute top-[95.85px] left-[92.6px] z-20" in:fade={{ duration: 500, delay: 300 }}>
      <div class="flex items-center" style="font-family: 'Roboto', sans-serif;">
        <span class="text-white font-bold" style="font-size: 40px; line-height: 1.25; letter-spacing: -0.02em;">
          CLICK
        </span>
        <span class="text-white mx-[10px]" style="font-size: 32px; line-height: 1.25; font-weight: 300;">
          &
        </span>
        <div class="bg-[#FF5101] text-white font-bold px-[16px] py-[5px] rounded-[4px]" 
             style="font-size: 40px; line-height: 1.25; letter-spacing: -0.02em;">
          RETIRE
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Illustrations Container -->
  <div class="absolute bottom-0 left-0 right-0 h-full">
    {#if visible}
      <!-- Woman Illustration -->
      <div class="absolute left-[51.6px] bottom-0 z-10" 
           in:fly={{ y: 100, duration: 800, delay: 500 }}>
        <img 
          src={womanIllustration} 
          alt="Woman" 
          class="w-[153px] h-[468px] object-bottom object-cover"
          style="transform: translateY(268px);"
        />
      </div>
      
      <!-- Man Illustration with Box -->
      <div class="absolute left-[201.6px] bottom-0 z-10"
           in:fly={{ y: 100, duration: 800, delay: 700 }}>
        <div class="relative">
          <img 
            src={manIllustration} 
            alt="Delivery man" 
            class="w-[204px] h-[454px] object-bottom object-cover"
            style="transform: translateY(254px);"
          />
          <!-- TORRA text on box -->
          <div class="absolute bottom-[408px] left-[72px] bg-white text-[#FF5101] font-bold text-[9px] px-[5px] py-[1px] rounded-[2px]"
               style="transform: rotate(-5deg); font-family: 'Roboto', sans-serif; letter-spacing: 0.3px;"
               in:fade={{ duration: 300, delay: 900 }}>
            TORRA
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <!-- Subtle animated particles for professional look -->
  <div class="absolute inset-0 pointer-events-none">
    {#each Array(3) as _, i}
      <div 
        class="absolute w-1 h-1 bg-white/5 rounded-full animate-float"
        style="
          left: {30 + i * 25}%;
          top: {20 + i * 15}%;
          animation-delay: {i * 2}s;
          animation-duration: {8 + i * 2}s;
        "
      ></div>
    {/each}
  </div>
</div>

<style>
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-30px);
    }
  }
  
  .animate-float {
    animation: float ease-in-out infinite;
  }
</style>
