import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getUser,
    registerUser as registerUserAPI,
    loginUser as loginUserAPI,
} from '@/services/apiAuth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import type { LoginFormValues, SignUpFormValues } from '@/types/form';

export const useUser = () => {
    const token = localStorage.getItem('token');

    const {
        isLoading,
        data: user,
        isError,
    } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
        enabled: !!token,
    });

    return { isLoading, user, isError };
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: loginUser, isPending: isLoading } = useMutation({
        mutationFn: (data: LoginFormValues) => loginUserAPI(data),
        onSuccess: (data) => {
            toast.success('Successfully logged in! Welcome back.');

            localStorage.setItem('token', data.token);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/');
        },
        onError: (err) => toast.error(err.message),
    });

    return { loginUser, isLoading };
};

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: registerUser, isPending: isLoading } = useMutation({
        mutationFn: (data: SignUpFormValues) => registerUserAPI(data),
        onSuccess: (data) => {
            toast.success('Account successfully created!');

            localStorage.setItem('token', data.token);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/');
        },
        onError: (err) => toast.error(err.message),
    });

    return { registerUser, isLoading };
};
