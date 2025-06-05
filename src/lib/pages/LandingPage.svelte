<script>
  import { onMount } from 'svelte';
  import LoginPanel from '../components/LoginPanel.svelte';
  import IllustrationPanel from '../components/IllustrationPanel.svelte';
  import Footer from '../components/Footer.svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="min-h-screen w-full bg-[#EFEFEF] relative overflow-hidden">
  <!-- Main content wrapper - centered and properly sized -->
  <div class="flex items-center justify-center" style="min-height: calc(100vh - 62px); padding: 20px 0;">
    <div class="relative" style="width: 920px; height: 559.7px;">
      <!-- Shadow container for depth effect -->
      <div class="absolute inset-0 bg-black/5 blur-xl transform scale-[1.02] translate-y-2"></div>
      
      <!-- Main container with both panels -->
      <div class="relative flex h-full">
        <!-- Left Panel - Login Form -->
        <div class="w-[476.4px] h-full bg-white rounded-l-[8px] border border-r-0 border-[#DBE2EB] 
                    shadow-[0px_6px_8px_0px_rgba(4,4,7,0.1)] overflow-hidden z-10
                    {mounted ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'}">
          <LoginPanel />
        </div>
        
        <!-- Right Panel - Illustrations -->
        <div class="w-[443.6px] h-full rounded-r-[8px] border border-[#DBE2EB] overflow-hidden z-10
                    {mounted ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'}">
          <IllustrationPanel />
        </div>
      </div>
    </div>
  </div>
  
  <!-- Footer -->
  <Footer />
</div>

<style>
  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .animate-slide-in-left {
    animation: slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-slide-in-right {
    animation: slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
</style>
