/**
 * @file Hook personalizado para gestionar la obtención de datos de un usuario y sus publicaciones.
 * @author Tu Nombre
 * @see <a href="https://reactjs.org/docs/hooks-custom.html">Custom Hooks</a>
 */

import { useEffect, useCallback, useReducer } from "react";
import { getUser } from "../api/user";
import { getPostsByUser } from "../api/post";

/**
 * @typedef {object} UserState
 * @property {boolean} isLoading - Verdadero si los datos se están cargando.
 * @property {string|null} error - Mensaje de error si alguna petición falla.
 * @property {object|null} user - Datos del usuario.
 * @property {Array<object>} posts - Lista de publicaciones del usuario.
 */

/**
 * @typedef {object} Action
 * @property {string} type - El tipo de acción a realizar.
 * @property {object} [payload] - Los datos asociados con la acción.
 */

// Estado inicial para el reducer.
const initialState = {
    isLoading: false,
    error: null,
    user: null,
    posts: [],
};

/**
 * Reducer para gestionar el estado de la obtención de datos del usuario.
 * Centraliza toda la lógica de transición de estado.
 * @param {UserState} state - El estado actual.
 * @param {Action} action - La acción a procesar.
 * @returns {UserState} El nuevo estado.
 */
function userReducer(state, action) {
    switch (action.type) {
        case "FETCH_START":
            return { ...initialState, isLoading: true };
        case "FETCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                posts: action.payload.posts,
                error: action.payload.error,
            };
        case "FETCH_ERROR":
            return { ...state, isLoading: false, error: action.payload.error };
        default:
            // Lanza un error si se recibe un tipo de acción desconocido.
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

/**
 * Hook personalizado para gestionar la obtención de datos de un usuario y sus publicaciones.
 * Encapsula la lógica de estado (carga, error, datos) y los efectos secundarios (peticiones a la API).
 * Utiliza `Promise.allSettled` para ejecutar las peticiones en paralelo y mejorar el rendimiento.
 *
 * @param {number | string} userId - El ID del usuario del cual se quieren obtener los datos.
 * @returns {object} - Un objeto que contiene:
 *  - `user`: (object|null) Los datos del usuario.
 *  - `posts`: (Array<object>) Un array con las publicaciones del usuario.
 *  - `isLoading`: (boolean) Un booleano que indica si la petición está en curso.
 *  - `error`: (string|null) Un mensaje de error si la petición falla.
 *  - `refetch`: Una función para volver a ejecutar la obtención de datos.
 */
export const useUser = (userId) => {
    // `useReducer` es ideal para manejar estados complejos con transiciones bien definidas.
    const [state, dispatch] = useReducer(userReducer, initialState);

    /**
     * Función asíncrona para obtener los datos.
     * `useCallback` la memoriza para evitar recreaciones innecesarias en cada render.
     */
    const fetchUserData = useCallback(async () => {
        if (!userId) return;

        // Despacha la acción de inicio de carga.
        dispatch({ type: "FETCH_START" });

        try {
            // Ejecuta ambas peticiones en paralelo para mayor eficiencia.
            const results = await Promise.allSettled([
                getUser(userId),
                getPostsByUser(userId),
            ]);

            const [userResult, postsResult] = results;

            // Recopila los errores si alguna de las promesas fue rechazada.
            const errors = results
                .filter((result) => result.status === "rejected")
                .map((result) => result.reason.message);

            // Despacha la acción de éxito con los datos obtenidos.
            dispatch({
                type: "FETCH_SUCCESS",
                payload: {
                    user:
                        userResult.status === "fulfilled"
                            ? userResult.value
                            : null,
                    posts:
                        postsResult.status === "fulfilled"
                            ? postsResult.value
                            : [],
                    error: errors.length > 0 ? errors.join(", ") : null,
                },
            });
        } catch (error) {
            // Este catch es una salvaguarda para errores inesperados.
            dispatch({
                type: "FETCH_ERROR",
                payload: {
                    error: "Ocurrió un error inesperado al procesar los datos.",
                },
            });
        }
    }, [userId]);

    // `useEffect` se ejecuta al montar el componente y cada vez que `fetchUserData` cambia (es decir, cuando `userId` cambia).
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    // El hook devuelve el estado actual y la función para re-lanzar la petición.
    return { ...state, refetch: fetchUserData };
};
