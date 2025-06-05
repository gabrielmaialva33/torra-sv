<script>
    import {onMount} from 'svelte';
    import ClickRetireLogo from './ClickRetireLogo.svelte';
    import womanIllustration from '../../assets/images/figma/illustration-woman.png';
    import manIllustration from '../../assets/images/figma/illustration-man.png';

    let visible = false;

    onMount(() => {
        // Delay animations slightly for better effect
        setTimeout(() => {
            visible = true;
        }, 300);
    });
</script>

<div class="relative w-full h-full overflow-hidden">
    <!-- Click & Retire Logo -->
    <div class="absolute top-[80px] left-1/2 transform -translate-x-1/2 z-20 {visible ? 'animate-fade-in' : 'opacity-0'}"
         style="animation-delay: 0.3s">
        <ClickRetireLogo/>
    </div>

    <!-- Illustrations Container -->
    <div class="absolute bottom-0 left-0 right-0 h-full overflow-hidden">
        <!-- Woman Illustration -->
        <div class="absolute left-[51px] bottom-[-268px] z-10
                {visible ? 'animate-slide-up' : 'translate-y-full opacity-0'}"
             style="animation-delay: 0.5s">
            <img
                    src={womanIllustration}
                    alt="Woman"
                    class="w-[153px] h-[468px]"
            />
        </div>

        <!-- Man Illustration with Box -->
        <div class="absolute left-[201px] bottom-[-254px] z-10
                {visible ? 'animate-slide-up' : 'translate-y-full opacity-0'}"
             style="animation-delay: 0.7s">
            <div class="relative">
                <img
                        src={manIllustration}
                        alt="Delivery man"
                        class="w-[204px] h-[454px]"
                />
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes slide-up {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .animate-slide-up {
        animation: slide-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
</style>
