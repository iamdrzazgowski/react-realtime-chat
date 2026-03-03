import { getUsers } from '@/services/apiUsers';
import { useQuery } from '@tanstack/react-query';
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
        queryKey: ['users', debouncedSearch],
        queryFn: () =>
            getUsers({ search: debouncedSearch, limit: initialLimit }),
    });

    return { isLoading, isError, usersData };
};
