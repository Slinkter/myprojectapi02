/**
 * Custom hook to manage user and posts data fetching logic.
 * Encapsulates state for search input, dispatches Redux actions,
 * and selects data from the Redux store.
 *
 * @param {number} [initialUserId=1] - The user ID to fetch on initial load.
 * @returns {UserData & UserActions} - An object containing user data and action handlers.
 */ /**
 * @typedef {object} UserData
 * @property {object|null} user - The user object.
 * @property {Array<object>} posts - The list of posts by the user.
 * @property {boolean} isLoading - Loading state.
 * @property {string|null} error - Error message.
 * @param {number} [initialUserId=1] - The user ID to fetch on initial load.
 * @returns {UserData & UserActions} - An object containing user data and action handlers.
 */

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndPosts as thunkFetch } from "../redux/slices/userSlice";

export const useUser = (initialUserId = 1) => {
    const [inputValue, setInputValue] = useState(initialUserId.toString());
    const [searchId, setSearchId] = useState(null);
    const dispatch = useDispatch();

    // Selects the user state from the Redux store.
    const { user, posts, isLoading, error } = useSelector(
        (state) => state.user
    );

    /**
     * Fetches the initial user data when the component mounts.
     * It runs whenever the initialUserId or dispatch function changes.
     */
    useEffect(() => {
        if (initialUserId) {
            dispatch(thunkFetch(initialUserId));
            setSearchId(initialUserId.toString());
        }
    }, [dispatch, initialUserId]);

    /**
     * The input change event.
     * Handles changes to the user ID input field, allowing only valid numbers.
     */
    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^$|^[1-9]$|^10$/.test(value)) {
            setInputValue(value);
        }
    };

    /**
     * Triggers a search for the user and posts based on the current input value.
     */
    const handleSearch = useCallback(() => {
        if (inputValue) {
            setSearchId(inputValue);
            dispatch(thunkFetch(Number(inputValue)));
        }
    }, [dispatch, inputValue]);

    /**
     * Retries the last failed search.
     */
    const handleRetry = useCallback(() => {
        if (searchId) {
            dispatch(thunkFetch(Number(searchId)));
        }
    }, [dispatch, searchId]);

    const props = {
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

    return props;
};
