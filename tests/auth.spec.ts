import { test, expect } from '@playwright/test';

test.describe('Módulo de Autenticación y Registro - Recy Connect', () => {

    test('Escenario 1: Registro exitoso de un nuevo Ciudadano', async ({ page }) => {
        await page.goto('register');
        await expect(page.getByRole('heading', { name: 'Recy Connect' })).toBeVisible();

        // Usar un email único por ejecución para evitar conflictos
        const uniqueEmail = `mateo.test+${Date.now()}@mail.com`;

        await page.locator('input[name="name"]').fill('Mateo Software');
        await page.locator('input[name="email"]').fill(uniqueEmail);
        await page.locator('input[name="password"]').fill('SecurePass123!');

        await page.getByRole('combobox').click();
        await page.getByRole('option', { name: 'Ciudadano' }).click();

        // Monitorear la respuesta del backend ANTES de hacer clic
        const registerPromise = page.waitForResponse(response =>
            response.url().includes('/auth/register') || response.url().includes('/auth/signup')
        );

        await page.getByRole('button', { name: 'Registrarse' }).click();

        const registerResponse = await registerPromise;
        console.log('Status registro:', registerResponse.status());
        console.log('Body:', await registerResponse.text());

        // Esperar redirección con timeout más amplio
        await expect(page).toHaveURL(/\/recy-connect\/?$/, { timeout: 10000 });
    });

    test('Escenario 2: Inicio de Sesión Exitoso y Carga de Rutas Dinámicas', async ({ page }) => {
        // 1. Ir a la raíz del subdominio
        await page.goto('');

        // 2. Rellenar credenciales PRIMERO
        await page.locator('input[name="email"]').fill('usuario1@gmail.com');
        await page.locator('input[name="password"]').fill('123456789');

        // 3. Configurar los listeners ANTES del clic
        const loginPromise = page.waitForResponse(response =>
            response.url().includes('/auth/login')
        );

        const routesPromise = page.waitForResponse(response =>
            response.url().includes('/routes')
        );

        // 4. Hacer clic
        await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

        // 5. Esperar respuestas
        const loginResponse = await loginPromise;
        console.log('Login status:', loginResponse.status());

        const routesResponse = await routesPromise;
        console.log('Routes status:', routesResponse.status());

        // 6. Verificar localStorage
        const localStorageRoutes = await page.evaluate(() => localStorage.getItem('roleRoutes'));
        expect(localStorageRoutes).not.toBeNull();

        // 7. Validar redirección
        await expect(page.locator('input[name="email"]')).not.toBeVisible({ timeout: 10000 });

    });

    test('Escenario 3: Flujo de navegación alternativa al registro', async ({ page }) => {
        // 1. Ir a la raíz
        await page.goto('');

        // 2. Hacer clic en el Link de React Router "¿Aún no eres parte? Registrate"
        await page.getByRole('link', { name: 'Registrate' }).click();

        // 3. Verificar que cambió de ruta correctamente conteniendo 'register' al final
        await expect(page).toHaveURL(/\/recy-connect\/register/);
    });
});