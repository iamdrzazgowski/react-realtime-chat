import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ConversationSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function ConversationSearch({
    value,
    onChange,
}: ConversationSearchProps) {
    return (
        <div className="px-3 py-2">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-8 h-9 text-sm bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
                />
            </div>
        </div>
    );
}
