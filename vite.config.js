/**
 * @fileoverview Configuración del entorno de desarrollo y construcción con Vite.
 * Define plugins de React y Tailwind CSS, y configura alias de rutas.
 * 
 * @module vite-config
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias '@' mapea directamente al directorio 'src' para importaciones limpias.
      '@': path.resolve(__dirname, './src'),
    },
  },
})
