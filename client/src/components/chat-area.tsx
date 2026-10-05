import { lazy, Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./chat-header";
import { MessageBubble } from "./message-bubble";
import { useGetConversationById } from "@/hooks/useConversation";
import { useUser } from "@/hooks/useAuth";
import { ConversationSkeleton } from "./conversation-skeleton";
import { useNavigate } from "react-router";
import { useChatSocket } from "@/hooks/useChatSocket";
import { groupMessagesByDate } from "@/lib/chat";
import { MessageCircle } from "lucide-react";
import { Navigate } from "react-router";

const MessageInput = lazy(() =>
    import("./message-input").then((m) => ({ default: m.MessageInput })),
);

export interface UiMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
    senderName: string;
}

const EMPTY_CONVERSATION_TITLE = "Select a conversation";

export function ChatArea() {
    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { conversationData, isLoading, isError } = useGetConversationById();
    const conversation = conversationData?.conversation;
    const { user } = useUser();

    // Cheap guards first: hooks that need ids receive undefined until loaded
    // instead of crashing on user.id (js-early-exit).
    const { sendMessage } = useChatSocket(conversation?.id, user?.id);

    const messages: UiMessage[] = useMemo(
        () =>
            conversation?.messages?.map((msg) => ({
                id: msg.id,
                senderId: msg.sender.id,
                text: msg.content,
                timestamp: new Date(msg.createdAt),
                senderName: `${msg.sender.firstName} ${msg.sender.lastName}`,
            })) ?? [],
        [conversation?.messages],
    );

    // Memoized grouping (rerender-memo): toLocaleDateString no longer runs
    // for every message on every parent render.
    const groupedMessages = useMemo(() => groupMessagesByDate(messages), [messages]);

    const messageCount = messages.length;
    const lastMessageId = messages[messageCount - 1]?.id;

    // Scroll only when a new message arrives, and batch the DOM write.
    useEffect(() => {
        if (messageCount === 0) return;
        const node = bottomRef.current;
        if (!node) return;
        const frame = requestAnimationFrame(() => {
            node.scrollIntoView({ block: "end" });
        });
        return () => cancelAnimationFrame(frame);
    }, [messageCount, lastMessageId]);

    const participant = useMemo(() => {
        if (!conversation || !user) return null;
        const members = conversation.members?.map((m) => m.user) ?? [];
        return members.find((u) => u.id !== user.id) ?? null;
    }, [conversation, user]);

    const headerParticipant = useMemo(() => {
        if (!conversation) return null;
        if (conversation.type === "GROUP") {
            return {
                id: "group",
                name: conversation.name || "Grupa",
                avatar: `${conversation.name?.[0] ?? "G"}`.toUpperCase(),
                online: false,
            };
        }
        return {
            id: participant?.id ?? "user",
            name: `${participant?.firstName ?? ""} ${participant?.lastName ?? ""}`.trim() || "Unknown User",
            avatar:
                `${participant?.firstName?.[0] ?? ""}${participant?.lastName?.[0] ?? ""}`.toUpperCase() ||
                "?",
            online: participant?.isOnline ?? false,
        };
    }, [conversation, participant]);

    const handleSendMessage = useCallback(
        (text: string) => {
            if (!conversation || !user || !text.trim()) return;
            sendMessage(conversation.id, user.id, text.trim());
        },
        [conversation, user, sendMessage],
    );

    const handleBack = useCallback(() => navigate("/"), [navigate]);

    if (isLoading) return <ConversationSkeleton />;

    if (isError) return <Navigate to="/" replace={true} />;

    if (!conversation) {
        return (
            <div className="flex h-full flex-col items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <div className="rounded-full bg-secondary p-4">
                        <MessageCircle className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-foreground">
                            {EMPTY_CONVERSATION_TITLE}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Click on a conversation to view messages
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user || !headerParticipant) return <ConversationSkeleton />;

    return (
        <div className="flex h-full">
            <div className="flex flex-1 flex-col bg-background">
                <ChatHeader
                    participant={headerParticipant}
                    onBack={handleBack}
                />

                <ScrollArea className="flex-1 px-4">
                    <div ref={scrollContainerRef} className="flex flex-col gap-1.5 py-4">
                        {groupedMessages.map((group) => (
                            <div
                                key={group.date}
                                className="flex flex-col gap-1.5"
                            >
                                <div className="flex items-center gap-3 py-3">
                                    <div className="flex-1 h-px bg-border" />
                                    <span className="text-[11px] text-muted-foreground font-medium capitalize">
                                        {group.date}
                                    </span>
                                    <div className="flex-1 h-px bg-border" />
                                </div>

                                {group.messages.map((msg, index) => {
                                    const isOwn = msg.senderId === user.id;
                                    const prevMsg =
                                        index > 0
                                            ? group.messages[index - 1]
                                            : null;
                                    const showGap =
                                        !!prevMsg &&
                                        prevMsg.senderId !== msg.senderId;
                                    return (
                                        <div
                                            key={msg.id}
                                            className={showGap ? "mt-3" : ""}
                                        >
                                            <MessageBubble
                                                message={msg}
                                                isOwn={isOwn}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                </ScrollArea>

                <Suspense fallback={null}>
                    <MessageInput onSend={handleSendMessage} />
                </Suspense>
            </div>
        </div>
    );
}
