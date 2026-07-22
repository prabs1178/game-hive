// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-VEfCLDLCxARSinl8wRBDlpNYyIyDqUg",
  authDomain: "gamehive-86768.firebaseapp.com",
  databaseURL: "https://gamehive-86768-default-rtdb.firebaseio.com",
  projectId: "gamehive-86768",
  storageBucket: "gamehive-86768.appspot.com",
  messagingSenderId: "791019749713",
  appId: "1:791019749713:web:5bd3a751de27994249d370"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for the DOM to load before accessing elements
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission (page refresh)

    // Get user inputs
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate inputs
    if (email === "" || password === "") {
      alert("Please enter both email and password.");
      return;
    }

    // Sign in user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login successful! Redirecting...");
        window.location.href = "dashboard.html"; // Redirect to dashboard
      })
      .catch((error) => {
        let errorMessage = "Login failed: ";

        // User-friendly error messages
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage += "Invalid email format.";
            break;
          case "auth/user-disabled":
            errorMessage += "This account has been disabled.";
            break;
          case "auth/user-not-found":
            errorMessage += "No account found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage += "Incorrect password. Please try again.";
            break;
          default:
            errorMessage += error.message;
            break;
        }

        alert(errorMessage);
      });
  });
});
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log("Login successful!");
    window.location.href = "dashboard.html";
  })
  .catch((error) => {
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);
    alert("Login failed: " + error.message);
  });
