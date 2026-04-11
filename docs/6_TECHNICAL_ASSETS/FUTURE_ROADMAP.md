# UserApp Pro - Future Roadmap

## 🚀 Vision Estratégica: Migración a Ecosistema Moderno
El objetivo a largo plazo es evolucionar de una SPA (Vite + JSDoc) hacia una arquitectura robusta, escalable y tipo-segura.

### Fase 1: Calidad y Estandarización
- [ ] **Commitlint:** Implementar Conventional Commits para automatizar el versionado y CHANGELOG.
- [ ] **Bundle Analysis:** Integrar `rollup-plugin-visualizer` para optimización de paquetes.
- [ ] **Monitoreo:** Integrar Sentry para observabilidad en tiempo real.

### Fase 2: Migración a TypeScript & Testing de Interacción
- [ ] **TypeScript:** Migración progresiva de .jsx a .tsx para garantizar seguridad de tipos completa.
- [ ] **Testing:** Migración de la suite actual de Vitest hacia pruebas de integración más robustas con MSW (Mock Service Worker) para interceptar peticiones API reales.

### Fase 3: Transición a Next.js (App Router)
- [ ] **Framework:** Migración a Next.js (App Router).
    - *Beneficios:* Server Components (RSC) para mejorar el SEO y reducir el JavaScript enviado al cliente.
    - *Estrategia:* Migración por rutas (incrementales) comenzando por páginas estáticas.
- [ ] **Server Actions:** Reemplazar el flujo actual de Redux Thunks por Server Actions para mutaciones de datos simplificadas.
- [ ] **Streaming & Suspense:** Implementar patrones de carga nativos de Next.js para mejorar el *Core Web Vitals*.

### Fase 4: Optimización Final
- [ ] **PWA:** Implementar Service Workers para capacidad offline.
- [ ] **Seguridad:** Configuración estricta de CSP (Content Security Policy).
