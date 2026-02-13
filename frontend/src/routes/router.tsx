import { createBrowserRouter } from 'react-router';
import ChatPage from '@/pages/chat-page';
import LoginPage from '@/pages/login-page';
import PageNotFound from '@/pages/page-not-found';
import SignupPage from '@/pages/signup-page';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ChatPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]);
