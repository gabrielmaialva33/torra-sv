import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte()],
    // Configure base path for GitHub Pages
    // Replace 'torra-sv' with your repository name
    base: process.env.NODE_ENV === 'production' ? '/torra-sv/' : '/',
    resolve: {
        alias: {
            '$lib': path.resolve('./src/lib'),
            '$src': path.resolve('./src'),
            '$assets': path.resolve('./src/assets'),
            '$components': path.resolve('./src/lib/components'),
            '$pages': path.resolve('./src/lib/pages'),
        }
    },
})