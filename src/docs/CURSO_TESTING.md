# 🧪 Curso: El Guardián del Código (Testing Experimental)
## Aprende a Crear Software Indestructible con Vitest

¡Bienvenido al nivel más alto de la ingeniería! Un código sin tests es como un puente sin planos: puede sostenerse hoy, pero nadie sabe por qué. En este curso, aprenderás a ser el **Guardián** de tu propia creación.

---

## 🧩 Fase 1: La Filosofía del Test
No testeamos para "ver si funciona" (eso lo hace el navegador). Testeamos para **garantizar que siga funcionando** dentro de seis meses cuando otra persona cambie una coma.

### El Mantra: AAA (Arrange, Act, Assert)
Es la fórmula mágica de la claridad:
1.  **Arrange (Organizar):** Pones las piezas en la mesa.
2.  **Act (Actuar):** Presionas el botón.
3.  **Assert (Afirmar):** Compruebas si explotó o si hizo magia.

---

## 🛠️ Fase 2: Tu Laboratorio (Configuración)
Hemos dejado todo listo para que tú mismo instales las máquinas. 

**Tu primera misión:**
```bash
# Instala las máquinas de rayos X
pnpm add -D vitest @testing-library/react jsdom
```

---

## 📖 Fase 3: Tu Primer Experimento (Mappers)
Los **Mappers** son funciones puras. Son perfectas para empezar porque no dependen de nada externo. 

### El Caso de Prueba (ASCII UML)
```text
ENTRADA CRUDA {id: 1}  -----> [ TESTER ] -----> SALIDA ESPERADA {id: 1, name: "N/A"}
                                  |
                         ¿Es igual? SI -> PASA ✅
```

**Reto Práctico:** Crea un archivo `user.mappers.test.js` y asegúrate de que si envías un objeto vacío, el Mapper no rompa la aplicación, sino que retorne `null` con elegancia.

---

## 🚀 Fase 4: El Futuro (TDD)
El **Test-Driven Development** es el arte de escribir el test *antes* que el código. Es como dibujar la meta antes de empezar a correr. Te obliga a pensar en los requisitos antes de perderte en la sintaxis.

---

## 💡 Consejos de Grado Doctoral
*   **No busques el 100%:** Testea lo que duele. Si el buscador de usuarios falla, la app muere. Eso es prioridad alta.
*   **Habla en el Test:** Un test debe leerse como una frase: *"Debe retornar un error amigable cuando el ID es mayor a 10"*.
*   **Mocks con Amor:** Usa los mocks para simular que internet es perfecto, pero también para simular que el servidor ha muerto. Tu código debe sobrevivir a ambos.

---
**¿Listo para tu primer `pnpm test`? El conocimiento te espera.**
