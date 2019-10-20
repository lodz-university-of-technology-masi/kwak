import "./html-component.js";
import "./components/question-counter.js"
import "./components/question.js"
import "./components/answer.js"

const question = document.querySelector("r-question");
const question_counter = document.querySelector("r-question-counter");
const answers = document.querySelector("#answers");

question.setAttribute("content", "Które z poniższych to owoc?");
question_counter.setAttribute("total", 1);
question_counter.setAttribute("current", 1);

const all_answers = [
    "Jabłko",
    "Klawiatura",
    "Samochód"
];

for (const answer of all_answers) {
    const answer_element = document.createElement("r-answer");
    answer_element.setAttribute("content", answer);
    answers.appendChild(answer_element);
}