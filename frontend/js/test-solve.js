import "./html-component.js";
import "./components/question-counter.js"
import "./components/question.js"
import "./components/answer.js"
import {getTest} from "./api.js";
import {getAnswers,saveAnswers} from "./storage.js";

let currentQuestion = 0;
let totalQuestions = 2;
let test = {};

const questionElem = document.querySelector("r-question");
const questionCounterElem = document.querySelector("r-question-counter");
const questionBox = document.querySelector("#question");
const errorBox = document.querySelector("#errorBox");
const answersElem = document.querySelector("#answers");
const prevQuestionButton = document.querySelector("#prevQuestion");
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
    for (const answerIdx in question.answers) {
        const answer = question.answers[answerIdx];
        const answerElement = document.createElement("r-answer");
        answerElement.setAttribute("answerid", answerIdx);
        answerElement.setAttribute("content", answer.content);
        answerElement.setAttribute("type", question.type);
        answersElem.appendChild(answerElement);
    }
}

function changeQuestion(questionIdx) {
    // Hide question during fetching next question
    loadingSpinner.classList.add("spinner-border");
    loadingSpinner.classList.add("spinner-border-sm");
    nextQuestionButton.disabled = true;

    // Save answers
    const answers = [...document.querySelectorAll("r-answer[checked='true']")]
        .map(x => +x.getAttribute("answerid"));
    saveAnswers(test.id, currentQuestion, answers);

    loadingSpinner.classList.remove("spinner-border");
    loadingSpinner.classList.remove("spinner-border-sm");

    questionBox.classList.remove("appear");
    questionBox.classList.add("disappear");

    // Just for animation
    setTimeout(function() {
        questionBox.classList.remove("disappear");
        questionBox.classList.add("appear");

        currentQuestion = questionIdx;
        loadQuestion(test.questions[questionIdx - 1]);

        // Load answers
        const answers = getAnswers(test.id, currentQuestion);
        answers.forEach((id) => {
            document.querySelector("r-answer[answerid='"+ id +"']")
                .setChecked(true);
        });

        // Update questions counter
        questionCounterElem.setAttribute("current", currentQuestion);
        questionCounterElem.setAttribute("total", totalQuestions);

        nextQuestionButton.disabled = currentQuestion === totalQuestions;
        prevQuestionButton.disabled = currentQuestion === 1;

        // Restore question after fetching next question
        questionBox.classList.remove("disappear");
        questionBox.classList.add("appear");
    }, 350);
}

function showError(message) {
    errorBox.style.display = !message ? "none" : "block";
    errorBox.innerText = message;
}

prevQuestionButton.addEventListener('click', function(){
    changeQuestion(currentQuestion - 1);
});

nextQuestionButton.addEventListener('click', function(){
    changeQuestion(currentQuestion + 1);
});

test = getTest(0);
totalQuestions = test.questions.length;
changeQuestion(currentQuestion + 1);