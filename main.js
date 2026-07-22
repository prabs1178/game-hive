import { auth, signOut } from '../firebase-config.js';

function logout() {
    signOut(auth).then(() => {
        alert("Logged out successfully!");
        window.location.reload();
    }).catch(error => alert(error.message));
}

window.logout = logout;
import { auth, onAuthStateChanged } from '../firebase-config.js';

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("userGreeting").innerText = `Welcome, ${user.email}!`;
    } else {
        document.getElementById("userGreeting").innerText = "Welcome to Game Hive!";
    }
});


function saveScore(game, score) {
    const user = firebase.auth().currentUser;

    if (user) {
        const userId = user.uid;

        firebase.database().ref("scores/" + userId).set({
            username: user.email, // Store email as username
            game: game,
            score: score,
            timestamp: new Date().toISOString() // Store time of the score
        });

        alert("Score Saved Successfully!");
    } else {
        alert("You must be logged in to save scores.");
    }
}
