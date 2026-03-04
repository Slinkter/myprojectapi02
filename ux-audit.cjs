const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  console.log('--- INICIO DE AUDITORÍA FORENSE DINÁMICA ---');
  
  try {
    // 1. Navegación
    console.log('[1] Navegando a http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 5000 });
    console.log('✓ Página cargada.');

    // 2. Auditoría de Tema (Toggle Dark Mode)
    console.log('[2] Probando Toggle Theme...');
    const themeButton = page.locator('button[aria-label*="tema"]');
    
    // Estado inicial
    const initialClass = await page.evaluate(() => document.documentElement.className);
    console.log(`- Clase inicial HTML: "${initialClass}"`);

    // Click 1
    await themeButton.click();
    await page.waitForTimeout(500); // Esperar transición
    const classAfterClick1 = await page.evaluate(() => document.documentElement.className);
    console.log(`- Clase después de clic 1: "${classAfterClick1}"`);

    // Click 2 (Volver al estado anterior)
    await themeButton.click();
    await page.waitForTimeout(500);
    const classAfterClick2 = await page.evaluate(() => document.documentElement.className);
    console.log(`- Clase después de clic 2: "${classAfterClick2}"`);

    if (classAfterClick1 === initialClass) {
      console.error('❌ ERROR FUNCIONAL: El botón de tema no cambió la clase del elemento HTML.');
    } else {
      console.log('✓ ÉXITO: El botón de tema alterna correctamente las clases.');
    }

    // 3. Auditoría de Búsqueda (Funcionalidad de ID)
    console.log('[3] Probando búsqueda de Usuario ID: 5...');
    const input = page.locator('input[placeholder*="ID"]');
    const searchButton = page.locator('button:has-text("Buscar")');

    await input.fill('5');
    await searchButton.click();
    
    // Esperar a que aparezca el perfil o el skeleton
    await page.waitForSelector('.animate-in', { timeout: 3000 });
    const userName = await page.locator('h2').innerText();
    console.log(`✓ Resultado de búsqueda: Usuario "${userName}" encontrado.`);

    // 4. Auditoría de Responsividad (Móvil)
    console.log('[4] Probando Responsividad (iPhone SE)...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Verificar si el formulario de búsqueda se apila verticalmente (vía Tailwind flex-col sm:flex-row)
    const searchFormDir = await page.evaluate(() => {
      const el = document.querySelector('.flex-col'); // Es nuestra clase de refactorización
      return window.getComputedStyle(el).flexDirection;
    });
    console.log(`- Dirección del Flex en móvil: ${searchFormDir}`);

    // Captura de pantalla forense (simulada por logs en este entorno)
    console.log('--- AUDITORÍA COMPLETADA ---');

  } catch (error) {
    console.error('❌ FALLO CRÍTICO DURANTE LA AUDITORÍA:', error.message);
    console.log('Nota: ¿Está el servidor de Vite corriendo en el puerto 5173?');
  } finally {
    await browser.close();
  }
})();
