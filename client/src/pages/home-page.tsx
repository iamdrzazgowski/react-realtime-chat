import { ConversationList } from "@/components/conversation-list";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProfileSheet } from "@/components/profile-sheet";
import { useUser } from "@/hooks/useAuth";
import { Outlet, useMatch } from "react-router";
import { DirectConversationDialog } from "@/components/direct-conversation-dialog";
import { CreateGroupDialog } from "@/components/create-group-dialog";

export default function HomePage() {
    const { user } = useUser();
    const isConversationOpen = useMatch("/conversation/:conversationID");

    const [createDirectConversation, setCreateDirectConversation] =
        useState(false);
    const [createGroupOpen, setCreateGroupOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <>
            <main className="flex h-dvh overflow-hidden bg-background">
                {/* Sidebar - conversation list */}
                <div
                    className={cn(
                        "w-full md:w-80 lg:w-96 shrink-0 transition-transform duration-200",
                        isConversationOpen
                            ? "-translate-x-full md:translate-x-0"
                            : "translate-x-0",
                    )}
                >
                    <ConversationList
                        onCreateDirectConversation={() =>
                            setCreateDirectConversation(true)
                        }
                        onCreateGroup={() => setCreateGroupOpen(true)}
                        onOpenProfile={() => setProfileOpen(true)}
                        user={user}
                    />
                </div>

                {/* Chat / Outlet panel */}
                <div
                    className={cn(
                        "absolute inset-0 md:relative md:inset-auto flex-1 transition-transform duration-200",
                        isConversationOpen
                            ? "translate-x-0"
                            : "translate-x-full md:translate-x-0",
                    )}
                >
                    <Outlet />
                </div>
            </main>

            <DirectConversationDialog
                open={createDirectConversation}
                onOpenChange={setCreateDirectConversation}
            />
            <CreateGroupDialog
                open={createGroupOpen}
                onOpenChange={setCreateGroupOpen}
            />

            <ProfileSheet
                open={profileOpen}
                onOpenChange={setProfileOpen}
                user={user}
            />
        </>
    );
}
