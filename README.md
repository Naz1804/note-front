# Note App - Frontend

A modern, responsive note-taking application built with React and TypeScript. Features a clean, intuitive interface with full CRUD functionality, tag-based organization, and real-time search. Supports both email/password and Google OAuth authentication, with customizable themes (dark/light/system) and font options. Designed mobile-first with an adaptive desktop layout featuring three-column navigation for efficient note management.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Features & Functionality](#features--functionality)
- [User Interface](#user-interface)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Future Improvements](#future-improvements)

## Features
- User authentication (email/password & Google OAuth)
- Create, edit, delete, and archive notes
- Tag-based organization
- Search functionality
- Dark/light/system theme
- Font customization
- Responsive design (mobile & desktop)

## Tech Stack
- React
- React Router v7
- TypeScript
- Tailwind CSS
- Vite

## Prerequisites
- Node.js v16+
- Backend API running

## Installation
```bash
npm install
```

## Environment Variables
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application
```bash
npm run dev
```
Access at `http://localhost:5173`

## Features & Functionality
### Authentication
- Email/password registration and login
- Google OAuth integration
- Persistent sessions with JWT cookies
- Protected routes

### Notes Management
- Create and edit notes with titles, content, and tags
- Archive/unarchive notes
- Delete notes
- Real-time search by title and tags
- Filter notes by tags

### Customization
- Dark/light/system theme modes
- Font selection (Sans-serif, Serif, Monospace)
- Settings persist across sessions
- Change Password

## User Interface
### Mobile View
- Bottom navigation
- Full-screen note editing
- Swipe-friendly interface

### Desktop View
- Three-column layout (sidebar, note list, note detail)
- Side-by-side note browsing

## Project Structure
```
frontend/
├── app/
│   ├── assets/
│   ├── components/
│   ├── modals/
│   ├── routes/
│   ├── types/
│   └── utils/
└── public/
```
## Routes
### Public Routes
- `/login` - User login
- `/register` - User registration
- `/auth/google` - Google OAuth

### Protected Routes
- `/notes` - All notes
- `/notes/:id` - Note detail
- `/notes/create` - Create note
- `/archive` - Archived notes
- `/archive/:id` - Archived note detail
- `/search` - Search results
- `/tags` - List of tags
- `/tags/:tag` - Notes by tag
- `/setting` - User preferences

## Future Improvements
- [ ] Rich text editor
- [ ] Note sharing
- [ ] Collaborative editing
- [ ] Export notes (PDF, Markdown)
- [ ] Note templates
- [ ] Keyboard Navigation
- [ ] Desktop Design Searchbar interactivity
