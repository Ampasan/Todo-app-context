import { useTodoContext } from "../context/TodoContext";
import { useMemo } from "react";
const priorityRank = (priority) => {
  switch (priority) {
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
    default:
      return 2;
  }
};

export const useTodos = (filter = "all", sortMode = "manual") => {
  const { todos, addTodo, toggleTodo, deleteTodo, clearDone, reorderTodos } =
    useTodoContext();
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.done);
      case "completed":
        return todos.filter((t) => t.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  const sortedTodos = useMemo(() => {
    if (sortMode !== "priority") return filteredTodos;
    return [...filteredTodos].sort((a, b) => {
      const byPriority = priorityRank(b.priority) - priorityRank(a.priority);
      if (byPriority !== 0) return byPriority;
      const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
      const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
      return bTime - aTime;
    });
  }, [filteredTodos, sortMode]);
  const stats = useMemo(
    () => ({
      total: todos.length,
      active: todos.filter((t) => !t.done).length,
      completed: todos.filter((t) => t.done).length,
    }),
    [todos],
  );
  return {
    todos: sortedTodos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearDone,
    reorderTodos,
  };
};
