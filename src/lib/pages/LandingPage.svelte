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

<div class="min-h-screen w-screen bg-[#EFEFEF] relative">
  <!-- Main content wrapper -->
  <div class="flex items-center justify-center min-h-[961px]">
    <div class="flex" style="width: 920px; height: 560px;">
      <!-- Left Panel - Login Form -->
      <div class="w-[476.4px] h-[559.7px] bg-white rounded-l-lg border border-[#DBE2EB] shadow-[0px_6px_8px_0px_rgba(4,4,7,0.1)] overflow-hidden {mounted ? 'animate-slide-in-left' : 'opacity-0'}">
        <LoginPanel />
      </div>
      
      <!-- Right Panel - Illustrations -->
      <div class="w-[443.6px] h-[559.7px] rounded-r-lg border border-l-0 border-[#DBE2EB] overflow-hidden {mounted ? 'animate-slide-in-right' : 'opacity-0'}"
           style="background: radial-gradient(circle at 50% 58%, #42437B 0%, #181945 100%);">
        <IllustrationPanel />
      </div>
    </div>
  </div>
  
  <!-- Footer -->
  <Footer />
</div>

<style>
  :global(body) {
    overflow: hidden;
    background-color: #EFEFEF;
  }
</style>
