// Importaciones de hooks de React.
import { useState, useEffect, useCallback } from "react";
// Importaciones de hooks de react-redux para interactuar con el store.
import { useDispatch, useSelector } from "react-redux";
// Importación de la acción asíncrona (thunk) que creamos en el slice.
import { fetchUserAndPosts } from "../redux/slices/userSlice";

/**
 * Un custom hook que actúa como intermediario entre los componentes de UI y el store de Redux.
 * Encapsula la lógica para despachar acciones y seleccionar datos del estado global.
 *
 * @param {number} initialUserId - El ID del usuario que se cargará inicialmente.
 * @returns {object} Un objeto con el estado y las funciones para interactuar con la lógica del usuario.
 */
export const useUser = (initialUserId = 1) => {
    // Estado para el valor del campo de entrada de texto.
    const [inputValue, setInputValue] = useState(initialUserId.toString());
    // Estado para mantener el ID que se ha buscado y mostrarlo en la UI si no se encuentra.
    const [searchId, setSearchId] = useState(null);

    // Hook de Redux para seleccionar (leer) datos del store.
    // Nos suscribimos a las partes del estado que nos interesan.
    const { user, posts, isLoading, error } = useSelector(
        (state) => state.user
    );
    // Hook de Redux para poder despachar acciones.
    const dispatch = useDispatch();

    // `useEffect` para ejecutar la búsqueda inicial cuando el componente se monta.
    useEffect(() => {
        if (initialUserId) {
            dispatch(fetchUserAndPosts(initialUserId));
            setSearchId(initialUserId.toString());
        }
    }, [dispatch, initialUserId]); // Se ejecuta solo una vez al montar.

    // Manejador para actualizar el estado del input.
    const handleInputChange = (e) => {
        const value = e.target.value;
        // Valida que el ID esté entre 1 y 10 (o vacío).
        if (/^$|^[1-9]$|^10$/.test(value)) {
            setInputValue(value);
        }
    };

    // Manejador para iniciar una nueva búsqueda.
    const handleSearch = useCallback(() => {
        if (inputValue) {
            setSearchId(inputValue);
            dispatch(fetchUserAndPosts(Number(inputValue)));
        }
    }, [dispatch, inputValue]);

    // Manejador para reintentar la última búsqueda fallida.
    const handleRetry = useCallback(() => {
        if (searchId) {
            dispatch(fetchUserAndPosts(Number(searchId)));
        }
    }, [dispatch, searchId]);

    // El hook devuelve un objeto con todos los estados y manejadores
    // para que el componente que lo use pueda utilizarlos.
    return {
        user,
        posts,
        isLoading,
        error,
        inputValue,
        searchId,
        handleInputChange,
        handleSearch,
        handleRetry,
    };
};
