import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { User } from "@/lib/chat";
import { ArrowLeft } from "lucide-react";

interface ChatHeaderProps {
    participant: User;
    onBack?: () => void;
    onToggleInfo?: () => void;
}

export function ChatHeader({ participant, onBack }: ChatHeaderProps) {
    return (
        <TooltipProvider>
            <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
                <div className="flex items-center gap-3">
                    {onBack && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 md:hidden text-muted-foreground"
                            onClick={onBack}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                    )}
                    <div className="relative">
                        <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                                {participant.avatar}
                            </AvatarFallback>
                        </Avatar>
                        {participant.online && (
                            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-card bg-green-400" />
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground leading-none">
                            {participant.name}
                        </p>
                        <p className="text-[12px] text-muted-foreground mt-0.5">
                            {participant.online ? "online" : "offline"}
                        </p>
                    </div>
                </div>
            </header>
        </TooltipProvider>
    );
}
