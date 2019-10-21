import {defineElement, HtmlComponent} from "../html-component.js";

export class QuestionElement extends HtmlComponent {
    static get observedAttributes() {
        return ["content", "code"];
    }

    render() {
        const template = document.createElement("template");
        template.innerHTML = `
        <style>
            #content {
                font-weight: bold;
            }
            
            code {
                display: block;
            }
        </style>
        <div id="content">Pytanie</div>
        <code id="code"></code>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

defineElement("r-question", QuestionElement);
