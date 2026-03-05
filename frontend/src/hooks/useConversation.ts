import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createDirectConversation as createDirectConversationAPI,
    getConversations as getConversationsAPI,
} from '@/services/apiConversation';
import toast from 'react-hot-toast';

export const useCreateDirectConversation = () => {
    const queryClient = useQueryClient();

    const { mutate: createDirectConversation, isPending } = useMutation({
        mutationFn: (userId: string) => createDirectConversationAPI(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            toast.success('Conversation successfully created!');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { createDirectConversation, isPending };
};

export const useGetConversations = () => {
    const {
        isLoading,
        isError,
        data: conversationsData,
    } = useQuery({
        queryKey: ['conversations'],
        queryFn: () => getConversationsAPI(),
        staleTime: 1000 * 60,
    });

    return { isLoading, isError, conversationsData };
};
