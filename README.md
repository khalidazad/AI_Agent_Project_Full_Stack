# AI Helpdesk Agent

A simple AI-powered helpdesk assistant built with a React frontend, an Express backend, and a Postgres database via Prisma.

---

## 🚀 Architecture Overview

The application is split into three main parts:

1. **Frontend (React)**
   - Chat UI where the user types messages.
   - Calls the backend `POST /chat` endpoint.

2. **Backend (Express + LangChain agent)**
   - Receives chat messages and routes them to an AI agent.
   - Agent can call tools (e.g., create/list/delete tickets, search documents) and responds to the frontend.

3. **Database (Postgres + Prisma)**
   - Stores tickets created via the agent.
   - Schema defined in `backend/prisma/schema.prisma`.

---

## 🗂 Folder Structure

```
ai-helpdesk-agent/
├─ backend/
│  ├─ package.json
│  ├─ src/
│  │  ├─ server.js               # Express server
│  │  ├─ agent/helpdeskAgent.js  # LangChain agent + tool wiring
│  │  ├─ tools/                  # Agent tools (createTicket, listTickets, etc.)
│  │  └─ ...
│  ├─ prisma/
│  │  └─ schema.prisma           # Prisma schema
│  └─ .env                      # Environment variables (DB + keys)
├─ frontend/
│  ├─ src/
│  │  ├─ components/ChatWindow.jsx
│  │  ├─ services/api.js         # API client to backend
│  │  └─ ...
│  └─ .env                      # Frontend env (API URL)
└─ package.json
```

---

## ✅ Setup (Backend)

### 1) Install dependencies

```bash
cd ai-helpdesk-agent/backend
npm install
```

### 2) Configure environment variables

Update `backend/.env` with your keys and database connection string. Example:

```env
HUGGINGFACE_API_KEY=...
PINECONE_API_KEY=...
PINECONE_INDEX=helpdesk-docs
DATABASE_URL="postgresql://<user>:<pass>@<host>:<port>/<db>?sslmode=require"
```

### 3) Apply Prisma schema to the database

```bash
npx prisma db push
```

> If you see errors, verify `DATABASE_URL` is correct and that your Postgres instance is reachable.

### 4) Start the backend server

```bash
node src/server.js
```

---

## ✅ Setup (Frontend)

### 1) Install dependencies

```bash
cd ai-helpdesk-agent/frontend
npm install
```

### 2) Start frontend

```bash
npm start
```

The frontend should connect to the backend at `VITE_API_URL` from `frontend/.env`.

---

## 🧠 How the flow works (high level)

1. Frontend sends a POST request to the backend with `{ message: "..." }`.
2. Backend forwards that message into the agent (`helpdeskAgent.js`).
3. The agent decides whether to call a tool (e.g., `createTicket`) or just reply.
4. If a tool is invoked, it executes (e.g., writing a ticket to Postgres via Prisma).
5. The agent response is returned through the backend to the frontend and shown in the chat.

---

## 🔧 Key Files

- `backend/src/server.js` — Express server and `/chat` route
- `backend/src/agent/helpdeskAgent.js` — Agent definition and tool wiring
- `backend/src/tools/createTicket.js` — Example tool that creates a ticket in the DB
- `backend/prisma/schema.prisma` — Database schema for `Ticket`
- `frontend/src/components/ChatWindow.jsx` — Chat UI
- `frontend/src/services/api.js` — API client for `/chat`

---

## 🧪 Testing & Troubleshooting

### Common Prisma errors
- **Database URL invalid:** verify `DATABASE_URL` in `backend/.env`
- **`npx prisma db push` fails:** ensure Postgres is running and reachable, and the DB user has rights.

### Node/ESM issues
If you see warnings about `type` or `ESM`, add a `type` field to `backend/package.json` to tell Node you’re using ESM syntax:

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/server.js"
  }
}
```

Or run Node with `--input-type=module` if you prefer not to change `package.json`.
