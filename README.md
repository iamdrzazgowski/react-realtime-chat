# React Realtime Chat

A fullstack **real-time chat application** built with **React and Node.js**.  
The application allows users to authenticate, join chat rooms and exchange
messages instantly using **WebSockets (Socket.IO)**.

This project demonstrates how to build a modern real-time application with
**custom JWT authentication**, **PostgreSQL database running in Docker**, REST
API and WebSocket communication.

---


![Application](https://github.com/user-attachments/assets/6ed4f456-b877-4bbf-82cb-9e73679284bd)
<!-- # Screenshots

## Login

![Login](https://github.com/user-attachments/assets/a660dbc8-a9c5-495e-83d4-140faf15aecd)

## Direct conversation

![Direct conversation](https://github.com/user-attachments/assets/69dc13cd-208c-415d-a322-58d2837e3563)

## Group conversation

![Group conversation](https://github.com/user-attachments/assets/a5ea2683-2096-4807-bac2-d2be3af8bddc)

-->

---

# Features

- User authentication with custom **JWT implementation**
- Real-time messaging using **Socket.IO**
- Chat rooms support
- Instant message updates without refreshing the page
- REST API for authentication and user management
- Server state management using **React Query**
- Responsive UI styled with **TailwindCSS**
- Client-side routing with **React Router**
- **PostgreSQL database running in Docker**

---

# Architecture

The project is divided into two main parts:

```
react-realtime-chat
│
├── client/        # React frontend
├── server/        # Express backend + Socket.IO
```

### Frontend

Responsible for:

- UI rendering
- routing
- API communication
- websocket connection

### Backend

Responsible for:

- authentication
- REST API
- websocket server
- database communication

---

# Tech Stack

## Frontend

- React
- React Router
- React Query
- TailwindCSS
- Socket.IO Client

## Backend

- Node.js
- Express.js
- Socket.IO
- JWT (custom authentication implementation)
- PostgreSQL

---

# Real-Time Communication

The application uses **Socket.IO** for real-time communication between the
server and clients.

Typical flow:

1. User logs in and receives a **JWT token**
2. Client connects to the **Socket.IO server**
3. User sends a message
4. Server broadcasts the message to all users in the room
5. UI updates instantly

---

# Authentication

Authentication is implemented using **JSON Web Tokens (JWT)**.

Flow:

1. User logs in via REST API
2. Server generates a **JWT token**
3. Client stores the token
4. Token is attached to future requests

---

# Installation

Clone the repository:

```bash
git clone https://github.com/iamdrzazgowski/react-realtime-chat.git
cd react-realtime-chat
```

---

# Running the Backend

```bash
cd server
npm install
npm run dev
```

Server will run on:

```
http://localhost:5001
```

---

# Running the Frontend

```bash
cd client
npm install
npm run dev
```

Application will run on:

```
http://localhost:5173
```

---

# Environment Variables

Create `.env` files in **client** and **server** directories.

### server/.env

```
PORT=5000
JWT_SECRET=your_secret_key

DATABASE_URL=database_url
```

### client/.env

```
VITE_API_URL=http://localhost:5001
```

---

# What I Learned

This project helped me practice:

- building **real-time applications**
- working with **WebSockets**
- implementing **JWT authentication**
- managing server state with **React Query**
- structuring **fullstack applications**
- integrating **PostgreSQL with Docker**
