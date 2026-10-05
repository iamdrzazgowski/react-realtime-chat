import { getUsers } from '@/services/apiUsers';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface UseUsersParams {
    search: string;
    initialLimit?: number;
    debounceTime?: number;
}

export const useUsers = ({
    search,
    initialLimit = 5,
    debounceTime = 500,
}: UseUsersParams) => {
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, debounceTime);

        return () => clearTimeout(timer);
    }, [search, debounceTime]);

    const {
        isLoading,
        isError,
        data: usersData,
    } = useQuery({
        queryKey: ['users', debouncedSearch, initialLimit],
        queryFn: ({ signal }) =>
            getUsers(
                { search: debouncedSearch, limit: initialLimit },
                signal,
            ),
        // Keep previous list visible while the debounced query refetches
        // instead of flashing a spinner on every keystroke.
        placeholderData: keepPreviousData,
        staleTime: 30 * 1000,
    });

    return { isLoading, isError, usersData };
};
