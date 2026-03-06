/**
 * Diccionario de traducciones jerárquico para Clean Code i18n.
 */
export const translations = {
  es: {
    app: {
      title: "UserApp Pro",
      footer: "Ingeniería de alto rendimiento con Tailwind v4.",
    },
    search: {
      title: "Buscador de Usuarios",
      description: "Busca por ID numérico (1-10) o nombre de usuario.",
      placeholder: "ID (1-10) o Nombre...",
      button: "Buscar",
      loading: "Buscando...",
      helper: {
        limit: "La API solo soporta IDs del 1 al 10.",
        idOk: "Buscando por ID numérico.",
        nameOk: "Buscando por nombre o usuario.",
      }
    },
    user: {
      postsTitle: "Publicaciones",
      noPosts: "Este usuario aún no tiene publicaciones.",
      notFoundTitle: "Usuario no encontrado",
      notFoundDesc: "No pudimos encontrar ningún perfil asociado a",
    },
    error: {
      title: "¡Ups! Algo salió mal",
      retry: "Reintentar",
      generic: "Error desconocido de infraestructura.",
    },
    ui: {
      themeLight: "Cambiar a modo claro",
      themeDark: "Cambiar a modo oscuro",
      langEs: "Español",
      langEn: "Inglés"
    }
  },
  en: {
    app: {
      title: "UserApp Pro",
      footer: "High-performance engineering with Tailwind v4.",
    },
    search: {
      title: "User Search",
      description: "Search by numeric ID (1-10) or username.",
      placeholder: "ID (1-10) or Name...",
      button: "Search",
      loading: "Searching...",
      helper: {
        limit: "The API only supports IDs from 1 to 10.",
        idOk: "Searching by numeric ID.",
        nameOk: "Searching by name or username.",
      }
    },
    user: {
      postsTitle: "User Posts",
      noPosts: "This user has no posts yet.",
      notFoundTitle: "User Not Found",
      notFoundDesc: "We couldn't find any profile associated with",
    },
    error: {
      title: "Oops! Something went wrong",
      retry: "Retry",
      generic: "Unknown infrastructure error.",
    },
    ui: {
      themeLight: "Switch to light mode",
      themeDark: "Switch to dark mode",
      langEs: "Spanish",
      langEn: "English"
    }
  }
};
