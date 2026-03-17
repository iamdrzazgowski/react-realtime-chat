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
            <main className="fixed inset-0 flex overflow-hidden bg-background">
                <div
                    className={cn(
                        "w-full md:w-80 lg:w-96 shrink-0 h-full",
                        isConversationOpen ? "hidden md:block" : "block",
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

                <div
                    className={cn(
                        "flex-1 h-full min-w-0",
                        isConversationOpen ? "block" : "hidden md:block",
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
