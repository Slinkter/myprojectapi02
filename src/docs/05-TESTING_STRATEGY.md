# Quality Assurance & Testing Strategy

## 🎯 Testing Objectives
Garantizar la estabilidad de la lógica de dominio y la integridad de la UI mediante pruebas automatizadas resilientes.

---

## 🧪 Testing Layers

### 1. Unit Tests (Vitest)
- **Domain:** Pruebas de Mappers y Motores de Búsqueda.
- **Store:** Verificación de reducers y comportamiento de Thunks.
- **Ubicación:** `src/test/unit/`.

### 2. Hook Tests (React Testing Library)
- **Domain Hooks:** Verificación de la orquestación de Redux en `useUserSearch`.
- **UI Hooks:** Validación de lógica de input en `useSearchInput`.
- **Ubicación:** `src/test/hooks/`.

---

## 🛠️ Tools & Config
- **Test Runner:** Vitest.
- **Environment:** JSDOM (Simulación de navegador).
- **Mocks:** Usamos `vi.mock` para aislar dependencias externas (Redux, API).
- **Setup:** Configuración global en `src/test/setup.js`.

---

## 📝 Writing a Test Case
Ejemplo de estructura para un Hook:
1.  **Arrange:** Configura el `Provider` de Redux con un store mockeado.
2.  **Act:** Ejecuta `renderHook` y llama a las funciones del resultado.
3.  **Assert:** Verifica que los estados o dispatchers se llamaron correctamente.

---

## 🚦 Execution Commands
- `pnpm test`: Ejecuta todos los tests una vez.
- `pnpm test:watch`: Modo interactivo de desarrollo.
- `pnpm test:coverage`: Genera reporte de cobertura técnica.
