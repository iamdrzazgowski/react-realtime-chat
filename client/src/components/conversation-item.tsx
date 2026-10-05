import { memo, useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "../lib/chat";
import { ConversationActionsMenu } from "./conversation-actions-menu";

interface ConversationItemProps {
    conversation: {
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
    };
    currentUserId: string;
    isActive: boolean;
}

function ConversationItemInner({
    conversation,
    currentUserId,
    isActive,
}: ConversationItemProps) {
    // Derive everything during render from props (rerender-derived-state-no-effect):
    // no per-row useParams subscription, no effects.
    const participant = useMemo(
        () =>
            conversation.type === "DIRECT"
                ? (conversation.user ?? null)
                : (conversation.name ?? null),
        [conversation.type, conversation.user, conversation.name],
    );

    const lastMsg = conversation.lastMessage ?? null;

    const { lastMsgDate, unread, timeLabel } = useMemo(() => {
        if (!lastMsg) return { lastMsgDate: null, unread: false, timeLabel: "" };
        const raw = lastMsg.createdAt ?? lastMsg.timestamp ?? null;
        const parsed = raw ? new Date(raw) : null;
        if (!parsed || Number.isNaN(parsed.getTime())) {
            return { lastMsgDate: null, unread: false, timeLabel: "" };
        }
        const lastRead = conversation.lastReadAt
            ? new Date(conversation.lastReadAt)
            : null;
        const isUnread =
            lastMsg.senderId !== currentUserId &&
            (!lastRead || Number.isNaN(lastRead.getTime()) || parsed > lastRead);
        return {
            lastMsgDate: parsed,
            unread: isUnread,
            timeLabel: formatRelativeTime(parsed),
        };
    }, [lastMsg, conversation.lastReadAt, currentUserId]);

    void lastMsgDate;

    const initials = useMemo(() => {
        if (typeof participant === "string") {
            return participant[0]?.toUpperCase() ?? "?";
        }
        if (participant) {
            return (
                `${participant.firstName?.[0] ?? ""}${participant.lastName?.[0] ?? ""}`.toUpperCase() ||
                "?"
            );
        }
        return "?";
    }, [participant]);

    const displayName = useMemo(() => {
        if (typeof participant === "string") return participant;
        if (participant) return `${participant.firstName} ${participant.lastName}`;
        return "Unknown User";
    }, [participant]);

    const isOnline =
        typeof participant !== "string" && !!participant?.isOnline;

    return (
        <div className="group relative">
            <button
                type="button"
                className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 text-left transition-colors hover:bg-secondary/80",
                    isActive && "bg-secondary",
                )}
            >
                <div className="relative shrink-0">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback
                            className={cn(
                                "text-xs font-medium",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground",
                            )}
                        >
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-green-400" />
                    )}
                </div>

                <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <span
                                className={cn(
                                    "text-sm truncate",
                                    unread
                                        ? "font-semibold text-foreground"
                                        : "font-medium text-foreground",
                                )}
                            >
                                {displayName}
                            </span>
                        </div>
                        <span
                            className={cn(
                                "text-[11px] shrink-0 ml-2 group-hover:hidden",
                                unread
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground",
                            )}
                        >
                            {timeLabel}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <p
                            className={cn(
                                "text-[13px] truncate leading-relaxed w-full max-w-[220px]",
                                unread
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground",
                            )}
                        >
                            {lastMsg
                                ? (lastMsg.senderId === currentUserId
                                      ? "You: "
                                      : "") + lastMsg.content
                                : "No messages yet"}
                        </p>
                    </div>
                </div>
            </button>

            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <ConversationActionsMenu conversationId={conversation.id} />
            </div>
        </div>
    );
}

// Memoized row (rerender-memo): list filtering by search no longer
// rerenders every row whose props are unchanged.
export const ConversationItem = memo(ConversationItemInner);
