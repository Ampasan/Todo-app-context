import React, { memo } from "react";
import { Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";

const getPriorityLabel = (priority) => {
  switch (priority) {
    case "high":
      return "Tinggi";
    case "low":
      return "Rendah";
    default:
      return "Sedang";
  }
};

const TodoItem = memo(({ todo, onToggle, onDelete, drag, isActive }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <Pressable
      style={[styles.container, isActive && styles.active]}
      onLongPress={drag}
      delayLongPress={150}
    >
      <TouchableOpacity
        style={[styles.checkbox, todo.done && styles.checkboxDone]}
        onPress={() => onToggle(todo.id)}
      >
        {todo.done && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <Text style={[styles.text, todo.done && styles.textDone]}>{todo.text}</Text>

      <Text style={[styles.priorityBadge, styles[`priority_${todo.priority || "medium"}`]]}>
        {getPriorityLabel(todo.priority)}
      </Text>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </Pressable>
  );
});
const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      marginBottom: 8,
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
      elevation: 2,
      borderWidth: 1,
      borderColor: colors.inputBorder,
    },
    active: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.accent,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
      backgroundColor: "transparent",
    },
    checkboxDone: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    checkmark: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
    text: { flex: 1, fontSize: 16, color: colors.textPrimary },
    textDone: { textDecorationLine: "line-through", color: colors.textMuted },
    priorityBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      fontSize: 12,
      fontWeight: "800",
      marginRight: 8,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.inputBorder,
      color: colors.textSecondary,
      backgroundColor: colors.accentSoft,
    },
    priority_high: {
      backgroundColor: colors.danger,
      borderColor: colors.danger,
      color: "#0B1120",
    },
    priority_medium: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
      color: "#0B1120",
    },
    priority_low: {
      backgroundColor: colors.accentSoft,
      borderColor: colors.inputBorder,
      color: colors.textSecondary,
    },
    deleteBtn: { padding: 6 },
    deleteText: { color: colors.danger, fontSize: 16, fontWeight: "bold" },
  });
export default TodoItem;
