import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://stevenjocz.github.io/Antopia/' // Asegúrate de que sea el nombre correcto de tu repositorio
})
