// Crossword Game Logic

document.addEventListener("DOMContentLoaded", function () {
    const crosswordGrid = document.getElementById("crosswordGrid");

    // Define the crossword structure (5x5 example)
    const crossword = [
        ["H", "", "", "T", ""],
        ["O", "", "C", "R", "O"],
        ["M", "P", "U", "T", "E"],
        ["E", "", "D", "", "R"],
        ["S", "", "", "", "D"]
    ];

    // Correct answers for the blank spaces
    const answers = [
        ["H", "E", "L", "T", "H"],
        ["O", "A", "C", "R", "O"],
        ["M", "P", "U", "T", "E"],
        ["E", "N", "D", "O", "R"],
        ["S", "E", "N", "D", "D"]
    ];

    // Generate the crossword grid dynamically
    for (let i = 0; i < crossword.length; i++) {
        for (let j = 0; j < crossword[i].length; j++) {
            let cell = document.createElement("input");
            cell.setAttribute("type", "text");
            cell.setAttribute("maxlength", "1");
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            cell.classList.add("cell");

            if (crossword[i][j] !== "") {
                cell.value = crossword[i][j]; // Pre-filled letter
                cell.disabled = true;
                cell.style.background = "#444"; // Dark background for given letters
            } else {
                cell.classList.add("input-cell"); // Style input fields differently
            }

            crosswordGrid.appendChild(cell);
        }
    }

    // Function to check answers
    window.checkAnswers = function () {
        let correct = true;
        document.querySelectorAll(".input-cell").forEach(cell => {
            let row = cell.getAttribute("data-row");
            let col = cell.getAttribute("data-col");
            let userAnswer = cell.value.toUpperCase();
            let correctAnswer = answers[row][col];

            if (userAnswer !== correctAnswer) {
                cell.style.border = "2px solid red"; // Highlight incorrect answers
                correct = false;
            } else {
                cell.style.border = "2px solid limegreen"; // Correct answer
            }
        });

        if (correct) {
            alert("🎉 Congratulations! You completed the crossword!");
        } else {
            alert("❌ Some answers are incorrect. Try again!");
        }
    };
});
