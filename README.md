# CARBON TRACKER — Sustainability & Carbon Footprint Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot_3-6DB33F?style=flat-square&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Java_17+-ED8B00?style=flat-square&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL_(Neon)-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_OAuth2-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq_/_Llama_AI-F55036?style=flat-square&logo=meta&logoColor=white" />
</p>

<p align="center">
  A full-stack sustainability platform for tracking personal and organizational carbon footprint.<br/>
  Log activities, set goals, earn rewards, view analytics, raise support tickets, and get<br/>
  AI-powered eco-friendly recommendations — all in one place.
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Live_App-111827?style=flat-square&logo=vercel&logoColor=white" /></a>
  &nbsp;
  <a href="#"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" /></a>
</p>


---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Security Notes](#security-notes)
- [Contributing](#contributing)
- [Developer](#developer)

---

## Overview

Carbon Tracker helps individuals and organizations understand and reduce their environmental impact. Users log day-to-day activities, track their resulting carbon footprint over time, set reduction goals, and earn rewards for progress. Built-in analytics surface trends and insights, a support ticket system handles user queries, and an AI layer (Groq / Llama) generates personalized eco-friendly recommendations.

The platform is a monorepo with a decoupled architecture — a Spring Boot REST API backend and a React + Vite frontend — connected over a versioned API and secured with Google OAuth2 authentication.

---

## Features

### Carbon Footprint Tracking
- Log personal and organizational activities that generate emissions
- Automatic footprint calculation based on activity data
- Historical tracking with trend visualization over time

### Goals & Rewards
- Set personal or organizational carbon reduction goals
- Track goal progress in real time
- Earn rewards for hitting sustainability milestones

### Analytics
- Dashboards summarizing footprint by category, time period, and user/org
- Visual insights into emission trends and reduction impact

### AI Recommendations
- Groq / Llama-powered engine suggests eco-friendly actions
- Personalized suggestions based on logged activity patterns

### Support
- In-app support ticket system for user queries and issues
- Email notifications via Gmail SMTP for key account and support events

### Authentication & Security
- Google OAuth2 sign-in
- Spring Security-backed API access control

---

## Tech Stack

**Frontend**

| Tool | Purpose |
|---|---|
| React | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| PWA Support | Installable, offline-capable web app |
| i18n | Multi-language support |

**Backend**

| Tool | Purpose |
|---|---|
| Java 17+ | Core language |
| Spring Boot 3 | Application framework |
| Spring Security | Authentication & authorization |
| Spring Data JPA | Data persistence layer |
| PostgreSQL (Neon) | Cloud-hosted relational database |

**Integrations**

| Tool | Purpose |
|---|---|
| Google OAuth2 | User authentication |
| Gmail SMTP | Transactional email notifications |
| Groq / Llama API | AI-generated eco-friendly recommendations |

---

## Architecture

```
┌────────────────────────────────────┐
│           React Frontend            │
│     (Vite + Tailwind CSS + PWA)     │
└──────────────────┬───────────────────┘
                    │  REST API (HTTPS)
┌───────────────────▼────────────────────┐
│             Spring Boot Backend         │
│  ┌───────────────┬─────────────────────┐│
│  │ Spring Security│  Controller/Service ││
│  ├───────────────┼─────────────────────┤│
│  │  JPA / Entity  │     DTO / Repo      ││
│  └───────────────┴─────────────────────┘│
└──────┬────────────────┬─────────────────┘
       │                │
┌──────▼──────┐   ┌─────▼──────┐   ┌───────────────┐
│  PostgreSQL │   │ Gmail SMTP │   │ Groq/Llama API │
│    (Neon)   │   │  (Email)   │   │ (AI Suggestions)│
└─────────────┘   └────────────┘   └───────────────┘
```

---

## Project Structure

```
carbon-tracker-repo/
├── backend/
│   ├── .mvn/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/project/carbontracker/
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   ├── dto/
│   │   │   │   ├── entity/
│   │   │   │   ├── enums/
│   │   │   │   ├── repository/
│   │   │   │   ├── service/
│   │   │   │   └── CarbontrackerApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/java/com/project/carbontracker/
│   │       └── CarbontrackerApplicationTests.java
│   ├── target/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── Dockerfile
│
├── frontend/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── i18n/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── i18n.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── postcss.config.js
│
├── .gitignore
└── README.md
```

---

## Backend Setup

1. Go to the backend folder:
   ```bash
   cd backend
   ```
2. Copy the env example and add your real values:
   ```bash
   copy .env.example .env
   ```
   *(use `cp .env.example .env` on macOS/Linux)*
3. Start the Spring Boot app:
   ```bash
   ./mvnw spring-boot:run
   ```

The API will be available at `http://localhost:8080` by default (configurable via `PORT`).

---

## Frontend Setup

1. Go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Copy the example env file:
   ```bash
   copy .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the app locally:
   ```bash
   npm run dev
   ```

The app runs on Vite's dev server at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `SPRING_DATASOURCE_URL` | PostgreSQL (Neon) connection URL |
| `SPRING_DATASOURCE_USERNAME` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | Database password |
| `PORT` | Port the Spring Boot app runs on |
| `MAIL_USERNAME` | Gmail SMTP account for outgoing email |
| `MAIL_PASSWORD` | Gmail SMTP app password |
| `GROQ_API_KEY` | API key for Groq / Llama AI recommendations |
| `GOOGLE_CLIENT_ID` | Google OAuth2 client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth2 client secret |
| `OAUTH_REDIRECT_URI` | Exact Google callback URL, e.g. `https://your-backend/login/oauth2/code/google` |
| `APP_FRONTEND_URL` | Frontend origin used after OAuth, e.g. `https://your-app.vercel.app` |
| `APP_CORS_ALLOWED_ORIGINS` | Comma-separated browser origins permitted to call the API |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API, e.g. `http://localhost:8080/api` |

---

## Deployment

### Frontend (Vercel)

- Import the frontend project using the `frontend/` folder as the project root
- Set the environment variable:
  ```
  VITE_API_BASE_URL=https://your-backend-url/api
  ```
- Vercel uses `frontend/vercel.json` for SPA routing

### Backend

- Deploy the `backend/` folder as a Java / Spring Boot application (e.g. Render, Railway, a VM, or via the included `Dockerfile`)
- Set all backend environment variables listed above in your hosting platform's secret/config store
- Provide database connection details, ports, and API keys via environment variables rather than committing them to config files

---

## Security Notes

- Never commit secrets (`.env`, API keys, credentials) into source control
- Keep `.env` and other `.env.*` files local, or store them in your deployment platform's secret manager
- `.env.example` files in both `backend/` and `frontend/` act as the safe, values-stripped templates
- `.gitignore` at the repo root and within `backend/` should exclude `.env`, `target/`, `node_modules/`, and `dist/`

---

## Contributing

Contributions are welcome. Please follow the steps below.

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes
   ```bash
   git commit -m "Add: brief description of the change"
   ```
4. Push your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request with a clear description of what was changed and why

### Development Guidelines

- Follow the existing code style and structure
- Write clear, concise commit messages
- Test changes thoroughly before submitting
- Update documentation alongside code changes

---

## Developer

**Carbon Tracker Team**

| | |
|---|---|
| GitHub | https://github.com/vamsikrishna-18/carbon-tracker-repo |
| Live App | https://carbon-tracker-pulse.vercel.app |
| Email | vamsinalluri555@gmail.com |

---

<p align="center">Built with React, Vite, Tailwind CSS, and Spring Boot — data hosted on Neon PostgreSQL.</p>
