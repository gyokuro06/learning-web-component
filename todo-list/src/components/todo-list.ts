import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('todo-list')
export class TodoList extends LitElement {
    render() {
        return html`<div>Todo List</div>`
    }
}
