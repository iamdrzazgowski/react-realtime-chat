import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const hints = [
    'Start a new conversation by clicking "+"',
    "Select a conversation from the list on the left",
    "You can search your conversations",
    "Every conversation is saved automatically",
];

export default function ConversationPlaceholder() {
    const [hintIndex, setHintIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setHintIndex((i) => (i + 1) % hints.length);
                setVisible(true);
            }, 400);
        }, 3500);
        return () => clearInterval(interval);
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
                        className="text-xs text-muted-foreground transition-all duration-300"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible
                                ? "translateY(0)"
                                : "translateY(4px)",
                        }}
                    >
                        {hints[hintIndex]}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                    {hints.map((_, i) => (
                        <span
                            key={i}
                            className={cn(
                                "rounded-full transition-all duration-300",
                                i === hintIndex
                                    ? "bg-muted-foreground"
                                    : "bg-border",
                            )}
                            style={{
                                width: i === hintIndex ? 16 : 6,
                                height: 6,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
