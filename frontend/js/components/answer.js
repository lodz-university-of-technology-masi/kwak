import {defineElement, HtmlComponent} from "../html-component.js";

let answerRadios = [];

export class AnswerElement extends HtmlComponent {
    static get observedAttributes() {
        return ["content", "code"];
    }

    setChecked(state, global=true) {
        // Trochę takie obejście problemów z shadowdomem
        if (global && this.getAttribute('type') === 'radio') {
            answerRadios.forEach((answer) => answer.setChecked(false, false));
        }

        const checkbox = this.shadowRoot.querySelector("#checkbox");
        checkbox.checked = state;
        this.setAttribute("checked", checkbox.checked);
    }

    render() {
        const template = document.createElement("template");
        template.innerHTML = `
        <style>
            @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
        
            #answer {
                margin-top: .25rem;
            }
            
            :host([checked='true']) .list-group-item {
                background-color: #c2dbf7;
            }
            
            :host([type='radio']) .custom-checkbox {
                display: none;
            }
        </style>
        
        <a id="answer" href="#" class="list-group-item list-group-item-action">
            <div class="custom-control custom-checkbox float-left">
                <input type="checkbox" class="custom-control-input" id="checkbox">
                <label class="custom-control-label" for="customCheck1"></label>
            </div>
            <div id="content">Wczytywanie odpowiedzi</div>
            <code id="code"></code>
        </a>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector("#answer").addEventListener('click', () => {
            const checkbox = this.shadowRoot.querySelector("#checkbox");
            this.setChecked(!checkbox.checked);
            return false;
        });
    }

    connectedCallback() { answerRadios.push(this); }
    disconnectedCallback() { answerRadios = answerRadios.filter((value, index, arr) => value === this); }
}

defineElement("r-answer", AnswerElement);
