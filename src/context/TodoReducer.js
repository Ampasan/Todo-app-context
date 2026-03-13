export const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  DELETE_TODO: "DELETE_TODO",
  EDIT_TODO: "EDIT_TODO",
  CLEAR_DONE: "CLEAR_DONE",
  REORDER_TODOS: "REORDER_TODOS",
  SET_TODOS: "SET_TODOS",
};

const normalizePriority = (value) => {
  if (value === "high" || value === "medium" || value === "low") return value;
  return "medium";
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      if (typeof action.payload === "string") {
        if (!action.payload.trim()) return state;
        return [
          ...state,
          {
            id: Date.now().toString(),
            text: action.payload.trim(),
            done: false,
            priority: "medium",
            createdAt: new Date().toISOString(),
          },
        ];
      }

      if (!action.payload?.text?.trim()) return state; // Guard
      return [
        ...state,
        {
          id: Date.now().toString(),
          text: action.payload.text.trim(),
          done: false,
          priority: normalizePriority(action.payload.priority),
          createdAt: new Date().toISOString(),
        },
      ];
    case ACTIONS.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case ACTIONS.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case ACTIONS.EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.payload } : todo,
      );
    case ACTIONS.CLEAR_DONE:
      return state.filter((todo) => !todo.done);
    case ACTIONS.REORDER_TODOS:
      return action.payload;
    case ACTIONS.SET_TODOS:
      return (action.payload || []).map((t) => ({
        ...t,
        priority: normalizePriority(t.priority),
      }));
    default:
      return state;
  }
};
