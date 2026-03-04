# 🚀 Gemini CLI Implementation Prompt

Copy and paste the prompt below into your Gemini CLI to automatically implement the UX improvements identified in the Antigravity audit.

---

## Prompt for Gemini CLI

**Role:** Expert React & Tailwind CSS Developer
**Context:** I have an application `myprojectapi02` that uses JSONPlaceholder. We just did a UX audit and identified several high-priority improvements.

**Task:** Please implement the following 3 features in the codebase:

### 1. Human-Friendly Search (Search by Name/Username)

- **Problem:** `SearchBar.jsx` only accepts numeric IDs (1-10).
- **Required:**
    - Update `user.api.js` to include a `getAllUsers()` function.
    - Update the search logic (likely in a Redux thunk or the parent component of `SearchBar`) to fetch all users on mount (or cache them).
    - Modify `SearchBar.jsx` to allow text input.
    - If the input is a number, fetch by ID (existing logic).
    - If the input is text, filter the users list by `name` or `username`.
    - If multiple matches found, show a simple dropdown or selection list.

### 2. Interactive Input Validation & Feedback

- **Required:**
    - In `SearchBar.jsx`, add a "helper text" below the input.
    - If the user types a number > 10, show a warning in red: "La API solo soporta IDs del 1 al 10."
    - If the user types text and no results are found, show: "No se encontró ningún usuario con ese nombre."

### 3. Full Glassmorphism Theme Fixes

- **Context:** Antigravity already fixed the basic `dark:` variant toggle in `index.css` and `MainLayout.jsx`.
- **Required:**
    - Audit `UserProfile.jsx` and `PostList.jsx`.
    - Ensure every element has a `dark:` variant class.
    - Example: `bg-white/90` should have `dark:bg-slate-800/90`.
    - Text colors should adjust: `text-slate-800` -> `dark:text-slate-200`.

### 4. Internationalization (i18n) Foundation

- **Required:**
    - Set up a simple `translations.js` file with mappings for English and Spanish for all UI labels (e.g., "Buscar Perfil", "Publicaciones", "Buscando...").
    - Implement a small toggle in the header (near the theme toggle) to switch between 'ES' and 'EN'.

---

**Execution Rules:**

- Follow the **Feature-Based Architecture** defined in `GEMINI.md`.
- Maintain the **JSDoc** documentation style.
- Use **Tailwind CSS v4** utility classes.
- Ensure the app remains responsive.

---
