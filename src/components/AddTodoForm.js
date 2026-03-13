import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const PRIORITIES = [
  { key: "high", label: "Tinggi" },
  { key: "medium", label: "Sedang" },
  { key: "low", label: "Rendah" },
];

const AddTodoForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text, priority);
      setText("");
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Tambahkan todo baru..."
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.priorityRow}>
        {PRIORITIES.map((p) => (
          <TouchableOpacity
            key={p.key}
            onPress={() => setPriority(p.key)}
            style={[
              styles.priorityBtn,
              priority === p.key && styles.priorityBtnActive,
            ]}
          >
            <Text
              style={[
                styles.priorityLabel,
                priority === p.key && styles.priorityLabelActive,
              ]}
            >
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const getStyles = (colors) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 16,
      gap: 10,
    },
    container: {
      flexDirection: "row",
      gap: 8,
    },
    input: {
      flex: 1,
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      padding: 14,
      fontSize: 16,
      color: colors.textPrimary,
      borderWidth: 1,
      borderColor: colors.inputBorder,
    },
    button: {
      width: 52,
      height: 52,
      backgroundColor: colors.accent,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: { color: "#FFFFFF", fontSize: 26, fontWeight: "bold" },
    priorityRow: {
      flexDirection: "row",
      gap: 8,
    },
    priorityBtn: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.accentSoft,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      alignItems: "center",
    },
    priorityBtnActive: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    priorityLabel: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: "600",
    },
    priorityLabelActive: {
      color: "#FFFFFF",
      fontWeight: "800",
    },
  });
export default AddTodoForm;
