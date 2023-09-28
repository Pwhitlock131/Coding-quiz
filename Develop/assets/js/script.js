var timeSpan = document.getElementById("time-left");
var startBttn = document.getElementById("start-bttn");

var timeLeft = questions.length * 60;

function displayTime() {
    timeSpan.textContent = timeLeft;
}

startBttn.addEventListener("click", function (event) {
    event.preventDefault();

    var timeInterval = setInterval(function () {
        displayTime();
        timeLeft--;
    }, 1000);
});