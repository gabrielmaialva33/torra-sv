<script>
  import { onMount } from 'svelte';
  import ClickRetireLogo from './ClickRetireLogo.svelte';
  import womanIllustration from '../../assets/images/figma/illustration-woman.png';
  import manIllustration from '../../assets/images/figma/illustration-man.png';
  
  let visible = false;
  
  onMount(() => {
    // Delay animations slightly for better effect
    setTimeout(() => {
      visible = true;
    }, 300);
  });
</script>

<div class="relative w-full h-full overflow-hidden">
  <!-- Click & Retire Logo -->
  <div class="absolute top-[96px] left-[93px] z-20 {visible ? 'animate-fade-in' : 'opacity-0'}"
       style="animation-delay: 0.3s">
    <ClickRetireLogo />
  </div>
  
  <!-- Illustrations Container -->
  <div class="absolute bottom-0 left-0 right-0">
    <!-- Woman Illustration -->
    <div class="absolute left-[52px] bottom-0 z-10
                {visible ? 'animate-slide-up' : 'translate-y-full opacity-0'}"
         style="animation-delay: 0.5s">
      <img 
        src={womanIllustration} 
        alt="Woman" 
        class="w-[153px] h-[468px] object-contain"
      />
    </div>
    
    <!-- Man Illustration -->
    <div class="absolute right-[38px] bottom-0 z-10
                {visible ? 'animate-slide-up' : 'translate-y-full opacity-0'}"
         style="animation-delay: 0.7s">
      <img 
        src={manIllustration} 
        alt="Delivery man" 
        class="w-[204px] h-[454px] object-contain"
      />
    </div>
  </div>
</div>

<style>
  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
</style>
