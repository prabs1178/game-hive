const targetWord = "APPLE";
let attempts = 0;

function checkWord() {
    let guess = document.getElementById("word-input").value.toUpperCase();
    let result = document.getElementById("result");

    if (guess.length !== 5) {
        result.innerText = "Enter a 5-letter word!";
        return;
    }

    attempts++;
    if (guess === targetWord) {
        result.innerText = "🎉 Correct!";
    } else {
        result.innerText = `❌ Wrong! ${6 - attempts} tries left`;
    }

    if (attempts >= 6) {
        result.innerText = "Game Over! The word was " + targetWord;
    }
}
