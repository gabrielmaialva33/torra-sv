<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  // Import the correct illustrations
  import womanIllustration from '../../assets/images/figma/woman-illustration.png';
  import manIllustration from '../../assets/images/figma/man-illustration.png';
  
  let visible = false;
  let mouseX = 0;
  let mouseY = 0;
  
  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
    
    // Parallax effect on mouse move
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    };
    
    const panel = document.querySelector('.illustration-panel');
    if (panel) {
      panel.addEventListener('mousemove', handleMouseMove);
      return () => panel.removeEventListener('mousemove', handleMouseMove);
    }
  });
  
  // Generate floating orbs
  const orbs = Array(5).fill(null).map((_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 20,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));
</script>

<div class="illustration-panel relative w-full h-full overflow-hidden" 
     style="background: radial-gradient(circle at 50% 58%, #42437B 0%, #181945 100%);">
  
  <!-- Animated gradient overlay -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#181945]/30"></div>
  
  <!-- Floating gradient orbs for depth -->
  {#each orbs as orb}
    <div 
      class="absolute rounded-full blur-3xl animate-float-orb pointer-events-none"
      style="
        width: {orb.size}px;
        height: {orb.size}px;
        left: {orb.x}%;
        top: {orb.y}%;
        background: radial-gradient(circle, rgba(255, 81, 1, 0.15) 0%, transparent 70%);
        animation-duration: {orb.duration}s;
        animation-delay: {orb.delay}s;
      "
    ></div>
  {/each}
  
  <!-- Click & Retire Logo with glow effect -->
  {#if visible}
    <div class="absolute" style="top: 95.85px; left: 92.6px; z-index: 20;" 
         in:fade={{ duration: 800, delay: 300 }}>
      <!-- Glow behind logo -->
      <div class="absolute inset-0 blur-2xl bg-white/10 transform scale-150"></div>
      
      <div class="flex items-center relative" style="font-family: 'Roboto', sans-serif;">
        <span class="text-white font-bold drop-shadow-2xl" 
              style="font-size: 40px; line-height: 50px; letter-spacing: -0.02em;">
          CLICK
        </span>
        <span class="text-white drop-shadow-xl" 
              style="font-size: 32px; line-height: 50px; font-weight: 300; margin: 0 10px;">
          &
        </span>
        <div class="bg-[#FF5101] text-white font-bold rounded-[4px] shadow-2xl 
                    hover:shadow-[0_0_30px_rgba(255,81,1,0.5)] transition-all duration-500 
                    hover:scale-105 cursor-pointer" 
             style="font-size: 40px; line-height: 50px; letter-spacing: -0.02em; padding: 0 16px;">
          RETIRE
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Illustrations Container with parallax -->
  <div class="absolute bottom-0 left-0 right-0 w-full h-full"
       style="transform: translate({mouseX}px, {mouseY}px) scale(1.05);">
    {#if visible}
      <!-- Woman Illustration with floating animation -->
      <div class="absolute woman-illustration" 
           style="left: 51.6px; bottom: -268px; z-index: 10;"
           in:fly={{ y: 120, duration: 1000, delay: 500, easing: quintOut }}>
        <img 
          src={womanIllustration} 
          alt="Woman" 
          style="width: 153px; height: 468px; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));"
          class="hover:scale-105 transition-transform duration-700"
        />
        <!-- Subtle glow effect -->
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 
                    bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      <!-- Man Illustration with box -->
      <div class="absolute man-illustration"
           style="left: 201.6px; bottom: -254px; z-index: 10;"
           in:fly={{ y: 120, duration: 1000, delay: 700, easing: quintOut }}>
        <img 
          src={manIllustration} 
          alt="Delivery man with TORRA box" 
          style="width: 204px; height: 454px; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));"
          class="hover:scale-105 transition-transform duration-700"
        />
        <!-- Box glow effect -->
        <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-24 
                    bg-torra-orange/20 rounded-lg blur-2xl animate-pulse-slow"></div>
      </div>
    {/if}
  </div>
  
  <!-- Interactive particles -->
  <div class="absolute inset-0 pointer-events-none">
    {#each Array(8) as _, i}
      <div 
        class="absolute bg-white/10 rounded-full animate-particle"
        style="
          width: {2 + Math.random() * 4}px;
          height: {2 + Math.random() * 4}px;
          left: {10 + i * 10}%;
          top: {10 + i * 8}%;
          animation-delay: {i * 0.5}s;
          animation-duration: {10 + i * 2}s;
        "
      ></div>
    {/each}
  </div>
  
  <!-- Bottom gradient fade -->
  <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#181945] to-transparent"></div>
</div>

<style>
  /* Enhanced floating animation for orbs */
  @keyframes float-orb {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translate(-20px, -30px) scale(1.1);
      opacity: 0.5;
    }
    50% {
      transform: translate(20px, -50px) scale(0.9);
      opacity: 0.4;
    }
    75% {
      transform: translate(-10px, -20px) scale(1.05);
      opacity: 0.6;
    }
  }
  
  /* Particle animation */
  @keyframes particle {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-200px) translateX(50px) rotate(360deg);
      opacity: 0;
    }
  }
  
  /* Character floating animation */
  @keyframes character-float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .animate-float-orb {
    animation: float-orb ease-in-out infinite;
  }
  
  .animate-particle {
    animation: particle linear infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .woman-illustration {
    animation: character-float 6s ease-in-out infinite;
  }
  
  .man-illustration {
    animation: character-float 6s ease-in-out infinite;
    animation-delay: 3s;
  }
  
  /* Hover effect for the panel */
  .illustration-panel:hover .woman-illustration {
    animation-duration: 3s;
  }
  
  .illustration-panel:hover .man-illustration {
    animation-duration: 3s;
  }
</style>