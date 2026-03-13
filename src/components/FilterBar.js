import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FILTERS } from "../hooks/useFilter";
import { useTheme } from "../context/ThemeContext";
const FilterBar = ({ activeFilter, onFilterChange, stats }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const buttons = [
    { key: FILTERS.ALL, label: `Semua (${stats.total})` },
    { key: FILTERS.ACTIVE, label: `Aktif (${stats.active})` },
    { key: FILTERS.COMPLETED, label: `Selesai (${stats.completed})` },
  ];
  return (
    <View style={styles.container}>
      {buttons.map((btn) => (
        <TouchableOpacity
          key={btn.key}
          style={[styles.btn, activeFilter === btn.key && styles.btnActive]}
          onPress={() => onFilterChange(btn.key)}
        >
          <Text
            style={[
              styles.label,
              activeFilter === btn.key && styles.labelActive,
            ]}
          >
            {btn.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const getStyles = (colors) =>
  StyleSheet.create({
    container: { flexDirection: "row", marginBottom: 16, gap: 8 },
    btn: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.accentSoft,
      alignItems: "center",
    },
    btnActive: { backgroundColor: colors.accent },
    label: { fontSize: 13, color: colors.textSecondary, fontWeight: "500" },
    labelActive: { color: "#FFFFFF", fontWeight: "700" },
  });
export default FilterBar;
