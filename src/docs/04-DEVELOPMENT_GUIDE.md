# Developer Guide - Onboarding & Standards

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18+
- **Package Manager:** `pnpm` (recomendado) o `npm`.

### Setup
1. `pnpm install` - Instala dependencias.
2. `pnpm dev` - Inicia servidor de desarrollo (Vite).
3. `pnpm build` - Construye paquete de producción.
4. `pnpm lint` - Ejecuta ESLint con reglas estrictas.

---

## 🛠️ Coding Standards

### Clean Code Principles
- **Early Returns:** Prioriza `if (!id) return;` sobre bloques anidados.
- **Single Responsibility:** Los componentes deben encargarse de una sola cosa (Smart vs Dumb).
- **Naming:** Usa nombres de dominio claros (`UserSearchPage` vs `Search`).

### UI & Styling
- **Tailwind v4:** No crees archivos CSS externos. Usa utilidades directas.
- **Responsive:** Diseña siempre con `sm:`, `md:`, `lg:` en mente.
- **Theme:** Usa el hook `useTheme` para componentes sensibles al modo oscuro.

### State Management
- No uses `useState` para datos que deban compartirse. Usa Redux Slices.
- Usa `createSelector` para transformar datos del estado (Memoización).
- **AbortController:** Siempre propaga el `signal` en thunks asíncronos.

---

## 📁 Workflow para Nuevas Funcionalidades
1.  **Define la Entidad:** Crea la carpeta en `src/entities/[name]/`.
2.  **API & Mappers:** Implementa las llamadas y sanitización.
3.  **State:** Define el Slice y sus Thunks.
4.  **Feature:** Crea la lógica de interacción en `src/features/[name]/`.
5.  **Widget/Page:** Integra las piezas en la UI.
6.  **Test:** Verifica la lógica de negocio y hooks.
