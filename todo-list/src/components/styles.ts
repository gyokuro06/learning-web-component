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

export const cardTodoItemsStyles = css`
  .card {
    display: flex;
    flex-direction: column;
    gap: 8px;

    & .card-content {
      width: 560px;
      min-height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      border-style: solid 1px #497D74;
      padding: 8px;
    }

    & input[type="checkbox"] {
      display: none;
    }

    & .card-content:has(input:checked) {
      background-color: #d0e2be;
      color: #130012;
      border-style: solid 1px green;
    }

    & .card-content:not(:has(input:checked))
  }
`
