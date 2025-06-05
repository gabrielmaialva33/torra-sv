<script>
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut, elasticOut } from 'svelte/easing';
  import LoginPanel from '../components/LoginPanel.svelte';
  import IllustrationPanel from '../components/IllustrationPanel.svelte';
  import Footer from '../components/Footer.svelte';
  import Loading from '../components/Loading.svelte';
  
  let mounted = false;
  let isLoading = true;
  let mouseX = 0;
  let mouseY = 0;
  let parallaxX = 0;
  let parallaxY = 0;
  
  /**
   * Initialize page and handle loading states
   */
  onMount(() => {
    // Simulate initial loading
    setTimeout(() => {
      isLoading = false;
      mounted = true;
    }, 1200);
    
    // Handle mouse movement for parallax effect
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Calculate parallax offset
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      parallaxX = (mouseX - centerX) / 100;
      parallaxY = (mouseY - centerY) / 100;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
  
  /**
   * Generate random particles for background effect
   */
  function generateParticles(count) {
    return Array(count).fill(null).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));
  }
  
  const particles = generateParticles(15);
</script>

{#if isLoading}
  <div class="loading-container" out:fade={{ duration: 500 }}>
    <Loading />
  </div>
{/if}

<div class="min-h-screen w-full bg-[#EFEFEF] relative overflow-hidden">
  <!-- Animated background particles -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    {#each particles as particle}
      <div
        class="absolute rounded-full bg-torra-orange/5 animate-float-particle"
        style="
          left: {particle.x}%;
          top: {particle.y}%;
          width: {particle.size}rem;
          height: {particle.size}rem;
          animation-duration: {particle.duration}s;
          animation-delay: {particle.delay}s;
        "
      ></div>
    {/each}
  </div>
  
  <!-- Gradient overlays for depth -->
  <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-torra-orange/5 to-transparent rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-torra-purple-light/5 to-transparent rounded-full blur-3xl"></div>
  
  <!-- Main content wrapper with parallax -->
  <div 
    class="flex items-center justify-center relative z-10" 
    style="min-height: calc(100vh - 62px); padding: 20px 0; transform: translate({parallaxX}px, {parallaxY}px);"
  >
    <div class="relative" style="width: 920px; height: 559.7px;">
      <!-- Enhanced shadow for depth -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/5 to-black/10 blur-2xl transform scale-[1.05] translate-y-4"></div>
      
      <!-- Glow effect on hover -->
      <div class="absolute inset-0 bg-gradient-to-r from-torra-orange/0 via-torra-orange/10 to-torra-purple-light/10 
                  opacity-0 hover:opacity-100 blur-3xl transform scale-110 transition-opacity duration-1000 pointer-events-none"></div>
      
      <!-- Main container with both panels -->
      <div class="relative flex h-full group">
        <!-- Left Panel - Login Form -->
        <div class="w-[476.4px] h-full bg-white rounded-l-[8px] border border-r-0 border-[#DBE2EB] 
                    shadow-[0px_6px_8px_0px_rgba(4,4,7,0.1)] overflow-hidden z-10
                    transition-all duration-500 hover:shadow-2xl
                    {mounted ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'}">
          <LoginPanel />
        </div>
        
        <!-- Right Panel - Illustrations -->
        <div class="w-[443.6px] h-full rounded-r-[8px] border border-[#DBE2EB] overflow-hidden z-10
                    transition-all duration-500 hover:shadow-2xl
                    {mounted ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'}">
          <IllustrationPanel />
        </div>
      </div>
      
      <!-- Interactive corner decorations -->
      <div class="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-torra-orange rounded-tl-lg
                  {mounted ? 'animate-corner-decoration' : 'opacity-0'}"></div>
      <div class="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-torra-orange rounded-tr-lg
                  {mounted ? 'animate-corner-decoration' : 'opacity-0'}" style="animation-delay: 0.2s"></div>
      <div class="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-torra-orange rounded-bl-lg
                  {mounted ? 'animate-corner-decoration' : 'opacity-0'}" style="animation-delay: 0.4s"></div>
      <div class="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-torra-orange rounded-br-lg
                  {mounted ? 'animate-corner-decoration' : 'opacity-0'}" style="animation-delay: 0.6s"></div>
    </div>
  </div>
  
  <!-- Floating help button -->
  {#if mounted}
    <button
      class="fixed bottom-8 right-8 w-14 h-14 bg-torra-orange text-white rounded-full shadow-lg 
             hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center 
             group z-20 animate-bounce-in"
      on:click={() => console.log('Help clicked')}
      in:fly={{ y: 100, duration: 800, delay: 1000 }}
    >
      <svg
        class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      
      <!-- Ripple effect -->
      <span class="absolute inset-0 rounded-full bg-white/30 scale-0 group-hover:scale-100 
                   transition-transform duration-500 opacity-0 group-hover:opacity-100"></span>
      
      <!-- Tooltip -->
      <span class="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm 
                   rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 
                   whitespace-nowrap transform translate-y-2 group-hover:translate-y-0">
        Precisa de ajuda?
      </span>
    </button>
  {/if}
  
  <!-- Footer -->
  <Footer />
</div>

<style>
  .loading-container {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #EFEFEF 0%, #FFFFFF 100%);
    z-index: 50;
  }
  
  /* Enhanced animations */
  @keyframes slide-in-left {
    0% {
      opacity: 0;
      transform: translateX(-30px) scale(0.95);
    }
    60% {
      transform: translateX(5px) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
  
  @keyframes slide-in-right {
    0% {
      opacity: 0;
      transform: translateX(30px) scale(0.95);
    }
    60% {
      transform: translateX(-5px) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
  
  @keyframes corner-decoration {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0) rotate(-180deg);
    }
    50% {
      transform: scale(1.2) rotate(10deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0);
    }
  }
  
  /* Floating particle animation */
  @keyframes float-particle {
    0%, 100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-30px) translateX(10px) scale(1.1);
      opacity: 0.5;
    }
    50% {
      transform: translateY(-50px) translateX(-10px) scale(0.9);
      opacity: 0.4;
    }
    75% {
      transform: translateY(-20px) translateX(15px) scale(1.05);
      opacity: 0.6;
    }
  }
  
  .animate-float-particle {
    animation: float-particle linear infinite;
  }
  
  .animate-slide-in-left {
    animation: slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-slide-in-right {
    animation: slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.1s;
  }
  
  .animate-corner-decoration {
    animation: corner-decoration 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-bounce-in {
    animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }
  
  /* Custom scrollbar */
  :global(::-webkit-scrollbar) {
    width: 10px;
  }
  
  :global(::-webkit-scrollbar-track) {
    background: #f1f1f1;
  }
  
  :global(::-webkit-scrollbar-thumb) {
    background: #FF5101;
    border-radius: 5px;
  }
  
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #FF7B3D;
  }
</style>