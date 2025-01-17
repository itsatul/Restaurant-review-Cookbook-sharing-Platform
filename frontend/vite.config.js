// import {defineConfig} from 'vite'
// import react from '@vitejs/plugin-react-swc'
//
// // https://vite.dev/config/
// export default defineConfig({
//     plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to your backend server
      '/api': {
        target: 'https://luna-project-batch30.propulsion-learn.ch', // Replace with your actual backend URL
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS
        rewrite: (path) => path.replace(/^\/api/, '/backend/api'), // Optional: rewrite the API path if needed
      },
    },
  },
})
