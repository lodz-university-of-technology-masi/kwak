import {defineElement, HtmlComponent} from "../html-component.js";

export class QuestionCounterElement extends HtmlComponent {
    static get observedAttributes() {
        return ["total", "current"];
    }

    render() {
        const template = document.createElement("template");
        template.innerHTML = `<small>Pytanie <span id="current"></span>/<span id="total"></span></small>`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

defineElement("r-question-counter", QuestionCounterElement);
