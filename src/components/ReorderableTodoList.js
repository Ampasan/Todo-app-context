import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList from "react-native-draggable-flatlist";
import TodoItem from "./TodoItem";

const ReorderableTodoList = ({
  todos,
  onReorder,
  onToggle,
  onDelete,
  ListEmptyComponent,
}) => {
  const keyExtractor = useCallback((item) => item.id, []);

  const renderItem = useCallback(
    ({ item, drag, isActive }) => (
      <TodoItem
        todo={item}
        onToggle={onToggle}
        onDelete={onDelete}
        drag={drag}
        isActive={isActive}
      />
    ),
    [onToggle, onDelete],
  );

  return (
    <GestureHandlerRootView style={styles.flex}>
      <DraggableFlatList
        data={todos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        onDragEnd={({ data }) => onReorder(data)}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

export default ReorderableTodoList;


