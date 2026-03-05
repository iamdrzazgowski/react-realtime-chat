import { useMutation } from '@tanstack/react-query';
import { createDirectConversation as createDirectConversationAPI } from '@/services/apiConversation';
import toast from 'react-hot-toast';

export const useCreateDirectConversation = () => {
    const { mutate: createDirectConversation, isPending } = useMutation({
        mutationFn: (userId: string) => createDirectConversationAPI(userId),
        onSuccess: () => {
            toast.success('Conversation successfully created!');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { createDirectConversation, isPending };
};
