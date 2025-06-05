<script>
  import {fade} from 'svelte/transition';
  import {onMount} from 'svelte';
  import {location} from 'svelte-spa-router';
  import Sidebar from '../components/shared/Sidebar.svelte';
  import Header from '../components/shared/Header.svelte';
  import Footer from '../components/shared/Footer.svelte';

  export let showSidebar = true;
    export let showHeader = true;
    export let showFooter = true;

    let isSidebarCollapsed = false;
    let isMobile = false;

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    });

    function checkMobile() {
        isMobile = window.innerWidth < 768;
    }

    function toggleSidebar() {
        isSidebarCollapsed = !isSidebarCollapsed;
    }

    // Close sidebar on route change in mobile
    $: if ($location && isMobile) {
        isSidebarCollapsed = true;
    }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
    <div class="flex flex-1">
        {#if showSidebar}
            <Sidebar
                    collapsed={isSidebarCollapsed}
                    {isMobile}
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
                    class="flex-1 overflow-y-auto"
                    in:fade={{ duration: 300 }}
            >
                <slot/>
            </main>

            {#if showFooter}
                <Footer/>
            {/if}
        </div>
    </div>
</div>

{#if isMobile && !isSidebarCollapsed}
    <button
            class="overlay"
            on:click={toggleSidebar}
            aria-label="Fechar menu lateral"
            type="button"
    ></button>
{/if}

<style>
    :global(.page-container) {
        max-width: 1400px;
        margin: 0 auto;
        width: 100%;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 40;
        border: none;
        padding: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
</style>