import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Carpeta donde Playwright buscará tus archivos de prueba
  testDir: './tests',

  /* Correr pruebas en paralelo */
  fullyParallel: true,

  /* No fallar localmente si se olvida un test.only */
  forbidOnly: false,

  /* Reintentos en caso de fallo (0 para local para ahorrar tiempo) */
  retries: 0,

  /* Trabajadores simultáneos en local */
  workers: undefined,

  /* Reporte en formato HTML interactivo */
  reporter: 'html',

  /* Configuración compartida */
  use: {
    // 🚀 DEFINIMOS LA BASE URL: Cambia el puerto si tu Vite/Next usa otro (ej: 5173 o 3000)
    baseURL: 'http://localhost:5173/recy-connect/',

    /* Guardar trazas en caso de que una prueba falle */
    trace: 'on-first-retry',
  },

  /* Probaremos únicamente en Chromium (Chrome) para agilizar tu entrega y no saturar la máquina */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});