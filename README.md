**⚡IdeaGen — AI Project Idea Generator**
 
 Description

IdeaGen is a full-stack AI-powered web application that generates personalized software project ideas based on a user’s skill level and preferred technology stack. The application allows users to securely authenticate, generate ideas using AI, and manage saved ideas through a simple and interactive dashboard.

 **Features**

Email & Password Authentication

Google Sign-In

AI-Based Project Idea Generation

Save, Pin & Delete Ideas

Sidebar Dashboard for Managing Ideas

Update Username

Dark / Light Mode

**Tech Stack**
**Frontend**

HTML

CSS

JavaScript

**Backend**

Node.js

Express.js

**AI Integration**

Cohere API

**Database & Authentication**

Firebase Firestore

Firebase Authentication

**Running Locally**

After cloning this repository, follow the steps below:

Create a Firebase project.

Enable Email/Password Authentication and Google Sign-In.

Enable Firestore Database.

Download serviceAccountKey.json and place it inside the backend folder.

Create a Cohere account and generate your API key.

Inside the backend folder, create a .env file and add:

PORT=5000
COHERE_API_KEY=your_cohere_api_key
**▶ Start the Backend**
cd backend
npm install
npm run dev

The backend will run on:
http://localhost:5000

**▶ Start the Frontend**
cd frontend

Open login.html using Live Server and ensure the API base URL points to:
http://localhost:5000

**📂 Project Structure**
backend/
 ├── routes/
 ├── firebase.js
 ├── server.js

frontend/
 ├── index.html
 ├── login.html
 ├── signup.html
 └── assets/
