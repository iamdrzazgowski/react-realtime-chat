# React Realtime Chat – Plan działania (harmonogram)

## Cel projektu
MVP aplikacji typu chat messenger z obsługą rozmów 1-1 i grupowych, wiadomości w czasie rzeczywistym, autoryzacją użytkowników oraz responsywnym UI. Projekt tworzony pod portfolio / GitHub.

---

## Stack technologiczny

### Frontend
- React
- React Query
- Tailwind CSS
- React Router
- WebSocket / Socket.io client

### Backend
- Node.js
- Express / NestJS
- PostgreSQL
- WebSocket / Socket.io
- JWT (auth)

---

## **Dzień 1 – Fundamenty architektury**

### Backend
- Zaplanowanie modeli danych:
  - User [ ]
  - Conversation (1-1 / GROUP) [ ]
  - ConversationMember [ ]
  - Message [ ]
- Określenie relacji między tabelami [ ]
- Konfiguracja projektu backendowego [ ]
- Połączenie z PostgreSQL [ ]

### Frontend
- Inicjalizacja projektu (React + Vite) [ ]
- Konfiguracja Tailwind CSS [ ]
- Podstawowa struktura folderów [ ]
- Layout aplikacji:
  - Sidebar (lista rozmów) [ ]
  - Main chat area [ ]

---

## **Dzień 2 – Autoryzacja i użytkownicy**

### Backend
- Rejestracja użytkownika [ ]
- Logowanie użytkownika [ ]
- Generowanie JWT [ ]
- Middleware autoryzacji [ ]
- Endpoint:
  - `GET /me` [ ]

### Frontend
- Widoki logowania i rejestracji [ ]
- Obsługa sesji użytkownika [ ]
- Ochrona tras (private routes) [ ]
- Pobranie danych zalogowanego użytkownika [ ]

---

## **Dzień 3 – Rozmowy 1-1 i grupowe**

### Backend
- Endpoint tworzenia rozmowy 1-1 [ ]
- Endpoint tworzenia rozmowy grupowej [ ]
- Dodawanie użytkowników do grupy [ ]
- Pobieranie listy rozmów użytkownika [ ]
- Sprawdzenie istnienia rozmowy 1-1 [ ]

### Frontend
- Widok listy rozmów (sidebar) [ ]
- Rozróżnienie rozmów:
  - 1-1
  - GROUP [ ]
- Formularz tworzenia rozmowy grupowej [ ]
- Wybór użytkowników do grupy [ ]

---

## **Dzień 4 – Wiadomości**

### Backend
- Model Message:
  - id [ ]
  - conversationId [ ]
  - senderId [ ]
  - content [ ]
  - createdAt [ ]
- Endpoint wysyłania wiadomości [ ]
- Endpoint pobierania historii wiadomości [ ]
- Paginacja wiadomości [ ]

### Frontend
- Widok listy wiadomości [ ]
- Wysyłanie wiadomości [ ]
- Scroll do ostatniej wiadomości [ ]
- Stylowanie:
  - sent / received [ ]
- Wyświetlanie autora wiadomości (w grupach) [ ]

---

## **Dzień 5 – Realtime (WebSocket / Socket.io)**

### Backend
- Konfiguracja Socket.io [ ]
- Dołączanie użytkownika do roomów rozmów [ ]
- Emitowanie nowych wiadomości [ ]
- Obsługa reconnect / disconnect [ ]

### Frontend
- Połączenie z WebSocket [ ]
- Odbieranie wiadomości w czasie rzeczywistym [ ]
- Aktualizacja cache React Query [ ]
- Obsługa wielu otwartych rozmów [ ]

---

## **Dzień 6 – Statusy i UX**

### Backend
- Status użytkownika:
  - online / offline [ ]
- Emitowanie statusów przez WebSocket [ ]
- Event „user typing” [ ]

### Frontend
- Wyświetlanie statusu użytkownika [ ]
- Indykator „typing…” [ ]
- Oznaczanie nieprzeczytanych wiadomości [ ]
- Skeleton loaders [ ]

---

## **Dzień 7 – Zarządzanie grupami**

### Backend
- Dodawanie użytkowników do grupy [ ]
- Usuwanie użytkowników z grupy [ ]
- Zmiana nazwy grupy [ ]
- Sprawdzenie uprawnień (admin grupy) [ ]

### Frontend
- Widok ustawień grupy [ ]
- Dodawanie / usuwanie uczestników [ ]
- Zmiana nazwy grupy [ ]
- Oznaczenie rozmowy grupowej [ ]

👉 **Po tym dniu MVP jest gotowe**

---

## **Dzień 8 – UI i responsywność**

### Frontend
- Responsywny layout (mobile / desktop) [ ]
- Avatar użytkownika (placeholder) [ ]
- Lepsze bubble chat UI [ ]
- Kolory, spacing, hover states [ ]
- Puste stany (no conversations / no messages) [ ]

---

## **Dzień 9 – Testy i optymalizacja**

### Backend
- Testy endpointów [ ]
- Walidacja danych wejściowych [ ]
- Obsługa błędów [ ]

### Frontend
- Testy manualne głównych flow [ ]
- Optymalizacja zapytań React Query [ ]
- Cleanup WebSocket listeners [ ]

---

## **Dzień 10 – Deployment i dokumentacja**

### Backend
- Deployment API (Render / Railway) [ ]
- Konfiguracja bazy PostgreSQL [ ]
- Zmienne środowiskowe [ ]

### Frontend
- Deployment frontend (Vercel) [ ]
- Konfiguracja env (API URL, WS URL) [ ]

### Dokumentacja
- README:
  - opis projektu [ ]
  - stack technologiczny [ ]
  - funkcjonalności [ ]
  - screenshots / GIF [ ]

---

## Uwagi
- WebSocket / Socket.io to najlepszy wybór do aplikacji chatowych. [ ]
- MVP można zamknąć w 6–7 dni. [ ]
- Projekt pokazuje realtime, pracę z danymi, UX i architekturę full-stack. [ ]
