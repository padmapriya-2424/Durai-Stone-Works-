# Durai Stone Works

A full-stack website for a traditional stone sculpture and stone carving business based near Mahabalipuram, Tamil Nadu.

## Technology

- React
- Vite
- Tailwind CSS
- Node.js
- Express
- MongoDB
- Mongoose
- JWT

## Current status

Phase 9 - Backend and MongoDB foundation

## Setup

### Frontend

```powershell
cd client
npm install
npm run dev
```

### Backend

```powershell
cd server
npm install
npm run dev
```

Before starting the backend, copy `.env.example` to `.env` and provide a MongoDB Atlas connection string in `MONGODB_URI`.

The backend health check is available at `http://localhost:5000/api/health`.

To seed the ten static demonstration products once MongoDB is configured:

```powershell
cd server
npm run seed
```

The backend currently exposes `GET /api/products`, `GET /api/products/:id`, and `POST /api/enquiries`. The frontend remains static and does not call these APIs yet.
