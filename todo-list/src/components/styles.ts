import { css } from "lit";

export const todoListStyles = css`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const listTodoItemsStyles = css`
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: space-between;
    padding: 4px;
  }
  input[type="checkbox"] {
    margin-right: 8px;
  }
`
