// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC4NMCZJig2Im8PdgOlMbhU-jt4Dj_2P8o",
  authDomain: "project-idea-generator-a25e8.firebaseapp.com",
  projectId: "project-idea-generator-a25e8",
  storageBucket: "project-idea-generator-a25e8.firebasestorage.app",
  messagingSenderId: "579410211146",
  appId: "1:579410211146:web:3632e54985434b5b75d1b3"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Check auth state
function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'login.html';
    }
  });
}

// Login with Email/Password
async function loginWithEmail(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'index.html';
  } catch (error) {
    return error.message;
  }
}

// Signup with Email/Password
async function signupWithEmail(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = 'index.html';
  } catch (error) {
    return error.message;
  }
}

// Google Sign In
async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
    window.location.href = 'index.html';
  } catch (error) {
    return error.message;
  }
}

// Logout
async function logout() {
  await signOut(auth);
  window.location.href = 'login.html';
}

export { auth, checkAuth, loginWithEmail, signupWithEmail, loginWithGoogle, logout, onAuthStateChanged };