import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createDirectConversation as createDirectConversationAPI,
    createGroupConversation as createGroupConversationAPI,
    deleteConversationById as deleteConversationByIdAPI,
    getConversationById,
    getConversations as getConversationsAPI,
} from '@/services/apiConversation';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

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

export const useCreateGroupConversation = () => {
    const queryClient = useQueryClient();

    const { mutate: createGroupConversation, isPending } = useMutation({
        mutationFn: ({
            groupName,
            userIds,
        }: {
            groupName: string;
            userIds: string[];
        }) => createGroupConversationAPI(groupName, userIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            toast.success('Conversation successfully created!');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { createGroupConversation, isPending };
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

export const useGetConversationById = () => {
    const { conversationID } = useParams();

    const {
        isLoading,
        isError,
        data: conversationData,
    } = useQuery({
        queryKey: ['conversation', conversationID],
        queryFn: () => getConversationById(conversationID as string),
        enabled: !!conversationID,
        staleTime: 1000 * 60,
    });

    return { isLoading, isError, conversationData };
};

export const useDeleteConversationById = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteConversationById, isPending } = useMutation({
        mutationFn: (conversationId: string) =>
            deleteConversationByIdAPI(conversationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            toast.success('Conversation successfully created!');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { deleteConversationById, isPending };
};
