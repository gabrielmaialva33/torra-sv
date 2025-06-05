<script>
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import IconInput from '../components/IconInput.svelte';
  import Button from '../../components/ui/button.svelte';
  import { User, Lock, ShoppingBag, Package, Truck, Store } from 'lucide-svelte';
  
  let showAnimations = false;
  let inputValue = '';
  let loadingButton = null;
  
  // Animation examples
  const animations = [
    { name: 'Fade In', class: 'animate-fade-in' },
    { name: 'Float', class: 'animate-float' },
    { name: 'Pulse Slow', class: 'animate-pulse-slow' },
    { name: 'Slide Left', class: 'animate-slide-in-left' },
    { name: 'Slide Right', class: 'animate-slide-in-right' },
  ];
  
  // Button variants for showcase
  const buttonExamples = [
    { variant: 'default', text: 'Primary Button', icon: null },
    { variant: 'secondary', text: 'Secondary', icon: null },
    { variant: 'outline', text: 'Outline', icon: null },
    { variant: 'ghost', text: 'Ghost', icon: null },
    { variant: 'link', text: 'Link Button', icon: null },
  ];
  
  // Icon examples
  const iconExamples = [
    { name: 'User', component: User },
    { name: 'Lock', component: Lock },
    { name: 'Shopping Bag', component: ShoppingBag },
    { name: 'Package', component: Package },
    { name: 'Truck', component: Truck },
    { name: 'Store', component: Store },
  ];
  
  function handleButtonClick(variant) {
    loadingButton = variant;
    setTimeout(() => {
      loadingButton = null;
    }, 2000);
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-torra-gray-150 via-torra-gray-100 to-white p-8">
  <div class="max-w-7xl mx-auto">
    <!-- Header with animation -->
    <div in:fly={{ y: -20, duration: 800, easing: quintOut }}>
      <h1 class="text-5xl font-roboto font-medium text-torra-dark mb-3">
        Torra Component Showcase
      </h1>
      <p class="text-lg text-torra-gray-500 mb-10">
        Professional components and design system for the Click & Retire platform
      </p>
    </div>
    
    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12" in:fade={{ delay: 200 }}>
      {#each ['Colors', 'Components', 'Animations', 'Variants'] as stat, i}
        <div 
          class="bg-white p-6 rounded-lg shadow-card hover:shadow-xl transition-all duration-300 
                 hover:scale-105 cursor-pointer"
          in:scale={{ delay: 300 + i * 100, duration: 500 }}
        >
          <h3 class="text-3xl font-bold text-torra-orange">{8 + i * 2}</h3>
          <p class="text-torra-gray-500">{stat}</p>
        </div>
      {/each}
    </div>
    
    <!-- Color Palette Section -->
    <section class="mb-16" in:fade={{ delay: 400 }}>
      <h2 class="text-3xl font-roboto font-medium text-torra-dark mb-6">
        Color Palette
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <!-- Primary Colors -->
        <div class="group">
          <div class="bg-white p-4 rounded-lg shadow-card hover:shadow-xl transition-all duration-300 
                      hover:scale-105 cursor-pointer">
            <div class="w-full h-24 bg-torra-orange rounded-lg mb-3 group-hover:scale-110 
                        transition-transform duration-500"></div>
            <p class="font-semibold text-sm">Torra Orange</p>
            <p class="text-xs text-torra-gray-500">#FF5101</p>
            <p class="text-xs text-torra-gray-400 mt-1">Primary CTA</p>
          </div>
        </div>
        
        <div class="group">
          <div class="bg-white p-4 rounded-lg shadow-card hover:shadow-xl transition-all duration-300 
                      hover:scale-105 cursor-pointer">
            <div class="w-full h-24 bg-torra-orange-light rounded-lg mb-3 group-hover:scale-110 
                        transition-transform duration-500"></div>
            <p class="font-semibold text-sm">Orange Light</p>
            <p class="text-xs text-torra-gray-500">#FF7B3D</p>
            <p class="text-xs text-torra-gray-400 mt-1">Hover States</p>
          </div>
        </div>
        
        <!-- Purple Gradient Colors -->
        <div class="group">
          <div class="bg-white p-4 rounded-lg shadow-card hover:shadow-xl transition-all duration-300 
                      hover:scale-105 cursor-pointer">
            <div class="w-full h-24 bg-torra-purple-light rounded-lg mb-3 group-hover:scale-110 
                        transition-transform duration-500"></div>
            <p class="font-semibold text-sm">Purple Light</p>
            <p class="text-xs text-torra-gray-500">#42437B</p>
            <p class="text-xs text-torra-gray-400 mt-1">Gradient Start</p>
          </div>
        </div>
        
        <div class="group">
          <div class="bg-white p-4 rounded-lg shadow-card hover:shadow-xl transition-all duration-300 
                      hover:scale-105 cursor-pointer">
            <div class="w-full h-24 bg-torra-purple-dark rounded-lg mb-3 group-hover:scale-110 
                        transition-transform duration-500"></div>
            <p class="font-semibold text-sm">Purple Dark</p>
            <p class="text-xs text-torra-gray-500">#181945</p>
            <p class="text-xs text-torra-gray-400 mt-1">Gradient End</p>
          </div>
        </div>
        
        <!-- Grays -->
        <div class="group">
          <div class="bg-white p-4 rounded-lg shadow-card hover:shadow-xl transition-all duration-300 
                      hover:scale-105 cursor-pointer">
            <div class="w-full h-24 bg-torra-gray-200 rounded-lg mb-3 group-hover:scale-110 
                        transition-transform duration-500"></div>
            <p class="font-semibold text-sm">Gray 200</p>
            <p class="text-xs text-torra-gray-500">#EBECF1</p>
            <p class="text-xs text-torra-gray-400 mt-1">Borders</p>
          </div>
        </div>
        
        <div class="group">
          <div class="bg-white p-4 rounded-lg shadow-card hover:shadow-xl transition-all duration-300 
                      hover:scale-105 cursor-pointer">
            <div class="w-full h-24 bg-torra-dark rounded-lg mb-3 group-hover:scale-110 
                        transition-transform duration-500"></div>
            <p class="font-semibold text-sm">Dark</p>
            <p class="text-xs text-torra-gray-500">#1A1630</p>
            <p class="text-xs text-torra-gray-400 mt-1">Text</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Typography Section -->
    <section class="mb-16" in:fade={{ delay: 500 }}>
      <h2 class="text-3xl font-roboto font-medium text-torra-dark mb-6">
        Typography System
      </h2>
      <div class="bg-white p-8 rounded-lg shadow-card hover:shadow-xl transition-all duration-300">
        <div class="space-y-6">
          <div class="pb-4 border-b border-torra-gray-200">
            <p class="text-xs text-torra-gray-500 mb-2">Display • Roboto Medium 48px</p>
            <h3 class="font-roboto text-5xl font-medium text-torra-dark leading-tight">
              Click & Retire System
            </h3>
          </div>
          
          <div class="pb-4 border-b border-torra-gray-200">
            <p class="text-xs text-torra-gray-500 mb-2">Heading 1 • Roboto Medium 32px</p>
            <h3 class="font-roboto text-h1 text-torra-dark">
              Entrar no Painel
            </h3>
          </div>
          
          <div class="pb-4 border-b border-torra-gray-200">
            <p class="text-xs text-torra-gray-500 mb-2">Body • Inter Regular 16px</p>
            <p class="font-inter text-body text-torra-dark leading-relaxed">
              O sistema Click & Retire oferece uma experiência moderna e eficiente para 
              gerenciamento de pedidos e retiradas. Com interface intuitiva e recursos 
              avançados, transformamos a forma como você gerencia seu negócio.
            </p>
          </div>
          
          <div class="pb-4 border-b border-torra-gray-200">
            <p class="text-xs text-torra-gray-500 mb-2">Button • Inter Bold 16px Uppercase</p>
            <p class="font-inter text-button text-torra-dark">ACESSAR SISTEMA</p>
          </div>
          
          <div>
            <p class="text-xs text-torra-gray-500 mb-2">Caption • Inter Regular 13px</p>
            <p class="font-inter text-footer text-torra-gray-500">
              © 2023 Lojas Torra. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Buttons Section -->
    <section class="mb-16" in:fade={{ delay: 600 }}>
      <h2 class="text-3xl font-roboto font-medium text-torra-dark mb-6">
        Button Components
      </h2>
      <div class="bg-white p-8 rounded-lg shadow-card hover:shadow-xl transition-all duration-300">
        <div class="space-y-8">
          <!-- Button Variants -->
          <div>
            <h3 class="text-lg font-medium text-torra-dark mb-4">Variants</h3>
            <div class="flex flex-wrap gap-4">
              {#each buttonExamples as example}
                <Button 
                  variant={example.variant}
                  on:click={() => handleButtonClick(example.variant)}
                  loading={loadingButton === example.variant}
                >
                  {example.text}
                </Button>
              {/each}
            </div>
          </div>
          
          <!-- Button Sizes -->
          <div>
            <h3 class="text-lg font-medium text-torra-dark mb-4">Sizes</h3>
            <div class="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Package class="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <!-- Button States -->
          <div>
            <h3 class="text-lg font-medium text-torra-dark mb-4">States</h3>
            <div class="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Form Components Section -->
    <section class="mb-16" in:fade={{ delay: 700 }}>
      <h2 class="text-3xl font-roboto font-medium text-torra-dark mb-6">
        Form Components
      </h2>
      <div class="bg-white p-8 rounded-lg shadow-card hover:shadow-xl transition-all duration-300">
        <div class="max-w-md space-y-6">
          <div>
            <label class="block text-sm font-medium text-torra-dark mb-2">
              Username Input
            </label>
            <IconInput 
              type="text" 
              placeholder="Digite seu usuário" 
              bind:value={inputValue}
              icon="user"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-torra-dark mb-2">
              Password Input
            </label>
            <IconInput 
              type="password" 
              placeholder="Digite sua senha" 
              icon="lock"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-torra-dark mb-2">
              Email Input
            </label>
            <IconInput 
              type="email" 
              placeholder="email@exemplo.com" 
              icon="user"
            />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Icons Section -->
    <section class="mb-16" in:fade={{ delay: 800 }}>
      <h2 class="text-3xl font-roboto font-medium text-torra-dark mb-6">
        Icons Library
      </h2>
      <div class="bg-white p-8 rounded-lg shadow-card hover:shadow-xl transition-all duration-300">
        <div class="grid grid-cols-3 md:grid-cols-6 gap-6">
          {#each iconExamples as icon, i}
            <div 
              class="flex flex-col items-center p-4 rounded-lg hover:bg-torra-gray-100 
                     transition-all duration-300 cursor-pointer group"
              in:scale={{ delay: 800 + i * 50, duration: 300 }}
            >
              <svelte:component 
                this={icon.component} 
                class="w-8 h-8 text-torra-gray-500 group-hover:text-torra-orange 
                       transition-colors duration-300 mb-2"
              />
              <span class="text-xs text-torra-gray-500">{icon.name}</span>
            </div>
          {/each}
        </div>
      </div>
    </section>
    
    <!-- Animations Section -->
    <section class="mb-16" in:fade={{ delay: 900 }}>
      <h2 class="text-3xl font-roboto font-medium text-torra-dark mb-6">
        Animation Classes
      </h2>
      <div class="bg-white p-8 rounded-lg shadow-card hover:shadow-xl transition-all duration-300">
        <Button 
          on:click={() => showAnimations = !showAnimations}
          variant="outline"
          className="mb-6"
        >
          {showAnimations ? 'Reset' : 'Play'} Animations
        </Button>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {#each animations as animation, i}
            {#if showAnimations}
              <div 
                class="p-6 bg-gradient-to-br from-torra-gray-100 to-torra-gray-50 
                       rounded-lg text-center {animation.class} border border-torra-gray-200"
                style="animation-delay: {i * 0.1}s"
                in:scale={{ delay: i * 100 }}
              >
                <p class="text-sm font-medium text-torra-dark">{animation.name}</p>
                <p class="text-xs text-torra-gray-500 mt-1">.{animation.class}</p>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </section>
    
    <!-- Effects Section -->
    <section class="mb-16" in:fade={{ delay: 1000 }}>
      <h2 class="text-3xl font-roboto font-medium text-torra-dark mb-6">
        Shadow & Effects
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-8 rounded-lg shadow-card hover:shadow-2xl 
                    transition-all duration-500 hover:scale-105">
          <h3 class="font-semibold mb-2">Card Shadow</h3>
          <p class="text-sm text-torra-gray-500">shadow-card</p>
          <p class="text-xs text-torra-gray-400 mt-2">
            0px 6px 8px rgba(4, 4, 7, 0.1)
          </p>
        </div>
        
        <div class="bg-white p-8 rounded-lg shadow-button hover:shadow-2xl 
                    transition-all duration-500 hover:scale-105">
          <h3 class="font-semibold mb-2">Button Shadow</h3>
          <p class="text-sm text-torra-gray-500">shadow-button</p>
          <p class="text-xs text-torra-gray-400 mt-2">
            0px 0px 10px -5px rgba(112, 94, 200, 0.5)
          </p>
        </div>
        
        <div class="bg-white p-8 rounded-lg shadow-footer hover:shadow-2xl 
                    transition-all duration-500 hover:scale-105">
          <h3 class="font-semibold mb-2">Footer Shadow</h3>
          <p class="text-sm text-torra-gray-500">shadow-footer</p>
          <p class="text-xs text-torra-gray-400 mt-2">
            16px 0px 16px rgba(24, 23, 38, 0.06)
          </p>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  /* Add any component-specific styles here */
  :global(.animate-fade-in) {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  :global(.animate-float) {
    animation: float 6s ease-in-out infinite;
  }
  
  :global(.animate-pulse-slow) {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  :global(.animate-slide-in-left) {
    animation: slideInLeft 0.5s ease-out forwards;
  }
  
  :global(.animate-slide-in-right) {
    animation: slideInRight 0.5s ease-out forwards;
  }
</style>