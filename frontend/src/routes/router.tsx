import { createBrowserRouter } from 'react-router';
import HomePage from '@/pages/home-page';
import LoginPage from '@/pages/login-page';
import PageNotFound from '@/pages/page-not-found';
import SignupPage from '@/pages/signup-page';
import ProtectedRoute from './protected-route';

export const router = createBrowserRouter([
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        ),
    },
    { path: '*', element: <PageNotFound /> },
]);
