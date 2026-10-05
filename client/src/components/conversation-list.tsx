import { useDeferredValue, useMemo, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { SidebarHeader } from "./sidebar-header";
import { ConversationSearch } from "./conversation-search";
import { ConversationItem } from "./conversation-item";
import { useGetConversations } from "@/hooks/useConversation";
import { Link, useParams } from "react-router";

interface Conversation {
    id: string;
    type: "DIRECT" | "GROUP";
    user?: {
        firstName?: string;
        lastName?: string;
        isOnline?: boolean;
    } | null;
    name?: string | null;
    lastMessage?: {
        id: string;
        senderId: string;
        content: string;
        createdAt?: string | Date;
        timestamp?: string | Date;
    } | null;
    lastReadAt?: string | Date | null;
}

interface ConversationListProps {
    onCreateDirectConversation: () => void;
    onCreateGroup: () => void;
    onOpenProfile: () => void;
    user: {
        id: string;
        firstName: string;
        lastName: string;
    };
}

const EMPTY_STATE_TITLE = "No results";

export function ConversationList({
    onCreateDirectConversation,
    onCreateGroup,
    onOpenProfile,
    user,
}: ConversationListProps) {
    const [search, setSearch] = useState("");
    // Deferred search (rerender-use-deferred-value): keystrokes stay
    // responsive while the expensive list filter runs at lower priority.
    const deferredSearch = useDeferredValue(search);
    const { conversationsData } = useGetConversations();
    const { conversationID: activeConversationId } = useParams();

    const filteredConversations = useMemo(() => {
        if (!conversationsData?.conversations) return [];

        const lowerSearch = deferredSearch.trim().toLowerCase();
        if (lowerSearch.length === 0) {
            return conversationsData.conversations as Conversation[];
        }

        return (conversationsData.conversations as Conversation[]).filter(
            (conv) => {
                if (conv.type === "DIRECT" && conv.user) {
                    const fullName =
                        `${conv.user.firstName} ${conv.user.lastName}`.toLowerCase();
                    return fullName.includes(lowerSearch);
                } else if (conv.type === "GROUP") {
                    return (conv.name ?? "")
                        .toLowerCase()
                        .includes(lowerSearch);
                }
                return false;
            },
        );
    }, [conversationsData, deferredSearch]);

    return (
        <div className="flex h-full flex-col border-r border-border bg-card">
            <SidebarHeader
                onCreateDirectConversation={onCreateDirectConversation}
                onCreateGroup={onCreateGroup}
                onOpenProfile={onOpenProfile}
                user={user}
            />

            <ConversationSearch value={search} onChange={setSearch} />

            <ScrollArea className="flex-1">
                <div className="flex flex-col">
                    {filteredConversations.length > 0 ? (
                        filteredConversations.map((conversation) => (
                            <Link
                                key={conversation.id}
                                to={`/conversation/${conversation.id}`}
                            >
                                <ConversationItem
                                    conversation={conversation}
                                    currentUserId={user.id}
                                    isActive={
                                        activeConversationId ===
                                        conversation.id
                                    }
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-sm text-muted-foreground">
                                {EMPTY_STATE_TITLE}
                            </p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
