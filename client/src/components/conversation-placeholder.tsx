import { memo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const hints = [
    'Start a new conversation by clicking "+"',
    "Select a conversation from the list on the left",
    "You can search your conversations",
    "Every conversation is saved automatically",
];

const ROTATE_MS = 3500;
const FADE_MS = 400;

function ConversationPlaceholderInner() {
    const [hintIndex, setHintIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        const interval = setInterval(() => {
            // Skip rotation when the tab is hidden: avoids wasted renders.
            if (document.visibilityState === "hidden") return;
            setVisible(false);
            timeout = setTimeout(() => {
                setHintIndex((i) => (i + 1) % hints.length);
                setVisible(true);
            }, FADE_MS);
        }, ROTATE_MS);
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-full bg-background">
            <div className="flex flex-col items-center text-center gap-4 max-w-xs w-full px-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary text-muted-foreground mb-2">
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-sm font-semibold text-foreground">
                        No selected conversation
                    </h2>
                    <p className="text-xs text-muted-foreground leading-relaxed whitespace-nowrap">
                        Select a conversation from the list or create a new one.
                    </p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <span
                        className={cn(
                            "text-xs text-muted-foreground transition-all duration-300",
                            visible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-1",
                        )}
                    >
                        {hints[hintIndex]}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                    {hints.map((hint, i) => (
                        <span
                            key={hint}
                            className={cn(
                                "rounded-full transition-all duration-300 h-1.5",
                                i === hintIndex
                                    ? "bg-muted-foreground w-4"
                                    : "bg-border w-1.5",
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const ConversationPlaceholder = memo(ConversationPlaceholderInner);

export default ConversationPlaceholder;
