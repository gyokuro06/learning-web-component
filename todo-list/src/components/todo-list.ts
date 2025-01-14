import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { todoListStyles } from "./styles";
import { Task } from "@lit/task";

@customElement('todo-list')
class TodoList extends LitElement {
  static styles = todoListStyles;

  @property({ attribute: 'todo-list-id' })
  todoListId = 'test-id';

  private _fetchTodos = new Task(this, {
    task: async ([todoListId], { signal }) => {
      return {
        todos: [
          { id: 1, text: "Buy milk", status: "pending" },
          { id: 2, text: "Walk the dog", status: "completed" },
          { id: 3, text: "Do laundry", status: "pending" }
        ]
      }
    },
    args: () => [this.todoListId],
  });

  render() {
    return html`
      <div>
        <h1>Todo List</h1>
        ${this._fetchTodos.render({
          pending: () => html`<div>Loading...</div>`,
          complete: (todoItem) => html`
            <ul>
              ${todoItem.todos.map((todo) => html`
                <li>${todo.text}</li>
              `)}
            </ul>`
        })}
      </div>`
  }
}
