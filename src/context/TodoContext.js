import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { todoReducer, ACTIONS } from "./TodoReducer";

const TodoContext = createContext(null);
const STORAGE_KEY = "@todos";

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch({ type: ACTIONS.SET_TODOS, payload: parsed });
        }
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch((err) =>
      console.error("Error saving:", err),
    );
  }, [todos]);

  const addTodo = useCallback((textOrPayload, priority) => {
    if (typeof textOrPayload === "string") {
      dispatch({
        type: ACTIONS.ADD_TODO,
        payload: { text: textOrPayload, priority },
      });
      return;
    }
    dispatch({ type: ACTIONS.ADD_TODO, payload: textOrPayload });
  }, []);
  const toggleTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, id });
  }, []);
  const deleteTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, id });
  }, []);
  const clearDone = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_DONE });
  }, []);
  const reorderTodos = useCallback((nextTodos) => {
    dispatch({ type: ACTIONS.REORDER_TODOS, payload: nextTodos });
  }, []);

  const value = {
    todos,
    dispatch,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearDone,
    reorderTodos,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext harus digunakan dalam TodoProvider!");
  }
  return context;
};
