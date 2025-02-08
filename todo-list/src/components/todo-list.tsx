import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { listTodoItemsStyles, todoListStyles } from "./styles";
import { Task } from "@lit/task";

type DisplayMode = 'list' | 'card';

@customElement('todo-list')
class TodoList extends LitElement {
  static styles = todoListStyles;

  @property({ attribute: 'todo-list-id' })
  todoListId = 'test-id';

  @property({ attribute: 'type' })
  displayType: DisplayMode = 'list';

  private _renderTodoListItems() {
    switch(this.displayType) {
      case 'list':
        return html`
          <list-todo-items>
            <todo-items todo-list-id=${this.todoListId}></todo-items>
          </list-todo-items>`;
      case 'card':
        return html`
          <card-todo-items>
            <todo-items todo-list-id=${this.todoListId}></todo-items>
          </card-todo-items>
        `
    };
  }

  render() {
    return html`
      <div>
        <h1>Todo List</h1>
        ${this._renderTodoListItems()}
      </div>`
  }
}

type TodoItem = { id: number, text: string, status: 'completed' | 'pending' };

@customElement('list-todo-items')
class ListTodoItems extends LitElement {
  static styles = listTodoItemsStyles;

  @state()
  private _items?: TodoItem[];

  private _onChange(event: CustomEvent) {
    this._items = event.detail;
  }

  render() {
    return html`<div>
        <ul>
          ${this._items?.map(i =>
            html`
            <li>
              <div>
                <input type="checkbox" ?checked=${i.status === 'completed'}>
                <span>${i.text}</span>
              </div>
            </li>`
          )}
        </ul>
        <slot @change=${this._onChange}>
          <default-todo-items></default-todo-items>
        </slot>
        </div>`
  }
}

@customElement('card-todo-items')
class CardTodoItems extends LitElement {
  @state()
  private _items?: TodoItem[];

  private _onChange(event: CustomEvent) {
    this._items = event.detail;
  }

  render() {
    return html`
      <div>
        <div className="card">
        ${this._items?.map(i => html`
          <div class="content">
            <input type="checkbox" ?checked=${i.status === 'completed'}>
            <span>${i.text}</span>
          </div>`)}
        </div>
        <slot @change=${this._onChange}>
          <default-todo-items></default-todo-items>
        </slot>
      </div>
      `
  }
}

@customElement('todo-items')
class TodoItems extends LitElement {
  @property({ attribute: 'todo-list-id' })
  todoListId?: string;

  private _fetchTodoItems = new Task(this, {
    task: async ([todoListId], {signal}) => {
      console.log('fetching todo items for todo list id:', todoListId);
      const todoItems = [
        { id: 1, text: "Buy milk", status: "pending" },
        { id: 2, text: "Walk the dog", status: "completed" },
        { id: 3, text: "Do laundry", status: "pending" }
      ];
      this.dispatchEvent(new CustomEvent('change', {
        detail: todoItems,
        composed: true,
        bubbles: true
      }))
    },
    args: () => [this.todoListId]
  })
}

@customElement('default-todo-items')
class DefaultTodoItems extends LitElement {
  private _todoItems: TodoItem[] = [
    { id: 1, text: "test todo 1", status: "pending" },
    { id: 2, text: "test todo 2", status: "completed" },
    { id: 3, text: "test todo 3", status: "pending" }
  ];

  connectedCallback(): void {
    super.connectedCallback()
    this.dispatchEvent(new CustomEvent('change', {
      detail: this._todoItems,
      composed: true,
      bubbles: true
    }))
  }
}
