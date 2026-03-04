const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    colorScheme: 'light', // Iniciar en modo claro
  });
  const page = await context.newPage();

  console.log('\n--- 🤖 INFORME DE AGENTE UX: AUDITORÍA EN TIEMPO REAL ---');
  
  try {
    // 1. Carga Inicial y Latencia Visual
    console.log('[AGENT] Navegando a http://localhost:5173...');
    const startTime = Date.now();
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 5000 });
    const loadTime = Date.now() - startTime;
    console.log(`- Tiempo de carga percibido: ${loadTime}ms`);

    // 2. Interacción de Búsqueda (Input & Botón)
    console.log('[AGENT] Probando funcionalidad de búsqueda (ID 1)...');
    const input = page.locator('input[id="userId"]');
    const button = page.locator('button:has-text("Buscar")');

    await input.fill('1');
    await button.click();
    
    // Verificar si aparece el Skeleton
    const hasSkeleton = await page.locator('.animate-pulse').count() > 0;
    console.log(`- ¿Se mostró el Skeleton de carga? ${hasSkeleton ? 'SÍ (UX Positivo)' : 'NO (Posible parpadeo)'}`);

    // Esperar datos reales
    await page.waitForSelector('h2:has-text("Leanne Graham")', { timeout: 3000 });
    console.log('- Datos de Leanne Graham renderizados correctamente.');

    // 3. Prueba de Cambio de Tema (Toggle Theme)
    console.log('[AGENT] Probando Toggle de Tema Claro/Oscuro...');
    const themeBtn = page.locator('button[aria-label*="tema"]');
    
    // Activar Modo Oscuro
    await themeBtn.click();
    await page.waitForTimeout(600); // Esperar transición CSS de 0.3s
    
    const isDarkClassSet = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const bgColor = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
    console.log(`- ¿Clase .dark activa? ${isDarkClassSet ? 'SÍ' : 'NO'}`);
    console.log(`- Color de fondo detectado en modo oscuro: ${bgColor}`);

    // 4. Auditoría de Errores de Consola
    page.on('console', msg => {
      if (msg.type() === 'error') console.log(`[BROWSER ERROR] ${msg.text()}`);
    });

    // 5. Análisis de Responsividad Móvil
    console.log('[AGENT] Cambiando a vista móvil (375x667)...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    const isStacked = await page.evaluate(() => {
      const form = document.querySelector('.flex-col');
      return window.getComputedStyle(form).flexDirection === 'column';
    });
    console.log(`- ¿El formulario se apila correctamente en móvil? ${isStacked ? 'SÍ' : 'NO'}`);

    console.log('\n--- ✅ INFORME DE AGENTE FINALIZADO ---');

  } catch (error) {
    console.error('\n❌ ERROR DEL AGENTE:', error.message);
  } finally {
    await browser.close();
  }
})();
