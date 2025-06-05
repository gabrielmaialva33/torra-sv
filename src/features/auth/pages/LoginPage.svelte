<script>
    import {onMount} from 'svelte';
    import {fade, fly} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';
    import LoginForm from '../components/LoginForm.svelte';
    import LoginIllustration from '../components/LoginIllustration.svelte';
    import Footer from '../../../components/shared/Footer.svelte';
    import Loading from '../../../components/ui/Loading.svelte';

    let isLoading = true;

    onMount(() => {
        // Simulate initial loading
        setTimeout(() => {
            isLoading = false;
        }, 800);
    });
</script>

{#if isLoading}
    <div class="loading-container" out:fade={{ duration: 300 }}>
        <Loading size="large"/>
    </div>
{:else}
    <div class="min-h-screen w-full bg-[#EFEFEF] relative overflow-hidden" in:fade={{ duration: 500 }}>
        <!-- Gradient overlays for depth -->
        <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-torra-orange/5 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-torra-purple-light/5 to-transparent rounded-full blur-3xl"></div>

        <!-- Main content -->
        <div class="flex items-center justify-center min-h-[calc(100vh-62px)] p-5">
            <div class="w-full max-w-[920px]" in:fly={{ y: 20, duration: 800, easing: quintOut }}>
                <!-- Shadow for depth -->
                <div class="absolute inset-0 bg-gradient-to-b from-black/5 to-black/10 blur-2xl transform scale-105 translate-y-4"></div>

                <!-- Login panels container -->
                <div class="relative flex shadow-2xl rounded-lg overflow-hidden">
                    <!-- Left Panel - Login Form -->
                    <div class="w-[476px] bg-white">
                        <LoginForm/>
                    </div>

                    <!-- Right Panel - Illustration -->
                    <div class="w-[444px]">
                        <LoginIllustration/>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <Footer/>
    </div>
{/if}

<style>
    .loading-container {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #EFEFEF;
        z-index: 50;
    }
</style>