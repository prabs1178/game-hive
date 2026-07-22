document.addEventListener("DOMContentLoaded", function () {
    const emojiContainer = document.querySelector(".emoji-container");
    const emojis = ["🎮", "👾", "🕹️", "💻", "🎲", "🔥"]; // Gaming-themed emojis

    function createEmoji() {
        const emoji = document.createElement("div");
        emoji.classList.add("emoji");
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        // Random Positioning
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.animationDuration = Math.random() * 3 + 3 + "s"; // Speed of floating

        emojiContainer.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 5000);
    }

    setInterval(createEmoji, 500);
});
