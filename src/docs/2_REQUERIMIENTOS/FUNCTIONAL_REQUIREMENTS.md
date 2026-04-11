# 2_REQUERIMIENTOS/FUNCTIONAL_REQUIREMENTS.md

## Requerimientos Funcionales

1. **Buscador de Usuarios:**
   - Resolución de ID numérico.
   - Resolución por nombre de usuario mediante búsqueda $O(1)$.
   - Soporte para nombres con acentos o case-insensitive.
2. **Vista de Usuario:**
   - Carga dinámica del perfil.
   - Visualización de publicaciones del usuario.
3. **Manejo de Errores:**
   - Estados: `idle`, `loading`, `succeeded`, `failed`, `notFound`.
   - Recuperación ante errores de red mediante `ApiError`.
4. **Optimización Móvil:**
   - Animaciones fluidas a 60 FPS en dispositivos de gama baja.
   - Degradación de efectos visuales (blurs) en dispositivos con recursos limitados.
