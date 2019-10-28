import {defineElement, HtmlComponent} from "../html-component.js";
import { getUserFromLocalStorage } from "../cognito.js";

export class UserPanel extends HtmlComponent {
    static get observedAttributes() {
        return ["name"];
    }

    render() {
        const template = document.createElement("template");
        template.innerHTML = `        
            <h3>What's up? <span id="name"></span></h3>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

defineElement("r-user-panel", UserPanel);
