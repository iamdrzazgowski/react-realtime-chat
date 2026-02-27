export interface User {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
    read: boolean;
}

export interface Conversation {
    id: string;
    participants: User[];
    messages: Message[];
    lastMessage: Message;
}

export const currentUser: User = {
    id: 'me',
    name: 'Ty',
    avatar: 'T',
    online: true,
};

export const users: User[] = [
    { id: '1', name: 'Anna Kowalska', avatar: 'AK', online: true },
    { id: '2', name: 'Marek Nowak', avatar: 'MN', online: false },
    { id: '3', name: 'Kasia Wisniewska', avatar: 'KW', online: true },
    { id: '4', name: 'Tomek Zielinski', avatar: 'TZ', online: false },
    { id: '5', name: 'Ola Kaminska', avatar: 'OK', online: true },
    { id: '6', name: 'Piotr Lewandowski', avatar: 'PL', online: false },
];

const now = new Date();
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60000);

export const conversations: Conversation[] = [
    {
        id: 'c1',
        participants: [users[0]],
        messages: [
            {
                id: 'm1',
                senderId: '1',
                text: 'Hej, masz chwile?',
                timestamp: minutesAgo(45),
                read: true,
            },
            {
                id: 'm2',
                senderId: 'me',
                text: 'Jasne, o co chodzi?',
                timestamp: minutesAgo(44),
                read: true,
            },
            {
                id: 'm3',
                senderId: '1',
                text: 'Chcialam pogadac o projekcie. Masz jakies nowe pomysly?',
                timestamp: minutesAgo(42),
                read: true,
            },
            {
                id: 'm4',
                senderId: 'me',
                text: 'Tak, wlasnie nad czymis pracowalem. Wyslac ci screeny?',
                timestamp: minutesAgo(40),
                read: true,
            },
            {
                id: 'm5',
                senderId: '1',
                text: 'Tak, prosze! Chcialabym zobaczyc co masz',
                timestamp: minutesAgo(38),
                read: true,
            },
            {
                id: 'm6',
                senderId: 'me',
                text: 'Daj mi 5 minut, skoncze ostatnie poprawki',
                timestamp: minutesAgo(35),
                read: true,
            },
            {
                id: 'm7',
                senderId: '1',
                text: 'Spoko, czekam!',
                timestamp: minutesAgo(3),
                read: false,
            },
        ],
        get lastMessage() {
            return this.messages[this.messages.length - 1];
        },
    },
    {
        id: 'c2',
        participants: [users[1]],
        messages: [
            {
                id: 'm8',
                senderId: 'me',
                text: 'Marek, spotkanie o 15?',
                timestamp: minutesAgo(120),
                read: true,
            },
            {
                id: 'm9',
                senderId: '2',
                text: 'Tak, bede na czas',
                timestamp: minutesAgo(118),
                read: true,
            },
            {
                id: 'm10',
                senderId: 'me',
                text: 'Super, do zobaczenia',
                timestamp: minutesAgo(115),
                read: true,
            },
        ],
        get lastMessage() {
            return this.messages[this.messages.length - 1];
        },
    },
    {
        id: 'c3',
        participants: [users[2]],
        messages: [
            {
                id: 'm11',
                senderId: '3',
                text: 'Widzialas nowy design?',
                timestamp: minutesAgo(200),
                read: true,
            },
            {
                id: 'm12',
                senderId: 'me',
                text: 'Jeszcze nie, pokaz!',
                timestamp: minutesAgo(198),
                read: true,
            },
            {
                id: 'm13',
                senderId: '3',
                text: 'Wysylam link za chwile',
                timestamp: minutesAgo(195),
                read: true,
            },
            {
                id: 'm14',
                senderId: '3',
                text: 'https://figma.com/design/example',
                timestamp: minutesAgo(180),
                read: true,
            },
        ],
        get lastMessage() {
            return this.messages[this.messages.length - 1];
        },
    },
    {
        id: 'c4',
        participants: [users[3]],
        messages: [
            {
                id: 'm15',
                senderId: '4',
                text: 'Dziekuje za pomoc!',
                timestamp: minutesAgo(500),
                read: true,
            },
        ],
        get lastMessage() {
            return this.messages[this.messages.length - 1];
        },
    },
    {
        id: 'c5',
        participants: [users[4]],
        messages: [
            {
                id: 'm16',
                senderId: '5',
                text: 'Jutro idziemy na kawke?',
                timestamp: minutesAgo(60),
                read: true,
            },
            {
                id: 'm17',
                senderId: 'me',
                text: 'Pewnie! O ktorej?',
                timestamp: minutesAgo(55),
                read: true,
            },
            {
                id: 'm18',
                senderId: '5',
                text: 'Moze 11? Znam super miejsce w centrum',
                timestamp: minutesAgo(50),
                read: false,
            },
        ],
        get lastMessage() {
            return this.messages[this.messages.length - 1];
        },
    },
    {
        id: 'c6',
        participants: [users[5]],
        messages: [
            {
                id: 'm19',
                senderId: 'me',
                text: 'Piotr, wyslales dokumenty?',
                timestamp: minutesAgo(1440),
                read: true,
            },
            {
                id: 'm20',
                senderId: '6',
                text: 'Tak, sprawdz maila',
                timestamp: minutesAgo(1430),
                read: true,
            },
        ],
        get lastMessage() {
            return this.messages[this.messages.length - 1];
        },
    },
];

export function formatTime(date: Date): string {
    return date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatRelativeTime(date: Date): string {
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return 'teraz';
    if (diffMin < 60) return `${diffMin} min`;
    if (diffHours < 24) return `${diffHours} godz.`;
    if (diffDays === 1) return 'wczoraj';
    return `${diffDays} dni`;
}
