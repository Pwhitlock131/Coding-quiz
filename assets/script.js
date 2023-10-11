var timeSpan = document.querySelector("#time-left");

var startBttn = document.getElementById("start-bttn");
var questionContainer = document.getElementById("question-container")
var highScores = [];
var highScoresButton = document.getElementById("high-scores-bttn");
var scoreInputForm = document.getElementById("score-form");
var saveScoreButton = document.getElementById("save-score");
var selectedAnswers = [];

// questionBank segment
var questionBank = [
    {
        prompt: "Question 1. Inside which HTML element do we put the JavaScript?",
        choices: ["A. <js>", "B. <script>", "C. <java>"],
        answer: "B. <script>",
    },
    {
        prompt: "Question 2. What is the correct syntax for referring to an external script called blank.js?",
        choices: [" A. <script href=blank.js>", "B. <script=blank.js>", "C. <script src=blank.js>"],
        answer: "C.",
    },
    {
        prompt: "Question 3. How do you write (Hello World) in an alert box?",
        choices: [" A. alert('Hello World');", "B. msg('Hello World');", "C. box('Hello World');"],
        answer: "A.",
    },
    {
        prompt: "Question 4. How do you create a function in JavaScript?",
        choices: [" A. function = myFunction()", "B. function myFunction()", "C. function: myFunction()"],
        answer: "B.",
    },
    {
        prompt: "Question 5. How do you call a function named 'myFunction'",
        choices: [" A. myFunction()", "B. call.myFunction()", "C. myFunction"],
        answer: "A.",
    },
];
console.log(questionBank[0].choices)


var timeLeft = questionBank.length * 10;
var currentQuestionIndex = 0;
var selectedAnswers = new Array(questionBank.length);

function addChoiceEventListeners() {
    console.log("addingChoiceEventListeners");
    var choiceInputs = document.querySelectorAll('input[name="choice"]');
    console.log(choiceInputs)
    for (var i = 0; i < choiceInputs.length; i++) {
        choiceInputs[i].addEventListener("change", function (event) {
            event.preventDefault()
            console.log(event.target)
            console.dir(event.target)
            console.log(event.target.parentElement)
            var answerSelected = event.target.parentElement.innerText
            if(answerSelected !== questionBank[currentQuestionIndex].answer){
                timeLeft -=5
            }
                currentQuestionIndex++;
                displayQuestion();
            
        });
    }
}

function displayQuestion() {
    if (currentQuestionIndex < questionBank.length) {
        var currentQuestion = questionBank[currentQuestionIndex];
        var questionElement = document.createElement("div");
        questionElement.className = "question";
        questionElement.textContent = currentQuestion.prompt;

        for (var i = 0; i < currentQuestion.choices.length; i++) {
            var choiceLabel = document.createElement("label");
            var choiceInput = document.createElement("input");
            choiceInput.type = "radio";
            choiceInput.name = "choice";
            choiceLabel.textContent = currentQuestion.choices[i];
            choiceLabel.appendChild(choiceInput);
            questionElement.appendChild(choiceLabel);
        }

        questionContainer.innerHTML = "";
        questionContainer.appendChild(questionElement);

        addChoiceEventListeners();
    } else {
        questionContainer.innerHTML = "Congrats!!";
    }
}

//highscores segment
highScoresButton.addEventListener("click", function () {
    scoreInputForm.style.display = "block";
});

saveScoreButton.addEventListener("click", function (event) {
    event.preventDefault();

    var playerName = document.getElementById("player-name").value;
    var userScore = calculateScore();

    saveHighScore(userScore, playerName);
    scoreInputForm.style.display = "none";
    displayHighScores();
});

function saveHighScore(score, playerName) {
    var highScore = { score: score, playerName: playerName };
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(highScore);

    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function saveScore() {
    var playerName = document.getElementById("player-name").value;
    var userScore = calculateScore();
    var scoreData = { playerName: playerName, score: userScore };

    highScores.push(scoreData);
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayHighScores();
}


function displayHighScores() {
    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
    var highScoresList = document.getElementById("high-scores-list");

    if (storedHighScores && highScoresList) {
        highScoresList.innerHTML = "";

        for (var i = 0; i < storedHighScores.length; i++) {
            var scoreEntry = document.createElement("li");
            scoreEntry.textContent = `${storedHighScores[i].playerName}: ${storedHighScores[i].score}%`;
            highScoresList.appendChild(scoreEntry);
        }
    }
}

function isQuizComplete() {

    return currentQuestionIndex >= questionBank.length || timeLeft <= 0;
}

function calculateScore() {


    var correctAnswers = 0;

    for (var i = 0; i < questionBank.length; i++) {
        if (questionBank[i].answer === selectedAnswers[i]) {
            correctAnswers++;
        }
    }
    var totalQuestions = questionBank.length;
    var userScore = (correctAnswers / totalQuestions) * 100;
    return userScore.toFixed(2);
}

var completeCheckInterval = setInterval(function () {
    if (isQuizComplete()) {
        clearInterval(completeCheckInterval);
        saveHighScore(calculateScore(), prompt("Enter your name:"));
        displayHighScores();
    }
}, 1000);

//Timer functionality
function displayTime() {
    timeSpan.textContent = timeLeft;
}

startBttn.addEventListener("click", function (event) {
    event.preventDefault();

    var timeInterval = setInterval(function () {
        displayTime();
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            questionContainer.innerHTML = "Time's up!";
        }
    }, 1000);

    displayQuestion();
});