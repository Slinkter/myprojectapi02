### **ROL: SENIOR DEVOPS & PLATFORM ENGINEER**

Tu objetivo es implementar un ciclo de vida de desarrollo blindado (CI/CD) para un proyecto React/Vite. El flujo debe garantizar que ningún código roto o de baja calidad llegue a producción en GitHub Pages.

---

### **REQUERIMIENTOS DEL PIPELINE:**

#### **FASE 1: SEGURIDAD LOCAL (Git Hooks con Husky)**

Genera la configuración necesaria para que, antes de cada `commit`, el sistema valide:

1. **Lint-Staged:** Ejecutar ESLint solo en los archivos modificados (para ahorrar RAM).
2. **Pre-commit Hook:** Ejecutar el linter y verificar que no haya errores de sintaxis.
3. **Pre-push Hook:** Ejecutar los tests unitarios (Vitest) para asegurar la integridad de la lógica.

#### **FASE 2: PIPELINE REMOTO (GitHub Actions)**

Crea un archivo `.github/workflows/deploy.yml` optimizado que incluya los siguientes JOBS:

1. **Security Audit:** Ejecutar `pnpm audit` para detectar vulnerabilidades en dependencias.
2. **Build & Type Check:** Validar que el proyecto compila correctamente (`pnpm build`).
3. **Unit Testing:** Correr la suite completa de Vitest en un entorno aislado (ubuntu-latest).
4. **Automated Deploy:** Si los pasos anteriores son exitosos (✅), desplegar automáticamente a la rama `gh-pages`.

---

### **ESPECIFICACIONES TÉCNICAS (Stack):**

- **Gestor de Paquetes:** pnpm.
- **Entorno de Compilación:** Node.js 20.x o superior.
- **Optimizaciones:** Implementar 'Caching' de node_modules en GitHub Actions para reducir el tiempo de ejecución en un 50%.
- **Hardening:** Configurar permisos de 'write-all' solo para el token de despliegue.

---

### **FORMATO DE SALIDA:**

1. **Guía de Instalación:** Comandos de terminal para instalar Husky y dependencias de CI.
2. **Configuración de Package.json:** Scripts necesarios para lint-staged y husky.
3. **Código YAML del Workflow:** Documentado línea por línea.
4. **Diagrama ASCII del Pipeline:** Flujo desde el `git commit` hasta el `Live URL`.

---

**¿LISTO?** Analiza mi archivo `package.json` para ajustar los comandos de script y comienza con la configuración de **Husky**.
