import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAsvJoq-Stl28_udgtkLYYpXP0DpS8DbXw",
  authDomain: "weather-app-reviews.firebaseapp.com",
  projectId: "weather-app-reviews",
  storageBucket: "weather-app-reviews.firebasestorage.app",
  messagingSenderId: "334948780694",
  appId: "1:334948780694:web:a55f9a9fe78bb3c5c890b7"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)