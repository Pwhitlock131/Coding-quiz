var timeSpan = document.getElementById("time-left");
var startBttn = document.getElementById("start-bttn");
var questionContainer = document.getElementById("question-container")

var questions = [
    {
        question: "Question 1. ",
        choices: [" A.", "B.", "C."],
        answer: "B.",
    },
    {
        question: "question 2. ",
        choices: [" A.", "B.", "C."],
        answer: "C.",
    },
    {
        question: "question 3. ",
        choices: [" A.", "B.", "C."],
        answer: "A.",
    },
    {
        question: "question 4. ",
        choices: [" A.", "B.", "C."],
        answer: "B.",
    },
    {
        question: "question 5. ",
        choices: [" A.", "B.", "C."],
        answer: "A.",
    },
];


var timeLeft = questions.length * 60;
var currentQuestionIndex = 0;

function addChoiceEventListeners() {
    var choiceInputs = document.querySelectorAll('input[name="choice"]');
    for (var i = 0; i < choiceInputs.length; i++) {
        choiceInputs[i].addEventListener("change", function () {
            if (this.checked) {
                currentQuestionIndex++;
                displayQuestion();
            }
        });
    }
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        var currentQuestion = questions[currentQuestionIndex];
        var questionElement = document.createElement("div");
        questionElement.className = "question";
        questionElement.textContent = currentQuestion.question;

        for (var i = 0; i < currentQuestion.choices.length; i++) {
            var choiceLabel = document.createElement("label");
            var choiceInput = document.createElement("input");
            choiceInput.type = "radio";
            choiceInput.name = "choice";
            choiceLabel.textContent = currentQuestion.choices[i];
            choiceLabel.appendChild(choiceInput);
            questionElement.appendChild(choiceLabel);
        }

        questionContainer.innerHTML ="";
        questionContainer.appendChild(questionElement);

        addChoiceEventListeners();
    } else {
        questionContainer.innerHTML = "Congrats!!";
    }
}

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