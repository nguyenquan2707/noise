import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'
import { rmSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ command }) => {
    rmSync('dist-electron', { recursive: true, force: true })

    const isServe = command === 'serve'
    const isBuild = command === 'build'
    const sourcemap = isServe || !!process.env.VSCODE_DEBUG

    return {
        plugins: [
            vue(),
            electron([
                {
                    entry: 'electron/main.js',
                    onstart(options) {
                        if (process.env.VSCODE_DEBUF) {
                            console.log('[startup] Electron App')
                        } else {
                            options.startup()
                        }
                    },
                    vite: {
                        build: {
                            sourcemap,
                            minify: isBuild,
                            outDir: 'dist-electron',
                            rollupOptions: {
                                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
                            }
                        }
                    }
                },

                {
                    entry: 'electron/preload.js',
                    onstart(options) {
                        options.reload()
                    },
                    vite: {
                        build: {
                            sourcemap: sourcemap ? 'inline' : undefined,
                            minify: isBuild,
                            outDir: 'dist-electron',
                            rollupOptions: {
                                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
                            }
                        }
                    }
                }
            ]),

            renderer(),
        ],

        resolve: {
            alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },

        server: {
            host: 'localhost',
            port: '5173',
            proxy: {
                '/api': {
                    target: 'http://localhost/',
                    changeOrigin: true,
                    rewrite:path => path.replace(/^\/api/, '')
                },
                '/upload': {
                    target: 'http://localhost/',
                    changeOrigin: true,
                },
            }
        },

        clearScreen: false,
    }
})