import { useReducer } from "react";

const ACTIONS = {
  ADD: "add-todo",
  TOGGLE: "toggle-todo",
  DELETE: "delete-todo",
  EDIT: "edit-todo",
  DELETE_DONE: "delete-done",
  DELETE_ALL: "delete-all",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
        },
      ];
    case ACTIONS.TOGGLE:
      return todos.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed } : t
      );
    case ACTIONS.DELETE:
      return todos.filter((t) => t.id !== action.payload.id);
    case ACTIONS.EDIT:
      return todos.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text } : t
      );
    case ACTIONS.DELETE_DONE:
      return todos.filter((t) => !t.completed);
    case ACTIONS.DELETE_ALL:
      return [];
    default:
      return todos;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(reducer, []);
  return { todos, dispatch, ACTIONS };
}