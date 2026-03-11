import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import notificationSound from "../assets/notification_sound.mp3";
import { useSettings } from "@/context/settings-contex";

export function useChatSocket(
    conversationId: string | undefined,
    userId: string | undefined,
) {
    const socketRef = useRef<Socket | null>(null);
    const queryClient = useQueryClient();
    const { notification } = useSettings();

    const playNotificationSound = () => {
        const audio = new Audio(notificationSound);
        audio.play();
    };

    useEffect(() => {
        if (!conversationId || !userId) return;

        const s: Socket = io(import.meta.env.VITE_API_URL);
        socketRef.current = s;

        s.emit("user_online", userId);
        s.emit("join_conversation", conversationId);

        s.on("receive_message", (msg: any) => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
            queryClient.setQueryData(
                ["conversation", msg.conversationId],
                (oldData: any) => {
                    if (!oldData) return oldData;
                    if (
                        oldData.conversation.messages.find(
                            (m: any) => m.id === msg.id,
                        )
                    )
                        return oldData;

                    return {
                        ...oldData,
                        conversation: {
                            ...oldData.conversation,
                            messages: [
                                ...oldData.conversation.messages,
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

            if (userId !== msg.senderId && notification) {
                playNotificationSound();
            }
        });

        return () => {
            s.disconnect();
        };
    }, [conversationId, userId, queryClient, notification]);

    const sendMessage = (
        conversationId: string,
        userId: string,
        content: string,
    ) => {
        if (!socketRef.current) return;
        socketRef.current.emit("send_message", {
            conversationId,
            senderId: userId,
            content,
        });
    };

    return { sendMessage };
}
