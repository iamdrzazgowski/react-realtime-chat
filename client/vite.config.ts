import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
        tailwindcss(),
    ],
    server: {
        hmr: true,
        watch: {
            usePolling: true,
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router'],
                    query: ['@tanstack/react-query'],
                    socket: ['socket.io-client'],
                },
            },
        },
    },
});
