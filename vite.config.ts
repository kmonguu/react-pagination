import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react({ jsxImportSource: '@emotion/react' }), dts()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/lib/index.ts'),
            name: 'ReactPagination',
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
    },
})
