# Carbon Tracker

Carbon Tracker is a full-stack sustainability app for tracking personal and organizational carbon footprint, activities, goals, rewards, analytics, support tickets, and eco-friendly recommendations.

## Project structure

- backend/ - Spring Boot REST API
- frontend/ - React + Vite frontend
- .gitignore - repo-level ignore rules
- README.md - project overview and setup guide

## Tech stack

- Frontend: React, Vite, Tailwind CSS, PWA support
- Backend: Java 17+, Spring Boot 3, Spring Security, JPA, PostgreSQL
- Database: Neon PostgreSQL
- Email: Gmail SMTP
- AI: Groq / Llama-based API
- Auth: Google OAuth2

## Backend setup

1. Go to the backend folder:
   cd backend
2. Copy the env example and add your real values:
   copy .env.example .env
3. Start the Spring Boot app:
   ./mvnw spring-boot:run

Required env variables:
- SPRING_DATASOURCE_URL
- SPRING_DATASOURCE_USERNAME
- SPRING_DATASOURCE_PASSWORD
- PORT
- MAIL_USERNAME
- MAIL_PASSWORD
- GROQ_API_KEY
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

## Frontend setup

1. Go to the frontend folder:
   cd frontend
2. Copy the example env file:
   copy .env.example .env
3. Install dependencies:
   npm install
4. Run the app locally:
   npm run dev

Required env variable:
- VITE_API_BASE_URL=http://localhost:8080/api

## Deployment

### Frontend deployment (Vercel)
- Import the frontend project from the frontend/ folder
- Set environment variable:
  - VITE_API_BASE_URL=https://your-backend-url/api
- Vercel will use frontend/vercel.json for SPA routing

### Backend deployment
- Deploy the backend folder as a Java/Spring Boot app
- Set all backend env vars in your hosting platform
- Example ports and database values should be provided via environment variables instead of committed config files

## Notes

- Do not commit secrets into source control
- Keep .env and .env.* files local or in deployment platform secret storage
- This repo uses .env.example files as the safe templates
