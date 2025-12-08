import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndPosts } from "../redux/slices/userSlice";

/**
 * Un custom hook que actúa como intermediario entre los componentes de UI y el store de Redux.
 * Encapsula la lógica para despachar acciones y seleccionar datos del estado global.
 *
 * @param {number} initialUserId - El ID del usuario que se cargará inicialmente.
 * @returns {object} Un objeto con el estado y las funciones para interactuar con la lógica del usuario.
 */
export const useUser = (initialUserId = 1) => {
    const [inputValue, setInputValue] = useState(initialUserId.toString());
    const [searchId, setSearchId] = useState(null);
    const { user, posts, status, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // `useEffect` para ejecutar la búsqueda inicial cuando el componente se monta.
    useEffect(() => {
        if (initialUserId) {
            setSearchId(initialUserId.toString());
            dispatch(fetchUserAndPosts(initialUserId));
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
        status,
        error,
        inputValue,
        searchId,
        handleInputChange,
        handleSearch,
        handleRetry,
    };
};
