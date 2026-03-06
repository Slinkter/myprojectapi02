# 🤖 Guía: Model Context Protocol (MCP)
## El Estándar de Conectividad para la Inteligencia Artificial

¡Bienvenido! Este documento explica qué es MCP, por qué es importante y cómo se aplica a proyectos de ingeniería como este.

---

## 1. ¿Qué es MCP?

El **Model Context Protocol (MCP)** es un protocolo abierto que permite a las IAs (como Gemini o Claude) conectarse con herramientas y datos del "mundo real" de manera universal. 

### La Analogía del USB
*   **Antes de MCP:** Si querías que una IA leyera una base de datos de Google, necesitabas programar una conexión específica para Google. Si luego querías que leyera Slack, otra conexión.
*   **Con MCP:** La IA tiene un "puerto USB". Tú solo conectas un "dispositivo" (Servidor MCP) y la IA sabe usarlo instantáneamente.

---

## 2. Diagrama de Funcionamiento (ASCII)

```text
USUARIO (Tú)
     |
     v
[ MCP HOST / CLIENT ] <--- (Ej: Gemini CLI, Cursor, Claude Desktop)
     |
     +---------- [ MCP SERVER A ] ----> Acceso a tus ARCHIVOS locales.
     |
     +---------- [ MCP SERVER B ] ----> Acceso a Google SEARCH.
     |
     +---------- [ MCP SERVER C ] ----> Acceso a una API (JSONPlaceholder).
```

---

## 3. Componentes Clave

1.  **MCP Host (Cliente):** La aplicación donde vive la IA (en nuestro caso, este CLI).
2.  **MCP Server:** El pequeño programa que sabe hacer una tarea específica (ej: leer archivos, buscar en internet).
3.  **Transporte:** Cómo se comunican (usualmente mediante mensajes JSON).

---

## 4. ¿Cómo lo usamos en este proyecto?

En este proyecto, yo (la IA) estoy usando servidores MCP para ayudarte:
*   **filesystem:** Para leer y escribir tus archivos `.jsx` y `.md`.
*   **grep_search:** Para encontrar funciones rápidamente en todo el proyecto.
*   **context7 (docs):** Para consultar la documentación de las librerías que usas.

---

## 5. Recomendación de MCPs para `myprojectapi02`

Si quieres llevar este proyecto al siguiente nivel, podrías configurar estos servidores MCP:

| Servidor MCP | Función | Uso en este proyecto |
| :--- | :--- | :--- |
| **Puppeteer** | Navegador controlado por IA | Para que yo pueda ver tu web y arreglar el CSS visualmente. |
| **Fetch** | Peticiones HTTP | Para que yo pruebe la API de JSONPlaceholder sin que tú lances el navegador. |
| **Sequential Thinking** | Razonamiento lógico | Para resolver bugs arquitectónicos complejos paso a paso. |
| **PostgreSQL** | Base de Datos | Si decidieras guardar los usuarios favoritos en una DB real. |

---

## 6. Casos de Uso Prácticos

### Escenario A: Debugging de CSS
Tú: "La tarjeta no se ve bien en móviles."
IA (vía Puppeteer MCP): Abre el navegador, detecta que falta un `flex-wrap` y lo arregla automáticamente.

### Escenario B: Documentación Automática
IA (vía GitHub MCP): Lee tus últimos commits y actualiza `src/docs/` basándose en los cambios reales de código.

---
**¿Te gustaría aprender a instalar un servidor MCP en tu máquina para usarlo conmigo?**
