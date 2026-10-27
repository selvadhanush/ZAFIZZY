import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    modulePreload: {
      resolveDependencies: (filename, deps) => {
        // Exclude heavy 3D vendor chunks from critical path head preloading
        return deps.filter((dep) => !dep.includes('three-vendor'));
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'gsap-vendor': ['gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
