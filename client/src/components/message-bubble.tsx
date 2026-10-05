import { memo } from "react";
import { cn } from "@/lib/utils";
import type { UiMessage } from "@/components/chat-area";
import { formatTime } from "@/lib/chat";

interface MessageBubbleProps {
    message: UiMessage;
    isOwn: boolean;
    showTimestamp?: boolean;
}

function MessageBubbleInner({
    message,
    isOwn,
    showTimestamp = true,
}: MessageBubbleProps) {
    return (
        <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
            <div
                className={cn(
                    "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed break-words",
                    isOwn
                        ? "bg-message-own text-message-own-foreground rounded-br-md"
                        : "bg-message-other text-message-other-foreground rounded-bl-md",
                )}
            >
                {!isOwn && message?.senderName && (
                    <p className="text-[11px] font-medium mb-0.5 opacity-70">
                        {message.senderName}
                    </p>
                )}

                <p className="text-sm leading-relaxed">{message.text}</p>

                {showTimestamp ? (
                    <div
                        className={cn(
                            "flex items-center justify-end gap-1 mt-1",
                            isOwn
                                ? "text-message-own-foreground/70"
                                : "text-muted-foreground",
                        )}
                    >
                        <span className="text-[10px]">
                            {formatTime(message.timestamp)}
                        </span>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

// Memoized bubble (rerender-memo): appending one message no longer
// rerenders every previous bubble.
export const MessageBubble = memo(MessageBubbleInner);
