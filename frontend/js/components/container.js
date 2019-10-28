import {defineElement, HtmlComponent} from "../html-component.js";

export class ContainerElement extends HTMLElement {
    static get observedAttributes() {
        return ["target"];
    }

    constructor() {
        super();
        this.childNodes.forEach((value, key, parent) => {
            if (value.classList) {
                value.classList.add("hidden");
            }
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const activeElement = this.querySelector(`#${oldValue}`);
        if (activeElement) {
            activeElement.classList.remove("appear");
            activeElement.classList.add("hidden");
        }

        const element = this.querySelector(`#${newValue}`);
        if (element) {
            element.classList.remove("hidden");
            element.classList.add("appear");
        }
    }
}

defineElement("r-container", ContainerElement);
