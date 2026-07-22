document.addEventListener("DOMContentLoaded", function () {
    const particlesContainer = document.querySelector(".particles");
    const emojiContainer = document.querySelector(".emoji-container");

    // Generate Floating Particles
    for (let i = 0; i < 30; i++) {  // Increased number for a better effect
        let particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration = Math.random() * 5 + 2 + "s";
        particle.style.animationDelay = Math.random() * 2 + "s";
        particlesContainer.appendChild(particle);
    }

    // Game & Sports Emojis
    const emojis = ["🎮", "🕹️", "🏀", "⚽", "🎲", "♟️", "🎯", "🎰", "🏆", "🔫", "💣"];
    
    // Generate Floating Emojis
    for (let i = 0; i < 20; i++) {  // More emojis for a lively look
        let emoji = document.createElement("div");
        emoji.classList.add("emoji");
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.animationDuration = Math.random() * 6 + 3 + "s";
        emoji.style.animationDelay = Math.random() * 3 + "s";
        emojiContainer.appendChild(emoji);
    }
});
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { app, db } from "../firebase-config.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        const userRef = ref(db, "users/" + userId);

        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                document.getElementById("welcomeMessage").innerText = `Welcome, ${userData.email}!`;
            } else {
                console.log("No user data found!");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    } else {
        // If user is not logged in, redirect to login page
        window.location.href = "login.html";
    }
});
