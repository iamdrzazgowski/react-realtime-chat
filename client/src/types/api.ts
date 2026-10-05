export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    isOnline?: boolean;
}

export interface AuthTokenResponse {
    token: string;
}

export interface ConversationMember {
    user: {
        id: string;
        firstName?: string;
        lastName?: string;
        isOnline?: boolean;
    };
}

export interface ConversationMessage {
    id: string;
    content: string;
    createdAt: string;
    sender: {
        id: string;
        firstName: string;
        lastName: string;
    };
}

export interface ConversationDetails {
    id: string;
    type: "DIRECT" | "GROUP";
    name?: string | null;
    members?: ConversationMember[];
    messages?: ConversationMessage[];
}

export interface ConversationDetailsResponse {
    conversation?: ConversationDetails;
}

export interface ConversationSummary {
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

export interface ConversationsResponse {
    conversations?: ConversationSummary[];
}

export interface DirectoryUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isOnline: boolean;
    createdAt: string;
}

export interface UsersResponse {
    usersData?: DirectoryUser[];
}
