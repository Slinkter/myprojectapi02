# Requirements & Use Cases - UserApp Pro

## 🎯 Project Objective
Desarrollar una aplicación de alto rendimiento para la consulta y visualización de perfiles de usuario consumiendo la API pública JSONPlaceholder.

---

## ✅ Functional Requirements (FR)

### FR-01: Búsqueda de Usuarios
- El sistema debe permitir buscar usuarios por **ID numérico** (rango 1 a 10).
- El sistema debe permitir buscar usuarios por **nombre de usuario** (Caché local).
- Se debe implementar un sistema de validación de entrada con feedback en tiempo real.

### FR-02: Visualización de Perfiles
- Mostrar datos demográficos (Nombre, Email, Empresa, Sitio Web).
- Listar las publicaciones (Posts) asociadas al usuario encontrado.
- Implementar skeletons de carga para mejorar la percepción de velocidad.

### FR-03: Resiliencia de Datos
- Manejar estados de error de red.
- Manejar estados de "Usuario no encontrado" (404).
- Permitir el reintento manual de peticiones fallidas.

---

## 🏗️ Use Cases (UC)

### UC-01: Búsqueda Exitosa por ID
1.  **Actor:** Usuario final.
2.  **Acción:** Ingresa "5" en el buscador y pulsa Enter.
3.  **Resultado:** Se muestra el perfil de "Chelsey Dietrich" con sus 10 posts.

### UC-02: Búsqueda por Nombre (Caché)
1.  **Actor:** Usuario final.
2.  **Acción:** Ingresa "Kamren" (username) en el buscador.
3.  **Resultado:** El motor resuelve el ID 5 y carga su perfil.

### UC-03: Gestión de Error 404
1.  **Actor:** Usuario final.
2.  **Acción:** Ingresa un ID inexistente (ej: 99).
3.  **Resultado:** Se muestra una tarjeta informativa indicando que el usuario no existe.
