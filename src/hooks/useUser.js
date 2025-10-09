import { useState, useEffect, useCallback } from 'react';
import { getUser } from '../api/user';
import { getPost } from '../api/post';

export const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    const fetchUserData = useCallback(async () => {
        if (!userId) return;

        setIsLoading(true);
        setIsError(null);
        setUser(null);
        setPosts([]);

        try {
            const userData = await getUser(userId);
            setUser(userData);

            if (userData && userData.id) {
                const postData = await getPost(userData.id);
                setPosts(postData);
            }
        } catch (error) {
            setIsError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return { user, posts, isLoading, isError, refetch: fetchUserData };
};
