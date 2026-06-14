
# Portfolio CMS

A full-stack portfolio content management system (CMS) built using React, Node.js, Express, and MongoDB.

This project is designed as a **3-part architecture**:

- **Public Portfolio Website** → Visible to everyone
- **Admin Panel** → Used by admin to manage portfolio content
- **Backend API Server** → Handles authentication, database operations, and file storage

The system allows dynamic management of portfolio data such as projects, skills, personal details, and resume files without hardcoding them in frontend source code.

---

## System Architecture

```bash
portfolio-cms/
│
├── frontend/         # Public Portfolio + Admin Panel (React)
│
└── backend/          # Node.js API Server
```

---

## How the System Works

```text
Visitor
   |
   v
Public Portfolio Website (React)
   |
   | Fetches data via APIs
   v
Backend Server (Node + Express)
   |
   +---- MongoDB (portfolio data)
   |
   +---- Vercel Blob (resume storage)


Admin
   |
   v
Admin Panel (React)
   |
   | Login via JWT
   v
Backend Server
   |
   v
Update Database / Files
```

### Flow Explanation

### Public User Flow
- A visitor opens the portfolio website
- React frontend requests portfolio data from backend APIs
- Backend fetches:
  - Personal details
  - Skills
  - Projects
  - Resume link
- Data is returned and rendered to public users

Public users:
- Can view data
- Cannot modify anything
- Cannot access admin routes

---

### Admin Flow
- Admin opens admin panel
- Logs in using credentials
- Backend verifies password using bcrypt
- JWT token is issued after successful authentication
- Admin can:
  - Add/edit/delete projects
  - Update skills
  - Update personal details
  - Upload resume

---

## Public Portfolio Repository

Public-facing portfolio frontend:

https://github.com/Sahil-15052006/portfolio

> This repository contains only the public view of the portfolio.
> It does NOT expose admin authentication or protected backend logic.

---

## Tech Stack

### Frontend
- React
- JavaScript
- CSS / Tailwind CSS
- Axios / Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt Password Hashing

### Storage & DevOps
- Docker
- Docker Compose
- Vercel Blob Storage

---

## Features

### Public Features
- View portfolio details
- Browse projects
- Browse skills
- Download resume
- Responsive UI

### Admin Features
- Secure JWT login
- Protected admin routes
- CRUD for portfolio data
- Resume upload support

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
BLOB_READ_WRITE_TOKEN=your_blob_token
```

Run:

```bash
npm run dev
```

Docker:

```bash
docker-compose up --build
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_SERVER_URL=http://localhost:5000
```

Run:

```bash
npm run dev
```

---

## Authentication

Admin users are manually seeded into MongoDB.

Passwords are:
- Hashed locally using bcrypt
- Stored securely in database
- Compared during login

JWT tokens protect admin-only routes.

---

## Usage

This project is open-source under the MIT License.

You may:
- Use it
- Modify it
- Distribute it
- Use it commercially

Conditions:
- Include original MIT license
- Retain copyright notice

Ideal for:
- Portfolio websites
- Admin dashboards
- CMS learning projects
- MERN architecture reference

---

## License

MIT License

Copyright (c) 2026 Sahil

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction.

See the LICENSE file for full details.

---

## Author

**Sahil**  
MERN Stack Developer | Full Stack Developer

