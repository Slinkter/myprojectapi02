# 🎓 Curso de Introducción al Testing de Software
## Para Desarrolladores React (Nivel: Desde Cero)

¡Bienvenido! Este documento es tu hoja de ruta para aprender a probar tu código. No necesitas conocimientos previos. Aquí aprenderás **qué**, **por qué** y **cómo** testear una aplicación moderna.

---

## 📚 Módulo 1: La Teoría Fundamental

### 1. ¿Qué es el Testing?
Es el proceso de verificar que tu código hace exactamente lo que se espera de él. No se trata solo de encontrar errores, sino de **prevenirlos** antes de que lleguen al usuario.

### 2. ¿Por qué testear? (Incluso si "ya funciona")
- **Confianza:** Puedes cambiar el código (refactorizar) sabiendo que no romperás nada.
- **Documentación:** Un test bien escrito explica cómo funciona una función mejor que un comentario.
- **Ahorro de Tiempo:** Es más rápido encontrar un error con un test que buscarlo manualmente en el navegador cada vez.

### 3. La Pirámide de Testing
1.  **Unit Tests (Unitarios):** Prueban una sola pieza pequeña (una función, un mapper). Son rápidos y hay muchos.
2.  **Integration Tests (Integración):** Prueban cómo interactúan varias piezas (un hook con el store de Redux).
3.  **E2E Tests (End-to-End):** Simulan a un usuario real en el navegador. Son lentos pero cubren todo el flujo.

---

## ⚙️ Módulo 2: Herramientas del Proyecto

En este proyecto utilizamos:
- **Vitest:** El motor que ejecuta los tests (muy rápido, diseñado para Vite).
- **React Testing Library (RTL):** La librería para interactuar con componentes como lo haría un usuario.
- **Mocking:** Técnica para simular respuestas de APIs externas (como JSONPlaceholder) sin hacer peticiones reales.

---

## 🛠️ Módulo 3: El Patrón de Oro "AAA"
Todos los tests deben seguir este orden para ser legibles:

1.  **Arrange (Organizar):** Preparas el escenario (variables, datos, mocks).
2.  **Act (Actuar):** Ejecutas la función o acción que quieres probar.
3.  **Assert (Afirmar/Verificar):** Compruebas si el resultado es el esperado.

---

## 📝 Módulo 4: Paso a Paso - Tu Primer Test

### Paso 1: Testeando un Mapper (Unit Test)
Los mappers son ideales para empezar porque son funciones puras.

**Archivo:** `src/features/user-search/api/__tests__/user.mappers.test.js`

```javascript
import { describe, it, expect } from 'vitest';
import { mapRawUser } from '../user.mappers';

describe('mapRawUser', () => {
  it('debe transformar datos crudos en un objeto sanitizado (AAA)', () => {
    // 1. Arrange
    const rawUser = { id: 1, name: 'John', email: 'j@j.com' };

    // 2. Act
    const result = mapRawUser(rawUser);

    // 3. Assert
    expect(result.id).toBe(1);
    expect(result.name).toBe('John');
    expect(result.email).toBe('j@j.com');
  });

  it('debe retornar null si no hay ID (Early Return)', () => {
    const result = mapRawUser({ name: 'No ID' });
    expect(result).toBeNull();
  });
});
```

---

## 🚀 Módulo 5: Plan de Ejecución Manual (Tu Tarea)

Para aprender de verdad, te sugiero seguir estos pasos manualmente:

### Fase 3.1: Configuración Inicial
1.  Instala las dependencias: `pnpm add -D vitest @testing-library/react jsdom @testing-library/jest-dom`.
2.  Crea el archivo `vitest.config.js` (tienes la base en `TODO-TESTING.md`).
3.  Agrega el script `"test": "vitest"` en tu `package.json`.

### Fase 3.2: Práctica con Mappers (Nivel Fácil)
- Crea la carpeta `__tests__` dentro de `src/features/user-search/api/`.
- Escribe tests para `mapRawUser` y `mapRawPosts`.
- Ejecuta `pnpm test` y observa cómo pasan (o fallan).

### Fase 3.3: Práctica con Componentes (Nivel Medio)
- Prueba que `SearchBar` llame a la función `onSearch` al hacer clic.
- Usa `render` de `@testing-library/react` y `fireEvent`.

---

## 💡 Consejos de Oro para el Futuro
1.  **No busques el 100% de cobertura:** Enfócate en la lógica de negocio crítica (mappers, hooks, servicios).
2.  **Testea comportamiento, no implementación:** No pruebes "si el estado cambió a true", prueba "si el mensaje de error es visible para el usuario".
3.  **El test falla primero:** Intenta escribir un test que falle y luego escribe el código para que pase (TDD).

---

### 📚 Recursos Adicionales
- [Documentación Oficial de Vitest](https://vitest.dev/)
- [React Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)

---
**¿Listo para empezar con la Fase 3.1? Si tienes dudas sobre algún término, ¡pregúntame!**
