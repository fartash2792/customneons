# CustomNeons — Full Starter (Frontend + Backend + Admin)

## Overview
- Backend: Express + Sequelize (SQLite). API endpoints under /api.
- Frontend: React + Vite + Tailwind. Uses localStorage for cart and connects to API.
- Admin: simple admin dashboard (protected by JWT token stored in localStorage).
- Dockerfiles and docker-compose provided for containerized testing.

## Quick Start (Local)
1. Backend
   - cd backend
   - cp .env.example .env
   - npm install
   - npm run dev
   API available at http://localhost:4000/api

2. Frontend
   - cd frontend
   - cp .env.example .env
   - npm install
   - npm run dev
   Site available at http://localhost:5173

## Create initial admin user
- After backend DB is created, you can register via /api/auth/register
- Use the admin email and then manually change role in DB to 'admin' (for SQLite edit data/dev.sqlite using sqlite browser) or register then update role via sequelize or a small script.

## Stripe & Production
- Add STRIPE_SECRET in backend .env and implement payment flow in /orders route.
- Replace SQLite with PostgreSQL in src/models/index.js and set DATABASE_URL or connection params.

## Deploy
- Frontend: Vercel / Netlify (build output)
- Backend: Render / Railway / Heroku / VPS (ensure persistent DB)
- Use Nginx as reverse proxy and configure HTTPS (Let's Encrypt)