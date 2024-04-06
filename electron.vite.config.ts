import {
    defineConfig,
    externalizeDepsPlugin,
    bytecodePlugin,
} from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    },
    preload: {
        plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    },
    renderer: {
        plugins: [svelte()],
    },
})
