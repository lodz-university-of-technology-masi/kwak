import "./html-component.js";
import "./components/question-counter.js"
import "./components/question.js"
import "./components/answer.js"

let currentQuestion = 1;

const questionElem = document.querySelector("r-question");
const questionCounterElem = document.querySelector("r-question-counter");
const questionBox = document.querySelector("#question");
const errorBox = document.querySelector("#errorBox");
const answersElem = document.querySelector("#answers");
const nextQuestionButton = document.querySelector("#nextQuestion");

function loadQuestion(question) {
    questionElem.setAttribute("title", question.title);
    questionElem.setAttribute("description", question.description);
    questionElem.setAttribute("code", question.code);

    // Remove existing answers
    while (answersElem.firstChild) {
        answersElem.firstChild.remove();
    }

    // Add answers to div
    for (const answer of question.answers) {
        const answerElement = document.createElement("r-answer");
        answerElement.setAttribute("content", answer.content);
        answersElem.appendChild(answerElement);
    }
}

function nextQuestion() {
    // Hide question during fetching next question
    questionBox.classList.remove("appear");
    questionBox.classList.add("disappear");

    fetch('https://demo5965341.mockable.io/question')
        .then(response => {
            return response.json();
        })
        .then(data => {
            loadQuestion(data);

            // Update questions counter
            currentQuestion++;
            questionCounterElem.setAttribute("current", currentQuestion);

            // Restore question after fetching next question
            questionBox.classList.remove("disappear");
            questionBox.classList.add("appear");
        })
        .catch(err => {
            showError(err);
        });
}

function showError(message) {
    errorBox.style.display = !message ? "none" : "block";
    errorBox.innerText = message;
}

nextQuestionButton.addEventListener('click', function(){
    nextQuestion();
});