# 🎓 Masterclass: Ingeniería de Software en React SPA
## Análisis de Ingeniería Inversa del Proyecto `myprojectapi02`

Este curso desglosa la arquitectura y lógica aplicadas en este proyecto para que entiendas cómo se construye software escalable.

---

## 🏗️ Módulo 1: Arquitectura Basada en Dominios (Features)

En lugar de organizar por `components/` o `pages/`, usamos **Feature-Based Architecture**. Cada funcionalidad (como `user-search`) es un "micro-mundo" independiente.

### Diagrama de Dependencias (UML ASCII)
```text
[ Feature: user-search ]
          |
          +-- [ UI ] : Componentes visuales (UserView, SearchBar).
          +-- [ Hooks ] : Orquestadores de lógica (useUserSearch).
          +-- [ Services ] : Reglas de negocio (user-service).
          +-- [ Redux ] : Estado global y Thunks.
          +-- [ API ] : Comunicación externa y Mappers.
```

---

## 🔄 Módulo 2: El Ciclo de Vida de una Petición (API & Mappers)

La lógica de programación aquí sigue el principio de **Aislamiento de Infraestructura**.

### El Patrón Mapper
La API externa nos entrega "basura" o datos desordenados. El Mapper los limpia antes de que entren al dominio.

**Diagrama de Transformación:**
```text
[ API Externa ] ----> [ Mapper ] ----> [ Domain Entity ]
(JSON Sucio)        (Sanitización)     (Objeto Perfecto)
```

**Lógica Aplicada:**
- **Inmutabilidad:** No modificamos el objeto original.
- **Tipado Dinámico:** Aseguramos que si la API no envía un campo, el Mapper ponga un valor por defecto (ej: `name || "N/A"`).

---

## 🧠 Módulo 3: Patrones de Diseño y Lógica de UI

### 1. State Boundary (Lógica de Renderizado Condicional)
En lugar de ensuciar la página con `if/else`, centralizamos el estado de la aplicación.

**Diagrama de Estados:**
```text
[ Idle ] --(search)--> [ Loading ] --(success)--> [ Succeeded ]
                           |
                           +--(error)----> [ Failed ]
                           |
                           +--(no data)--> [ NotFound ]
```

### 2. Custom Hooks (Composición de Lógica)
Usamos hooks para separar la **Lógica de Entrada** (`useSearchInput`) de la **Lógica de Dominio** (`useUserSearch`).
- **useSearchInput:** Controla el input, valida que sean números, maneja mensajes de ayuda.
- **useUserSearch:** Se conecta a Redux, dispara búsquedas, maneja el caché de usuarios.

---

## 🎨 Módulo 4: Estética e Ingeniería de CSS (Tailwind v4)

Aplicamos **Glassmorphism** y **Utility-First CSS**.
- **Lógica de Diseño:** El diseño es reactivo al tema (oscuro/claro) usando variables de entorno de CSS.
- **Rendimiento:** Al usar Tailwind, el bundle de CSS es mínimo porque solo se exporta lo que se usa.

---

## ⚙️ Módulo 5: Bibliotecas Usadas y Por Qué
1.  **Redux Toolkit:** Para un estado predecible y herramientas de desarrollo potentes.
2.  **Heroicons:** Iconografía SVG ligera y accesible.
3.  **Vite:** Herramienta de construcción ultra-rápida (HMR instantáneo).

---

## 📝 Conclusión para el Estudiante
Este proyecto no es solo una web de búsqueda; es un sistema diseñado para fallar con elegancia (ErrorBoundary), ser fácil de leer (Clean Code) y extremadamente rápido (Memorización).

**Tu reto:** Intenta añadir una nueva feature siguiendo esta misma estructura:
1. Crea la carpeta en `features/`.
2. Define tu API y Mappers.
3. Crea tu Slice de Redux.
4. Diseña tu UI usando `StateBoundary`.

---
*Este curso fue generado mediante la ingeniería inversa del sistema actual.*
