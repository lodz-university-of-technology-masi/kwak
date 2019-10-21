import {defineElement, HtmlComponent} from "../html-component.js";

export class QuestionElement extends HtmlComponent {
    static get observedAttributes() {
        return ["title", "description", "code"];
    }

    render() {
        const template = document.createElement("template");
        template.innerHTML = `
        <style>
            #title {
                font-weight: bold;
            }
            
            code {
                display: block;
                margin-top: 20px;
            }
        </style>
        <div id="title"></div>
        <div id="description"></div>
        <code id="code"></code>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

defineElement("r-question", QuestionElement);
