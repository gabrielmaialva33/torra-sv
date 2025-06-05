<script>
  import IconInput from '../components/IconInput.svelte';
  import { fade, fly, scale } from 'svelte/transition';
  
  let showAnimations = false;
  let inputValue = '';
  
  // Animation examples
  const animations = [
    { name: 'Fade In', class: 'animate-fade-in' },
    { name: 'Float', class: 'animate-float' },
    { name: 'Pulse', class: 'animate-pulse-slow' },
    { name: 'Slide Left', class: 'animate-slide-in-left' },
    { name: 'Slide Right', class: 'animate-slide-in-right' },
  ];
</script>

<div class="min-h-screen bg-torra-gray-150 p-8">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <h1 class="text-4xl font-roboto font-medium text-torra-dark mb-2">
      Torra Component Showcase
    </h1>
    <p class="text-torra-gray-500 mb-8">
      Interactive components and animations used in the Click & Retire system
    </p>
    
    <!-- Color Palette -->
    <section class="mb-12">
      <h2 class="text-2xl font-roboto font-medium text-torra-dark mb-4">Color Palette</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded shadow-card">
          <div class="w-full h-20 bg-torra-orange rounded mb-2"></div>
          <p class="text-sm font-medium">Torra Orange</p>
          <p class="text-xs text-torra-gray-500">#FF5101</p>
        </div>
        <div class="bg-white p-4 rounded shadow-card">
          <div class="w-full h-20 bg-torra-orange-light rounded mb-2"></div>
          <p class="text-sm font-medium">Orange Light</p>
          <p class="text-xs text-torra-gray-500">#FF7B3D</p>
        </div>
        <div class="bg-white p-4 rounded shadow-card">
          <div class="w-full h-20 bg-torra-purple-light rounded mb-2"></div>
          <p class="text-sm font-medium">Purple Light</p>
          <p class="text-xs text-torra-gray-500">#42437B</p>
        </div>
        <div class="bg-white p-4 rounded shadow-card">
          <div class="w-full h-20 bg-torra-purple-dark rounded mb-2"></div>
          <p class="text-sm font-medium">Purple Dark</p>
          <p class="text-xs text-torra-gray-500">#181945</p>
        </div>
      </div>
    </section>
    
    <!-- Typography -->
    <section class="mb-12">
      <h2 class="text-2xl font-roboto font-medium text-torra-dark mb-4">Typography</h2>
      <div class="bg-white p-6 rounded shadow-card space-y-4">
        <div>
          <p class="text-xs text-torra-gray-500 mb-1">Heading 1 - Roboto Medium 32px</p>
          <h3 class="font-roboto text-h1 text-torra-dark">Entrar no Painel</h3>
        </div>
        <div>
          <p class="text-xs text-torra-gray-500 mb-1">Body - Roboto Regular 16px</p>
          <p class="font-roboto text-body text-torra-dark">
            Não se lembra da sua senha? Resgate aqui
          </p>
        </div>
        <div>
          <p class="text-xs text-torra-gray-500 mb-1">Button - Inter Bold 16px</p>
          <p class="font-inter text-button text-torra-dark">ACESSAR</p>
        </div>
      </div>
    </section>
    
    <!-- Components -->
    <section class="mb-12">
      <h2 class="text-2xl font-roboto font-medium text-torra-dark mb-4">Form Components</h2>
      <div class="bg-white p-6 rounded shadow-card space-y-6">
        <div class="max-w-md">
          <p class="text-sm text-torra-gray-500 mb-2">Icon Input - User</p>
          <IconInput 
            type="text" 
            placeholder="Usuário" 
            bind:value={inputValue}
            icon="user"
          />
        </div>
        <div class="max-w-md">
          <p class="text-sm text-torra-gray-500 mb-2">Icon Input - Password</p>
          <IconInput 
            type="password" 
            placeholder="Senha" 
            icon="lock"
          />
        </div>
        <div class="max-w-md">
          <p class="text-sm text-torra-gray-500 mb-2">Primary Button</p>
          <button class="w-full h-[45px] bg-torra-orange hover:bg-torra-orange-light 
                         transition-all duration-300 text-white font-inter text-button 
                         rounded border border-torra-orange-light shadow-button
                         hover:shadow-lg hover:transform hover:-translate-y-0.5
                         active:transform active:translate-y-0">
            Acessar
          </button>
        </div>
      </div>
    </section>
    
    <!-- Animations -->
    <section class="mb-12">
      <h2 class="text-2xl font-roboto font-medium text-torra-dark mb-4">Animations</h2>
      <div class="bg-white p-6 rounded shadow-card">
        <button 
          on:click={() => showAnimations = !showAnimations}
          class="mb-6 px-4 py-2 bg-torra-orange text-white rounded hover:bg-torra-orange-light transition-colors"
        >
          {showAnimations ? 'Hide' : 'Show'} Animations
        </button>
        
        {#if showAnimations}
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4" in:fade>
            {#each animations as animation, i}
              <div 
                class="p-4 bg-torra-gray-100 rounded text-center {animation.class}"
                style="animation-delay: {i * 0.1}s"
              >
                <p class="text-sm font-medium text-torra-dark">{animation.name}</p>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </section>
    
    <!-- Shadows -->
    <section class="mb-12">
      <h2 class="text-2xl font-roboto font-medium text-torra-dark mb-4">Shadows</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded shadow-card">
          <p class="text-sm font-medium">Card Shadow</p>
          <p class="text-xs text-torra-gray-500">shadow-card</p>
        </div>
        <div class="bg-white p-6 rounded shadow-footer">
          <p class="text-sm font-medium">Footer Shadow</p>
          <p class="text-xs text-torra-gray-500">shadow-footer</p>
        </div>
        <div class="bg-white p-6 rounded shadow-button">
          <p class="text-sm font-medium">Button Shadow</p>
          <p class="text-xs text-torra-gray-500">shadow-button</p>
        </div>
      </div>
    </section>
  </div>
</div>
