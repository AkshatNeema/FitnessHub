// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
// import { defineConfig } from 'vite';
// import vercel from 'vite-plugin-vercel';
 
// export default defineConfig({
//   server: {
//     port: 5173,
//   },
//   plugins: [vercel()],
// });