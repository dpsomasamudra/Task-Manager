# Task Manager

Full-stack Task Manager web application.

## Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React (Vite), Bootstrap via CDN
- Auth: JWT access tokens

## Prerequisites
- Node.js LTS
- A MongoDB connection string

## Environment Variables
Create a `.env` file in `backend/` with:

```
MONGODB_URI=your_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Example for local development:
```
MONGODB_URI=mongodb+srv://devbaliyan202:dev12345@solvearn.zzi1y.mongodb.net/Task-Manager?retryWrites=true&w=majority
JWT_SECRET=change_me
PORT=5000
```

Optionally create a `.env` in `frontend/` to set API base URL:
```
VITE_API_BASE_URL=http://localhost:5000
```

## Install & Run

### Backend
```
cd backend
npm install
npm run dev
```
The API runs on `http://localhost:5000`.

### Frontend
```
cd frontend
npm install
npm run dev
```
The app runs on `http://localhost:3000`.

## API Overview

### Auth
- `POST /auth/signup` body: `{ email, password }` → returns `{ message, token }`
- `POST /auth/login` body: `{ email, password }` → returns `{ token }`
- `POST /auth/logout` → returns `{ message }`

Authorization: `Authorization: Bearer <token>` header for protected endpoints.

### Tasks
- `POST /tasks` body: `{ title, description, deadline?, status?, priority? }`
- `GET /tasks` query: `status?`, `priority?`, `search?`, `page?`, `limit?`
- `GET /tasks/:id`
- `PUT /tasks/:id` body: any of `{ title, description, deadline, status, priority }`
- `DELETE /tasks/:id`

Status: `Completed | Incomplete`

Priority: `Low | Medium | High`

## Frontend Features
- Login/Signup with token saved to localStorage
- Task creation and editing (title, description, deadline, priority, status on edit)
- Filters: status, priority, title search
- Overdue highlighting when `deadline < today` and status `Incomplete`
- Basic loading and error messaging

## Flows
- Auth: Signup/Login returns JWT; the frontend stores it and attaches to requests. Logout clears storage.
- Tasks: CRUD via `/tasks` endpoints. Filters are passed as query params.

## Notes
- No deployment configuration included.
