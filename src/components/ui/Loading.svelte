<script>
  import {onMount} from 'svelte';
  import {tweened} from 'svelte/motion';
  import {cubicOut} from 'svelte/easing';

  export let size = 'medium';
    export let color = 'primary';

    // Create tweened values for smooth animations
    const rotation = tweened(0, {
        duration: 2000,
        easing: cubicOut
    });

    const scale = tweened(1, {
        duration: 800,
        easing: cubicOut
    });

    // Size classes mapping
    const sizeClasses = {
        small: 'w-8 h-8',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    // Color classes mapping
    const colorClasses = {
        primary: 'text-torra-orange',
        white: 'text-white',
        dark: 'text-torra-dark'
    };

    // Animate on mount
    onMount(() => {
        const interval = setInterval(() => {
            rotation.update(r => r + 360);
        }, 2000);

        // Pulse effect
        const pulseInterval = setInterval(() => {
            scale.set(1.1);
            setTimeout(() => scale.set(1), 400);
        }, 1600);

        return () => {
            clearInterval(interval);
            clearInterval(pulseInterval);
        };
    });
</script>

<div class="relative {sizeClasses[size]} {colorClasses[color]}">
    <!-- Main spinner -->
    <svg
            class="absolute inset-0 animate-spin"
            fill="none"
            style="transform: rotate({$rotation}deg) scale({$scale})"
            viewBox="0 0 24 24"
    >
        <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
        />
        <path
                class="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
        />
    </svg>

    <!-- Orbital dots -->
    <div class="absolute inset-0 animate-pulse">
        {#each [0, 120, 240] as angle, i}
            <div
                    class="absolute w-2 h-2 bg-current rounded-full opacity-60"
                    style="
          top: 50%;
          left: 50%;
          transform: 
            translate(-50%, -50%) 
            rotate({angle + $rotation * 0.5}deg) 
            translateY(-{size === 'small' ? 12 : size === 'medium' ? 18 : 24}px);
          animation-delay: {i * 0.2}s;
        "
            ></div>
        {/each}
    </div>
</div>

<style>
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .animate-spin {
        animation: spin 1s linear infinite;
    }
</style>