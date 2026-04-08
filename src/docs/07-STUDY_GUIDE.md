# Guía de Estudio Arquitectónico: UserApp Pro (De Cero a Senior)

Bienvenido a la guía de estudio oficial de **UserApp Pro - Enterprise API Consumer**. Este documento está diseñado para leerse como un libro de texto avanzado. Si eres un desarrollador Senior buscando entender las decisiones de diseño, o alguien que quiere consolidar fundamentos de arquitectura en React, este es tu punto de partida.

---

## Índice
1. [Capítulo 1: La Filosofía del Proyecto](#capítulo-1-la-filosofía-del-proyecto)
2. [Capítulo 2: Arquitectura Limpia y Diseño por Características](#capítulo-2-arquitectura-limpia-y-diseño-por-características)
3. [Capítulo 3: El Patrón Anti-Corrupción (Mappers)](#capítulo-3-el-patrón-anti-corrupción-mappers)
4. [Capítulo 4: Gestión de Estado (El Enfoque Híbrido)](#capítulo-4-gestión-de-estado-el-enfoque-híbrido)
5. [Capítulo 5: Resiliencia y Control de Flujo](#capítulo-5-resiliencia-y-control-de-flujo)
6. [Capítulo 6: El Flujo de Vida de un Dato (Ejemplo Práctico)](#capítulo-6-el-flujo-de-vida-de-un-dato-ejemplo-práctico)

---

## Capítulo 1: La Filosofía del Proyecto

### ¿Por qué complicar una aplicación de búsqueda?
A simple vista, buscar un usuario en una API como JSONPlaceholder parece requerir solo un `fetch` y un `useState`. Sin embargo, en un entorno **Enterprise**, las aplicaciones crecen, los endpoints cambian, y el código se vuelve insostenible si la UI y la lógica de negocio están acopladas.

**Nuestras premisas:**
- **La UI es "tonta":** React solo debe preocuparse por renderizar datos, no por saber cómo obtenerlos o transformarlos.
- **El Dominio es sagrado:** Nuestra aplicación debe tener sus propias reglas de negocio independientes de lo que devuelva el backend.
- **Resiliencia por defecto:** Las peticiones de red fallan, los usuarios hacen clics rápidos. Debemos manejar cancelaciones (`AbortController`) y estados asíncronos limpiamente (`StateBoundary`).

### Stack Tecnológico
- **React 18 & Vite:** Rendimiento puro, concurrencia y construcción ultrarrápida.
- **Redux Toolkit (RTK):** Para el estado global determinista.
- **Tailwind CSS v4:** Estilos aislados, sin hojas de estilos globales propensas a colisiones.

---

## Capítulo 2: Arquitectura Limpia y Diseño por Características

Hemos adoptado una estructura basada en **Feature-Driven Architecture** inspirada en principios de **Clean Architecture** (o Arquitectura Hexagonal/Onion).

El sistema se divide en **Cuentro Capas Clave**:

1. **Capa de Presentación (UI / Components):** Todo lo que ves. Botones, inputs, perfiles. *Regla: No hay fetch ni lógica de negocio aquí.*
2. **Capa de Aplicación (Store / Hooks):** Los casos de uso. ¿Qué pasa cuando el usuario hace clic en "Buscar"? Aquí viven los *Redux Thunks* y los *Custom Hooks*.
3. **Capa de Dominio (Domain / Entities):** Las reglas de oro de nuestra app. Modelos de datos locales y Mappers.
4. **Capa de Infraestructura (API / Services):** Detalles concretos de cómo hablamos con el mundo exterior (peticiones HTTP).

### Estructura de Carpetas Explicada
```text
src/
 ├─ app/           # Inicialización global (Redux Store principal)
 ├─ entities/      # Entidades de dominio base (ej. User, Post)
 ├─ features/      # Casos de uso específicos (ej. user-search)
 ├─ pages/         # Ensamblaje de características en vistas ruteables
 ├─ shared/        # Componentes y utilidades compartidas (Botones, API Client)
 └─ widgets/       # Bloques de UI grandes que unen varias entidades
```

Cada característica en `src/features/` o `src/entities/` replica la separación de capas internamente (api, domain, store, ui).

---

## Capítulo 3: El Patrón Anti-Corrupción (Mappers)

Uno de los conceptos más importantes para un desarrollador Senior es evitar que los datos externos "corrompan" el sistema interno.

**El Problema:** La API de JSONPlaceholder devuelve un usuario así:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "company": { "name": "Romaguera-Crona", "catchPhrase": "..." }
}
```
Si usamos este objeto directamente en nuestros componentes, el día que el backend decida cambiar `name` a `fullName`, tendremos que actualizar 50 componentes de React.

**La Solución: El Mapper (`user.mappers.js`)**
El Mapper actúa como un traductor en la frontera de nuestra aplicación. Transforma el modelo de la API al modelo de nuestro **Dominio**.

```javascript
// src/entities/user/domain/user.mappers.js
export const mapApiUserToDomain = (apiUser) => ({
  id: apiUser.id,
  nombreCompleto: apiUser.name,
  empresa: apiUser.company.name,
  // ... extraemos solo lo que necesitamos
});
```
Ahora la UI siempre espera `nombreCompleto`. Si la API cambia, solo actualizamos el Mapper.

---

## Capítulo 4: Gestión de Estado (El Enfoque Híbrido)

No metemos todo en Redux. Usamos la herramienta adecuada para el trabajo adecuado:

1. **Estado Local (`useState`):** 
   - Efímero. Ejemplo: El texto que el usuario está escribiendo en la barra de búsqueda en tiempo real, antes de presionar Enter.
   
2. **Estado Global UI (`Context API`):** 
   - Transversal y con poca frecuencia de cambio. Ejemplo: El Tema Oscuro/Claro (`useTheme.js`). No necesitamos el "viaje en el tiempo" de Redux para saber si es de día o de noche.

3. **Estado Global de Dominio (`Redux Toolkit`):** 
   - Datos complejos, caché y peticiones asíncronas. Ejemplo: La lista de usuarios, el estado de carga y el manejo de errores.
   - Usamos **Thunks** para la asincronía.
   - Usamos **Selectores Memoizados** (`createSelector`) para evitar re-renderizados innecesarios cuando extraemos datos del Store.

---

## Capítulo 5: Resiliencia y Control de Flujo

Las aplicaciones web en el mundo real se rompen. Las redes son lentas. El usuario es impaciente.

### 1. Cancelación de Peticiones (`AbortController`)
Si un usuario busca "Juan", y un milisegundo después busca "María", la petición de "Juan" sigue viajando por la red. Si responde después que la de "María", la UI mostrará datos incorrectos (**Race Condition**).

En la capa de **Infraestructura**, nuestros servicios inyectan un `AbortSignal` en las llamadas nativas de `fetch`. Los *Redux Thunks* orquestan esto cancelando la petición anterior automáticamente antes de lanzar la nueva.

### 2. Contenedor de Estados (`StateBoundary`)
En React, es común ver código espagueti con múltiples `if`:
```javascript
if (loading) return <Spinner />;
if (error) return <Error />;
return <Data />;
```
Hemos abstraído esto en el componente `StateBoundary.jsx`. Este componente envuelve nuestra UI y gestiona de forma declarativa y elegante el flujo visual de promesas (Loading -> Error / Success).

---

## Capítulo 6: El Flujo de Vida de un Dato (Ejemplo Práctico)

¿Qué ocurre exactamente cuando el usuario busca un ID en la barra de búsqueda?

1. **Interacción (UI):** El usuario escribe "1" en `SearchBar.jsx` y pulsa Enter.
2. **Hook de Caso de Uso (Capa de Aplicación):** El componente llama al custom hook `useUserSearch`.
3. **Despacho a Redux:** El hook despacha la acción asíncrona (Thunk) `fetchUserById(1)`.
4. **Resiliencia:** El Thunk verifica si había una petición previa y la cancela usando `AbortController`.
5. **Infraestructura:** El Thunk invoca a `userApi.getUser(1)`.
6. **Capa Anti-Corrupción:** La respuesta bruta del backend pasa por el `mapApiUserToDomain()`.
7. **Actualización del Estado:** Redux guarda el modelo de dominio limpio y cambia el estado de `loading` a `success`.
8. **Reacción (UI):** El componente `UserProfile.jsx` (que estaba envuelto en un `StateBoundary` mostrando un Skeleton) recibe el nuevo estado mediante un selector memoizado y renderiza la información del usuario en pantalla.

---
*Fin de la Guía. Recomendamos explorar la carpeta `src/features/user-search` mientras se lee el Capítulo 6 para ver estos conceptos aplicados en código real.*