# WebApp: React + Express + MongoDB

This is a full-stack web application starter using React (frontend), Express.js (backend), and MongoDB Atlas (cloud database).

## Project Structure

- `/client` — React frontend (create-react-app)
- `/server` — Express.js backend API

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (free tier available)

## Setup Instructions

### 1. Clone the repository
```
git clone <your-repo-url>
cd webapp
```

### 2. Install dependencies
#### Frontend
```
cd client
npm install
```
#### Backend
```
cd ../server
npm install
```

### 3. Configure MongoDB Atlas
- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Create a database user and get your connection string (replace `<password>` and `<dbname>`)
- Copy `.env.example` to `.env` in `/server` and fill in your MongoDB URI

### 4. Run the app locally
#### Backend (in /server):
```
npm run dev
```
#### Frontend (in /client):
```
npm start
```

### 5. Deployment
- Frontend: Deploy `/client` to Vercel or Netlify (connect your GitHub repo)
- Backend: Deploy `/server` to Render or Railway (connect your GitHub repo)

## CI/CD
- GitHub Actions workflows are included for both frontend and backend

---

Replace placeholder values as needed. See each folder for more details.
