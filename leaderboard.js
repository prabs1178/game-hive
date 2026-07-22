firebase.database().ref("scores").orderByChild("score").limitToLast(10).on("value", (snapshot) => {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "<h2>🏆 Leaderboard</h2>";

    let scores = [];
    snapshot.forEach((childSnapshot) => {
        let data = childSnapshot.val();
        scores.push(data);
    });

    scores.sort((a, b) => b.score - a.score);

    scores.forEach((player, index) => {
        leaderboard.innerHTML += `<p>${index + 1}. ${player.game}: ${player.score} points</p>`;
    });
});
