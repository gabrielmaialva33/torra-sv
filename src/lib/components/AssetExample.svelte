<script>
  // Example of how to use the organized assets
  
  // Import individual assets
  import { torraLogo, iconUser, iconHome } from '../../assets';
  
  // Or import collections
  import { brandIcons, uiIcons, backgrounds } from '../../assets';
</script>

<div class="p-8 space-y-6">
  <h2 class="text-2xl font-bold mb-4">Asset Usage Examples</h2>
  
  <!-- Using individual imports -->
  <section>
    <h3 class="text-xl font-semibold mb-2">Individual Imports</h3>
    <div class="flex gap-4 items-center">
      <img src={torraLogo} alt="Torra Logo" class="h-16" />
      <img src={iconUser} alt="User Icon" class="h-8" />
      <img src={iconHome} alt="Home Icon" class="h-8" />
    </div>
  </section>
  
  <!-- Using collection imports -->
  <section>
    <h3 class="text-xl font-semibold mb-2">Collection Imports</h3>
    <div class="flex gap-4 items-center">
      <img src={brandIcons.clickRetireLogo} alt="Click & Retire" class="h-12" />
      <img src={uiIcons.store} alt="Store" class="h-8" />
      <img src={uiIcons.truck} alt="Truck" class="h-8" />
    </div>
  </section>
  
  <!-- All UI Icons -->
  <section>
    <h3 class="text-xl font-semibold mb-2">All UI Icons</h3>
    <div class="grid grid-cols-8 gap-4">
      {#each Object.entries(uiIcons) as [name, icon]}
        <div class="text-center">
          <img src={icon} alt={name} class="h-8 mx-auto mb-1" />
          <p class="text-xs text-gray-600">{name}</p>
        </div>
      {/each}
    </div>
  </section>
</div>