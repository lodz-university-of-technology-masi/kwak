import {defineElement, HtmlComponent} from "../html-component.js";

export class QuestionElement extends HtmlComponent {
    static get observedAttributes() {
        return ["content"];
    }

    render() {
        const template = document.createElement("template");
        template.innerHTML = `
        <style>
            #content {
                font-weight: bold;
            }
        </style>
        <div id="content">Pytanie</div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

defineElement("r-question", QuestionElement);
