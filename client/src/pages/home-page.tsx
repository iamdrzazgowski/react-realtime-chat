import { ConversationList } from "@/components/conversation-list";
import { Suspense, lazy, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useAuth";
import { Outlet, useMatch } from "react-router";
import LoadingPage from "./loading-page";

const DirectConversationDialog = lazy(() =>
    import("@/components/direct-conversation-dialog").then((m) => ({
        default: m.DirectConversationDialog,
    })),
);
const CreateGroupDialog = lazy(() =>
    import("@/components/create-group-dialog").then((m) => ({
        default: m.CreateGroupDialog,
    })),
);
const ProfileSheet = lazy(() =>
    import("@/components/profile-sheet").then((m) => ({
        default: m.ProfileSheet,
    })),
);

export default function HomePage() {
    const { user, isLoading } = useUser();
    const isConversationOpen = useMatch("/conversation/:conversationID");

    const [createDirectConversation, setCreateDirectConversation] =
        useState(false);
    const [createGroupOpen, setCreateGroupOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const openDirect = useCallback(
        () => setCreateDirectConversation(true),
        [],
    );
    const openGroup = useCallback(() => setCreateGroupOpen(true), []);
    const openProfile = useCallback(() => setProfileOpen(true), []);

    // Wait for the single cached user query instead of rendering
    // children with an undefined user (js-early-exit).
    if (isLoading || !user) return <LoadingPage />;

    return (
        <>
            <main className="fixed inset-0 flex overflow-hidden bg-background">
                <div
                    className={cn(
                        "w-full md:w-80 lg:w-96 shrink-0 h-full",
                        isConversationOpen ? "hidden md:block" : "block",
                    )}
                >
                    <ConversationList
                        onCreateDirectConversation={openDirect}
                        onCreateGroup={openGroup}
                        onOpenProfile={openProfile}
                        user={user}
                    />
                </div>

                <div
                    className={cn(
                        "flex-1 h-full min-w-0",
                        isConversationOpen ? "block" : "hidden md:block",
                    )}
                >
                    <Outlet />
                </div>
            </main>

            <Suspense fallback={null}>
                {createDirectConversation ? (
                    <DirectConversationDialog
                        open={createDirectConversation}
                        onOpenChange={setCreateDirectConversation}
                    />
                ) : null}
                {createGroupOpen ? (
                    <CreateGroupDialog
                        open={createGroupOpen}
                        onOpenChange={setCreateGroupOpen}
                    />
                ) : null}
                {profileOpen ? (
                    <ProfileSheet
                        open={profileOpen}
                        onOpenChange={setProfileOpen}
                        user={user}
                    />
                ) : null}
            </Suspense>
        </>
    );
}
