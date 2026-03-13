import { SafeAreaProvider } from "react-native-safe-area-context";
import { TodoProvider } from "./src/context/TodoContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import HomeScreen from "./src/screens/HomeScreen";
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TodoProvider>
          <HomeScreen />
        </TodoProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
