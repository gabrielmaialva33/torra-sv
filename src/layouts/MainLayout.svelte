<script>
  import {fade} from 'svelte/transition';
  import Sidebar from '../components/shared/Sidebar.svelte';
  import Header from '../components/shared/Header.svelte';

  export let showSidebar = true;
    export let showHeader = true;

    let isSidebarCollapsed = false;

    function toggleSidebar() {
        isSidebarCollapsed = !isSidebarCollapsed;
    }
</script>

<div class="min-h-screen bg-torra-gray-150 flex">
    {#if showSidebar}
        <Sidebar
                collapsed={isSidebarCollapsed}
                on:toggle={toggleSidebar}
        />
    {/if}

    <div class="flex-1 flex flex-col">
        {#if showHeader}
            <Header
                    showMenuButton={showSidebar}
                    on:menuClick={toggleSidebar}
            />
        {/if}

        <main
                class="flex-1 p-6 overflow-y-auto"
                in:fade={{ duration: 300 }}
        >
            <slot/>
        </main>
    </div>
</div>

<style>
    :global(.page-container) {
        max-width: 1400px;
        margin: 0 auto;
        width: 100%;
    }
</style>