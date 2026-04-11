# 1_INICIO_Y_ALCANCE/PROJECT_OVERVIEW.md

## Proyecto: UserApp Pro (myprojectapi02)

### Resumen
**UserApp Pro** es una Single Page Application (SPA) de alto rendimiento orientada a la gestión y búsqueda de usuarios y sus publicaciones. El proyecto prioriza la eficiencia algorítmica y la degradación elegante en dispositivos de gama baja.

### Tech Stack
- **React 18.3** (Vite 5.4)
- **Estado:** Redux Toolkit 2.11
- **Estilos:** Tailwind CSS v4.2 (compilador nativo)
- **Validación:** Zod 4.3 (Capa Anti-Corrupción)
- **Arquitectura:** Feature-Sliced Design (FSD)

### Alcance
- Búsqueda instantánea de usuarios (ID/Nombre) usando indexación $O(1)$.
- Visualización de perfiles con carga asíncrona y manejo de errores resiliente.
- Optimización móvil: Animaciones aceleradas por GPU y accesibilidad.
