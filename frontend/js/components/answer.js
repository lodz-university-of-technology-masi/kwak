import {defineElement, HtmlComponent} from "../html-component.js";

export class AnswerElement extends HtmlComponent {
    static get observedAttributes() {
        return ["content", "code"];
    }

    render() {
        const template = document.createElement("template");
        template.innerHTML = `
        <style>
            #answer {
                padding: 15px;
                background-color: #fff;
                border: 1px solid rgba(0,0,0,.125);
                margin-top: .25rem;
            }
        </style>
        
        <div id="answer">
            <div id="content">Wczytywanie odpowiedzi</div>
            <code id="code"></code>
        </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

defineElement("r-answer", AnswerElement);
