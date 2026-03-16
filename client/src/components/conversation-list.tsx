import { useState, useMemo } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarHeader } from "./sidebar-header";
import { ConversationSearch } from "./conversation-search";
import { ConversationItem } from "./conversation-item";
import { useGetConversations } from "@/hooks/useConversation";
import { Link } from "react-router";

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

export function ConversationList({
    onCreateDirectConversation,
    onCreateGroup,
    onOpenProfile,
    user,
}: ConversationListProps) {
    const [search, setSearch] = useState("");
    const { conversationsData } = useGetConversations();

    const filteredConversations = useMemo(() => {
        if (!conversationsData?.conversations) return [];

        const lowerSearch = search.toLowerCase();

        return conversationsData.conversations.filter((conv: Conversation) => {
            if (conv.type === "DIRECT" && conv.user) {
                const fullName =
                    `${conv.user.firstName} ${conv.user.lastName}`.toLowerCase();
                return fullName.includes(lowerSearch);
            } else if (conv.type === "GROUP") {
                return (conv.name ?? "").toLowerCase().includes(lowerSearch);
            }
            return false;
        });
    }, [conversationsData, search]);

    const renderItem = (conversation: Conversation) => (
        <Link to={`/conversation/${conversation.id}`}>
            <ConversationItem
                key={conversation.id}
                conversation={conversation}
                currentUserId={user.id}
            />
        </Link>
    );

    return (
        <TooltipProvider>
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
                            filteredConversations.map(renderItem)
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-sm text-muted-foreground">
                                    No results
                                </p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </TooltipProvider>
    );
}
