import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import ProtectedRoute from './protected-route';
import LoadingPage from '@/pages/loading-page';

// Route-level code splitting (bundle-dynamic-imports, bundle-conditional):
// each page + chat view loads only when its route is visited.
const HomePage = lazy(() => import('@/pages/home-page'));
const LoginPage = lazy(() => import('@/pages/login-page'));
const SignupPage = lazy(() => import('@/pages/signup-page'));
const PageNotFound = lazy(() => import('@/pages/page-not-found'));
const ConversationPlaceholder = lazy(
    () => import('@/components/conversation-placeholder'),
);
const ChatArea = lazy(() =>
    import('@/components/chat-area').then((m) => ({ default: m.ChatArea })),
);

function withSuspense(element: React.ReactNode) {
    return <Suspense fallback={<LoadingPage />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
    { path: '/login', element: withSuspense(<LoginPage />) },
    { path: '/signup', element: withSuspense(<SignupPage />) },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                {withSuspense(<HomePage />)}
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: withSuspense(<ConversationPlaceholder />),
            },
            {
                path: 'conversation/:conversationID',
                element: withSuspense(<ChatArea />),
            },
        ],
    },
    { path: '*', element: withSuspense(<PageNotFound />) },
]);
