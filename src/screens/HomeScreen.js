import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Switch,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodos } from "../hooks/useTodos";
import { useFilter } from "../hooks/useFilter";
import AddTodoForm from "../components/AddTodoForm";
import FilterBar from "../components/FilterBar";
import ReorderableTodoList from "../components/ReorderableTodoList";
import { useTheme } from "../context/ThemeContext";
const HomeScreen = () => {
  const { activeFilter, setFilter, FILTERS } = useFilter();
  const [sortMode, setSortMode] = useState("manual");
  const {
    todos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearDone,
    reorderTodos,
  } = useTodos(activeFilter, sortMode);
  const { colors, isDark, toggleTheme } = useTheme();

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.headerBackground}
      />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.header}>
            <Text style={styles.title}>My Todos</Text>
            <Text style={styles.subtitle}>
              {stats.completed} dari {stats.total} selesai
            </Text>
          </View>
          <View style={styles.rightControls}>
            <TouchableOpacity
              style={[
                styles.sortPill,
                sortMode === "priority" && styles.sortPillActive,
              ]}
              onPress={() =>
                setSortMode((m) => (m === "priority" ? "manual" : "priority"))
              }
            >
              <Text
                style={[
                  styles.sortText,
                  sortMode === "priority" && styles.sortTextActive,
                ]}
              >
                Sort: {sortMode === "priority" ? "Prioritas" : "Manual"}
              </Text>
            </TouchableOpacity>

            <View style={styles.toggleWrapper}>
              <Text style={styles.toggleLabel}>
                {isDark ? "Dark" : "Light"}
              </Text>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: "#CBD5F5", true: "#0EA5E9" }}
                thumbColor={isDark ? "#F9FAFB" : "#0F172A"}
              />
            </View>
          </View>
        </View>

        <AddTodoForm onAdd={addTodo} />

        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setFilter}
          stats={stats}
        />

        <ReorderableTodoList
          todos={todos}
          onReorder={reorderTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Tidak ada todo{" "}
              {activeFilter !== "all" ? `dengan filter '${activeFilter}'` : ""}
            </Text>
          }
        />

        {stats.completed > 0 && (
          <Text style={styles.clearBtn} onPress={clearDone}>
            Hapus {stats.completed} item selesai
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
const getStyles = (colors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.backgroundSafe },
    container: { flex: 1, padding: 20, backgroundColor: colors.backgroundApp },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingTop: 8,
    },
    header: { flex: 1, marginRight: 12 },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.textPrimary,
      marginBottom: 4,
    },
    subtitle: { fontSize: 14, color: colors.textSecondary },
    rightControls: {
      alignItems: "flex-end",
      justifyContent: "center",
      gap: 10,
    },
    sortPill: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 999,
      backgroundColor: colors.accentSoft,
      borderWidth: 1,
      borderColor: colors.inputBorder,
    },
    sortPillActive: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    sortText: { fontSize: 12, color: colors.textSecondary, fontWeight: "700" },
    sortTextActive: { color: "#FFFFFF" },
    toggleWrapper: {
      alignItems: "flex-end",
      justifyContent: "center",
    },
    toggleLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    emptyText: {
      textAlign: "center",
      color: colors.textMuted,
      marginTop: 60,
      fontSize: 16,
    },
    clearBtn: {
      textAlign: "center",
      color: colors.danger,
      padding: 12,
      fontSize: 14,
    },
  });
export default HomeScreen;
