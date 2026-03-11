import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes/router.tsx";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SettingsProvider } from "./context/settings-contex.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

function App() {
    return (
        <SettingsProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />

                <Toaster
                    position="bottom-right"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "var(--background)",
                            color: "var(--foreground)",
                        },
                    }}
                />
                {/*<ReactQueryDevtools initialIsOpen={false} />*/}
            </QueryClientProvider>
        </SettingsProvider>
    );
}

export default App;
