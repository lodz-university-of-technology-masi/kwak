import "./html-component.js";
import "./components/question-counter.js"
import "./components/question.js"
import "./components/answer.js"
import {getTest} from "./api.js";

let currentQuestion = 0;
let totalQuestions = 2;
let test = {};

const questionElem = document.querySelector("r-question");
const questionCounterElem = document.querySelector("r-question-counter");
const questionBox = document.querySelector("#question");
const errorBox = document.querySelector("#errorBox");
const answersElem = document.querySelector("#answers");
const nextQuestionButton = document.querySelector("#nextQuestion");
const loadingSpinner = document.querySelector("#loadingSpinner");

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
        answerElement.setAttribute("type", question.type);
        answersElem.appendChild(answerElement);
    }
}

function nextQuestion() {
    // Hide question during fetching next question
    loadingSpinner.classList.add("spinner-border");
    loadingSpinner.classList.add("spinner-border-sm");
    nextQuestionButton.disabled = true;

    // Zapis odpowiedzi

    loadingSpinner.classList.remove("spinner-border");
    loadingSpinner.classList.remove("spinner-border-sm");

    questionBox.classList.remove("appear");
    questionBox.classList.add("disappear");

    loadQuestion(test.questions[currentQuestion]);

    // Update questions counter
    currentQuestion++;
    questionCounterElem.setAttribute("current", currentQuestion);
    questionCounterElem.setAttribute("total", totalQuestions);

    nextQuestionButton.disabled = currentQuestion === totalQuestions;

    // Restore question after fetching next question
    questionBox.classList.remove("disappear");
    questionBox.classList.add("appear");
}

function showError(message) {
    errorBox.style.display = !message ? "none" : "block";
    errorBox.innerText = message;
}

nextQuestionButton.addEventListener('click', function(){
    nextQuestion();
});

test = getTest(0);
totalQuestions = test.questions.length;
nextQuestion();