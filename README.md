# DevSpace - Solo Developer OS

A personal MERN stack dashboard for managing projects, freelance work, and job applications.

## Project Structure

```
DevSpace/
├── client/                 # React Frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/     # Shared components (Sidebar, Layout, Header)
│   │   ├── pages/          # Page components (Dashboard, Projects, etc.)
│   │   ├── App.jsx         # Main Router
│   │   └── index.css       # Tailwind imports & global styles
│   ├── index.html          # HTML entry point (Fonts, Icons)
│   └── vite.config.js      # Vite config with API proxy
│
└── server/                 # Node/Express Backend
    ├── models/             # Mongoose Schemas (Project, Freelance, Job)
    ├── routes/             # API Routes
    ├── index.js            # Server entry point
    └── .env                # Environment variables
```

## Setup & Run

### 1. Backend (Server)
Open a terminal in `DevSpace/server` folder:
```bash
cd server
npm install
npm run dev
```
*Port: 5001* (Connected to MongoDB at `mongodb://127.0.0.1:27017/devspace`)

### 2. Frontend (Client)
Open a **new** terminal in `DevSpace/client` folder:
```bash
cd client
npm install
npm run dev
```
*Port: 3000* (Accessible at `http://localhost:3000`)

## Features implemented
- **Dashboard**: Overview of all sections.
- **Projects**: Filterable list of projects.
- **Freelance**: Kanban-style board.
- **Jobs**: Application tracker with status badges.
- **Settings**: Basic settings layout.

## API Endpoints (Sample)
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/freelance` - Get freelance items
- `GET /api/jobs` - Get job applications

## Notes
- The frontend currently uses **dummy data** for display purposes (Phase 1).
- Uncomment the `useEffect` block in `src/pages/Projects.jsx` to enable API fetching (Phase 2).
