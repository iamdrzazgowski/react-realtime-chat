import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./chat-header";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";
import { TypingIndicator } from "./typing-indicator";
import { useGetConversationById } from "@/hooks/useConversation";
import { useUser } from "@/hooks/useAuth";
import { ConversationSkeleton } from "./conversation-skeleton";
import { useRef, useEffect, useMemo } from "react";
import { useChatSocket } from "@/hooks/useChatSocket";
import { groupMessagesByDate } from "@/lib/chat";
import { MessageCircle } from "lucide-react";
import { Navigate } from "react-router";

export interface UiMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
    senderName: string;
}

export function ChatArea() {
    const bottomRef = useRef<HTMLDivElement>(null);
    const { conversationData, isLoading, isError } = useGetConversationById();
    const conversation = conversationData?.conversation;
    const { user } = useUser();

    const { sendMessage } = useChatSocket(conversation?.id, user.id);

    const messages: UiMessage[] = useMemo(
        () =>
            conversation?.messages?.map((msg: any) => ({
                id: msg.id,
                senderId: msg.sender.id,
                text: msg.content,
                timestamp: new Date(msg.createdAt),
                senderName: `${msg.sender.firstName} ${msg.sender.lastName}`,
            })) ?? [],
        [conversation?.messages],
    );

    const groupedMessages = groupMessagesByDate(messages);

    useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [messages]);

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
                            Wybierz konwersację
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Kliknij na rozmowę, aby wyświetlić wiadomości
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const participant = conversation.members
        ?.map((m: any) => m.user)
        .find((u: any) => u.id !== user.id);

    const handleSendMessage = (text: string) => {
        if (!conversation || !text.trim()) return;
        sendMessage(conversation.id, user.id, text.trim());
    };

    return (
        <div className="flex h-full">
            <div className="flex flex-1 flex-col bg-background">
                <ChatHeader
                    participant={{
                        id:
                            conversation.type === "GROUP"
                                ? "group"
                                : (participant?.id ?? "user"),
                        name:
                            conversation.type === "GROUP"
                                ? conversation.name || "Grupa"
                                : `${participant?.firstName} ${participant?.lastName}`,
                        avatar:
                            conversation.type === "GROUP"
                                ? `${conversation.name?.[0]}`.toUpperCase()
                                : `${participant.firstName?.[0]}${participant.lastName?.[0]}`.toUpperCase(),
                        online: participant?.isOnline ?? false,
                    }}
                    onToggleInfo={() => {}}
                />

                <ScrollArea className="flex-1 px-4">
                    <div className="flex flex-col gap-1.5 py-4">
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
                                        prevMsg &&
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
                        <TypingIndicator
                            name={participant?.firstName}
                            visible={false}
                        />
                        <div ref={bottomRef} />
                    </div>
                </ScrollArea>

                <MessageInput onSend={handleSendMessage} />
            </div>
        </div>
    );
}
