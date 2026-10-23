<div align="center">

# React Realtime Chat

**A full-stack, real-time messaging app with direct and group conversations.**

Built with React 19, Node.js, Socket.IO, Prisma and PostgreSQL.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4-010101?logo=socket.io&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

</div>

![Application](https://github.com/user-attachments/assets/6ed4f456-b877-4bbf-82cb-9e73679284bd)

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Socket.IO Events](#socketio-events)
- [Data Model](#data-model)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## Overview

React Realtime Chat lets users sign up, find other people and talk to them
instantly - either one-on-one or in group conversations. Messages are
delivered over **WebSockets (Socket.IO)** and persisted in **PostgreSQL**
through **Prisma**. Authentication is handled with **JWT** and passwords are
hashed with **bcrypt**.

---

## Screenshots

### Login

![Login](https://github.com/user-attachments/assets/a660dbc8-a9c5-495e-83d4-140faf15aecd)

### Direct conversation

![Direct conversation](https://github.com/user-attachments/assets/69dc13cd-208c-415d-a322-58d2837e3563)

### Group conversation

![Group conversation](https://github.com/user-attachments/assets/a5ea2683-2096-4807-bac2-d2be3af8bddc)

---

## Features

- **Authentication** - sign up / log in with email and password, JWT
  (7-day expiry), protected routes on both client and server
- **Real-time messaging** - messages are broadcast to conversation members
  over Socket.IO and appear without a page refresh
- **Direct and group conversations** - start a 1:1 chat or create a group
  with multiple members and roles (`ADMIN` / `MEMBER`)
- **Online presence** - users are marked online/offline based on their
  socket connection
- **Persistent history** - all conversations and messages are stored in
  PostgreSQL
- **Conversation management** - search users, browse your conversations and
  delete a conversation
- **Emoji picker** in the message input
- **User settings** - light/dark theme and message notification sound
  toggle, persisted locally
- **Modern UI** - responsive layout built with Tailwind CSS and Radix/shadcn
  components, toast notifications and loading skeletons
- **Efficient data fetching** - server state cached and synchronised with
  TanStack Query

---

## Tech Stack

| Layer    | Technologies                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite, React Router 7, TanStack Query, React Hook Form, Tailwind CSS 4, shadcn/ui (Radix), Socket.IO Client |
| Backend  | Node.js, Express 5, TypeScript, Socket.IO, JSON Web Tokens, bcrypt                                 |
| Database | PostgreSQL, Prisma ORM 7 (`@prisma/adapter-pg`)                                                    |
| Tooling  | ESLint, ts-node-dev, React Compiler                                                                |

---

## Architecture

```
react-realtime-chat
├── client/                  # React single-page application
│   └── src/
│       ├── components/      # UI components (chat area, sidebar, dialogs, ...)
│       ├── hooks/           # useAuth, useConversation, useChatSocket, ...
│       ├── services/        # REST API calls
│       ├── routes/          # Router + protected routes
│       ├── context/         # Settings (theme, notifications)
│       └── pages/
└── server/                  # Express + Socket.IO backend
    ├── prisma/              # Schema and migrations
    └── src/
        ├── modules/         # auth, users, conversation (routes/controller/service)
        ├── config/          # env + Prisma client
        ├── utils/           # JWT and password helpers
        ├── app.ts           # Express app
        └── server.ts        # HTTP server + Socket.IO
```

```mermaid
sequenceDiagram
    participant C as Client (React)
    participant API as REST API (Express)
    participant WS as Socket.IO
    participant DB as PostgreSQL

    C->>API: POST /api/auth/login
    API->>DB: Verify credentials
    API-->>C: JWT
    C->>API: GET /api/conversation/allConversations (Bearer JWT)
    API-->>C: Conversations
    C->>WS: user_online, join_conversation
    C->>WS: send_message
    WS->>DB: Save message
    WS-->>C: receive_message (all members in the room)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm
- A running [PostgreSQL](https://www.postgresql.org/) instance (local or
  Docker)

### 1. Clone the repository

```bash
git clone https://github.com/iamdrzazgowski/react-realtime-chat.git
cd react-realtime-chat
```

### 2. Start PostgreSQL

The quickest way is Docker:

```bash
docker run --name chat-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=chat \
  -p 5432:5432 \
  -d postgres:16
```

### 3. Configure environment variables

Create `server/.env` and `client/.env` - see
[Environment Variables](#environment-variables).

### 4. Run the backend

```bash
cd server
npm install
npx prisma migrate deploy
npx prisma generate
npm run dev
```

The API and WebSocket server will be available at `http://localhost:5001`.

### 5. Run the frontend

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

### `server/.env`

```env
PORT=5001
JWT_SECRET=replace_with_a_long_random_string
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/chat
FRONTEND_URL=http://localhost:5173
```

| Variable       | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `PORT`         | Port the server listens on (defaults to `5000`)              |
| `JWT_SECRET`   | Secret used to sign and verify JWTs                          |
| `DATABASE_URL` | PostgreSQL connection string                                 |
| `FRONTEND_URL` | Allowed origin for Socket.IO CORS                            |

### `client/.env`

```env
VITE_API_URL=http://localhost:5001
```

| Variable       | Description                                          |
| -------------- | ---------------------------------------------------- |
| `VITE_API_URL` | Base URL of the backend (REST API and Socket.IO)     |

> Never commit `.env` files or real secrets to version control.

---

## API Reference

All endpoints except `login` and `signup` require an
`Authorization: Bearer <token>` header.

| Method   | Endpoint                               | Description                         |
| -------- | -------------------------------------- | ----------------------------------- |
| `POST`   | `/api/auth/signup`                     | Create a new account                |
| `POST`   | `/api/auth/login`                      | Log in and receive a JWT            |
| `GET`    | `/api/auth/user`                       | Get the currently logged-in user    |
| `GET`    | `/api/users`                           | List users                          |
| `POST`   | `/api/conversation/direct`             | Create a direct conversation        |
| `POST`   | `/api/conversation/group`              | Create a group conversation         |
| `GET`    | `/api/conversation/allConversations`   | List the user's conversations       |
| `GET`    | `/api/conversation/:conversationId`    | Get a conversation with its messages|
| `DELETE` | `/api/conversation/:conversationId`    | Delete a conversation               |

---

## Socket.IO Events

| Event             | Direction        | Payload                                  | Description                                    |
| ----------------- | ---------------- | ---------------------------------------- | ---------------------------------------------- |
| `user_online`     | client → server  | `userId`                                 | Marks the user as online                       |
| `join_conversation` | client → server | `conversationId`                        | Joins the conversation room                    |
| `send_message`    | client → server  | `{ conversationId, senderId, content }`  | Persists a message and broadcasts it           |
| `receive_message` | server → client  | message with `sender` info               | Delivers a new message to everyone in the room |

When a socket disconnects, the user is automatically marked as offline.

---

## Data Model

```mermaid
erDiagram
    User ||--o{ ConversationMember : "joins"
    Conversation ||--o{ ConversationMember : "has"
    Conversation ||--o{ Message : "contains"
    User ||--o{ Message : "sends"

    User {
        string id PK
        string email UK
        string firstName
        string lastName
        string password
        boolean isOnline
    }
    Conversation {
        string id PK
        enum type "DIRECT | GROUP"
        string name
    }
    ConversationMember {
        string id PK
        enum role "ADMIN | MEMBER"
        datetime lastReadAt
    }
    Message {
        string id PK
        string content
        datetime createdAt
    }
```

---

## Scripts

### Client (`client/`)

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the Vite dev server           |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Lint the codebase with ESLint       |

### Server (`server/`)

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Start the server with auto-reload           |
| `npm run build` | Generate the Prisma client and compile TS   |
| `npm start`     | Run the compiled server from `dist/`        |

---

## Deployment

- **Frontend** - a static Vite build (`npm run build`). `client/vercel.json`
  contains the SPA rewrite rule required for client-side routing on Vercel.
  Set `VITE_API_URL` to your public backend URL.
- **Backend** - any Node.js host with a PostgreSQL database. Run
  `npm run build`, apply migrations with `npx prisma migrate deploy`, then
  start with `npm start`. Set `FRONTEND_URL` to your deployed frontend origin.

---

## Roadmap

- [ ] Authenticate Socket.IO connections with the JWT
- [ ] Unread message counters (based on `lastReadAt`)
- [ ] Typing indicators over WebSockets
- [ ] Automated tests
- [ ] Docker Compose setup for the whole stack
