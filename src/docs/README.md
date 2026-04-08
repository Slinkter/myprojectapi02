# Technical Documentation - UserApp Pro

Bienvenido a la documentación técnica de **UserApp Pro**. Para facilitar el _onboarding_ (incorporación) de nuevos ingenieros al equipo, hemos estructurado la documentación en un orden lógico de lectura, desde el "qué" del sistema hasta el "cómo" de su implementación y prueba.

---

## 📖 Ruta de Lectura Recomendada

### 1. El Producto y sus Objetivos
- **[01 - Requirements & Use Cases](./01-REQUIREMENTS.md)**
  _Empieza aquí._ Comprende qué hace el sistema, los casos de uso que cubre y los requisitos funcionales de negocio (ej. manejo de la API JSONPlaceholder).

### 2. El Diseño Estructural
- **[02 - Architectural Overview](./02-ARCHITECTURE.md)**
  Visión global del sistema. Conoce nuestras capas (Onion Architecture), la estrategia de modularidad (Entities, Features, Widgets) y el stack tecnológico.

### 3. El Movimiento de Información
- **[03 - Technical Data Lifecycle](./03-DATA_LIFECYCLE.md)**
  Detalle técnico del flujo de datos, desde la API externa a través de nuestra **Capa Anti-Corrupción (Mappers)** hasta el store global gestionado por Redux Toolkit.

### 4. La Operativa y el Código
- **[04 - Developer Guide](./04-DEVELOPMENT_GUIDE.md)**
  El manual del desarrollador. Incluye estándares de código (ej. reglas para Tailwind v4), setup del entorno y el paso a paso para agregar nuevas características sin romper la arquitectura.

### 5. La Seguridad y Estabilidad
- **[05 - Testing & Quality Strategy](./05-TESTING_STRATEGY.md)**
  Cómo probamos el software. Detalles de la suite de pruebas (Vitest + React Testing Library) dividida por capas lógicas (Hooks de UI y Mappers de Dominio).

### 6. El Lenguaje del Dominio
- **[06 - Terminology & Glossary](./06-GLOSSARY.md)**
  Diccionario formal de términos. Útil para consultar definiciones específicas empleadas a lo largo de los manuales y en el código.

---

## 📁 Archivo Histórico
- **[Archive/Legacy](./archive/)**
  Carpeta de solo lectura con diagnósticos iniciales, planes de refactorización antiguos y reportes pasados.

---

> **Nota para Desarrolladores:** La documentación granular a nivel de componentes individuales y funciones se mantiene estrictamente en el código fuente utilizando **JSDoc**. Esto garantiza que la documentación siempre evolucione a la par que la implementación técnica.
