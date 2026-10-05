import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import notificationSound from "../assets/notification_sound.mp3";
import type { ConversationDetailsResponse, ConversationMessage } from "@/types/api";
import { useSettings } from "@/context/settings-contex";

// Cached Audio instance: decoding an mp3 per message is wasteful.
// Created lazily on first use (rerender-lazy-state-init equivalent).
let cachedAudio: HTMLAudioElement | null = null;

function getNotificationAudio(): HTMLAudioElement | null {
    try {
        if (!cachedAudio) {
            cachedAudio = new Audio(notificationSound);
            cachedAudio.preload = "auto";
        }
        return cachedAudio;
    } catch {
        return null;
    }
}

export function useChatSocket(
    conversationId: string | undefined,
    userId: string | undefined,
) {
    const socketRef = useRef<Socket | null>(null);
    const queryClient = useQueryClient();
    const { notification } = useSettings();

    // Latest-ref pattern (advanced-use-latest / rerender-defer-reads):
    // the socket effect must NOT resubscribe when the notification toggle
    // changes, so read it through a ref inside the handler.
    const notificationRef = useRef(notification);

    useEffect(() => {
        notificationRef.current = notification;
    }, [notification]);

    const playNotificationSound = useCallback(() => {
        const audio = getNotificationAudio();
        if (!audio) return;
        try {
            const result = audio.play();
            if (result instanceof Promise) {
                result.catch(() => {
                    // Autoplay policy blocked playback: safe to ignore.
                });
            }
        } catch {
            // Audio unavailable (SSR/tests): ignore.
        }
    }, []);

    useEffect(() => {
        // Cheap sync guards first (async-cheap-condition-before-await):
        // never open a socket without both ids.
        if (!conversationId || !userId) return;

        const s: Socket = io(import.meta.env.VITE_API_URL);
        socketRef.current = s;

        s.emit("user_online", userId);
        s.emit("join_conversation", conversationId);

        s.on("receive_message", (msg: ConversationMessage & { conversationId: string; senderId: string }) => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
            queryClient.setQueryData(
                ["conversation", msg.conversationId],
                (oldData: ConversationDetailsResponse | undefined) => {
                    if (!oldData?.conversation?.messages) return oldData;
                    if (
                        oldData.conversation.messages.find(
                            (m: ConversationMessage) => m.id === msg.id,
                        )
                    )
                        return oldData;

                    return {
                        ...oldData,
                        conversation: {
                            ...oldData.conversation,
                            messages: [
                                ...(oldData.conversation.messages ?? []),
                                {
                                    id: msg.id,
                                    content: msg.content,
                                    createdAt: msg.createdAt,
                                    sender: msg.sender,
                                },
                            ],
                        },
                    };
                },
            );

            if (userId !== msg.senderId && notificationRef.current) {
                playNotificationSound();
            }
        });

        return () => {
            s.disconnect();
            socketRef.current = null;
        };
    }, [conversationId, userId, queryClient, playNotificationSound]);

    const sendMessage = useCallback(
        (targetConversationId: string, senderId: string, content: string) => {
            if (!socketRef.current) return;
            socketRef.current.emit("send_message", {
                conversationId: targetConversationId,
                senderId,
                content,
            });
        },
        [],
    );

    return { sendMessage };
}
