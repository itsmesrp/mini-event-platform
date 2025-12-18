# Event Platform – MERN Stack Application

## Project Overview

This project is a full-stack **Event Management Platform**. The application allows users to register, log in, create events, view events, and RSVP to events while enforcing capacity limits and handling concurrency safely.

The goal of this assignment is to demonstrate practical understanding of the **MERN stack**, authentication, database design, business logic implementation, and deployment readiness.

---

## Tech Stack

### Frontend

- **React (Vite)** – Fast and modern frontend tooling
- **Tailwind CSS** – Utility-first styling for responsive UI
- **React Router DOM** – Client-side routing
- **Axios** – API communication

### Backend

- **Node.js** – Runtime environment
- **Express.js** – REST API framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT (JSON Web Tokens)** – Authentication & authorization
- **Multer / Cloud upload** – Image upload handling

---

## Features

### Authentication

- User registration and login
- JWT-based authentication
- Auto-login after successful registration
- Secure logout functionality

### Event Management

- Create events with:
  - Title
  - Description
  - Date & Time (future dates only)
  - Location
  - Capacity
  - Optional image upload
- View all events
- Delete events (creator only)

### RSVP System (Core Requirement)

- Users can RSVP to events
- Capacity is strictly enforced
- Prevents overbooking using backend validation
- Handles concurrent RSVP requests safely

### UX Enhancements

- Loading indicators for all async actions
- Inline success & error banners (no browser alerts)
- Disabled actions during API calls
- Responsive design for mobile & desktop

---

## Business Logic Highlights

### RSVP Capacity Handling

- Each event stores a `capacity` and current `attendees` count
- Backend checks capacity before confirming RSVP
- Atomic update ensures multiple users cannot exceed capacity

### Date & Time Validation

- Frontend restricts past date & time selection
- Backend validates event date for safety

### Image Upload Handling

- Image uploads handled via multipart form data
- UI shows loader during upload to avoid blank states

---

## Project Structure

### Backend

```
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── index.js
```

### Frontend

```
client/
├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   ├── services/
│   └── main.jsx
└── vite.config.js
```

---

## How to Run Locally

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudiinary_name
CLOUDINARY_API_KEY=your_cloudiinary_api_key
CLOUDINARY_API_SECRET=your_cloudiinary_secret
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Deployment

- **Frontend**: Deployed using Vercel
- **Backend**: Deployed using Render
- **Database**: MongoDB Atlas

(Deployment configuration is compatible with production environments.)

---

## Design Decisions

- Used **JWT authentication** for stateless and scalable auth
- Chose **Tailwind CSS** for rapid UI development and consistency
- Implemented loaders and banners to improve user experience
- Separated frontend and backend for clean architecture

---

## Live Demo

- Frontend (Vercel): https://minieventplatform.vercel.app
- Backend (Render): https://event-platform-server.onrender.com

---

## Future Improvements

- Edit event functionality
- Image preview before upload
- Search and filter events
- Admin dashboard
- Pagination for events

---

**Developed by:** Sruthi S
