export class HtmlComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        return new Error("Method not implemented");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.getElementById(name).innerText = newValue;
    }
}

export function defineElement(name, elementClass) {
    window.customElements.define(name, elementClass);
}

export function update(selector) {
    const element = document.querySelector(selector);
    return new Proxy(element, {
        get: function (target, key) {
            return element.getAttribute(key);
        },
        set: function (target, key, value) {
            element.setAttribute(key, value);
            return true;
        }
    });
}