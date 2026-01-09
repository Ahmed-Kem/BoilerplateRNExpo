import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useAppTranslation } from "@/hooks/use-translation";

export function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useAppTranslation();

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentLanguage === "en" && styles.activeButton]}
        onPress={() => changeLanguage("en")}
      >
        <ThemedText style={currentLanguage === "en" && styles.activeText}>EN</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, currentLanguage === "fr" && styles.activeButton]}
        onPress={() => changeLanguage("fr")}
      >
        <ThemedText style={currentLanguage === "fr" && styles.activeText}>FR</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "flex-start",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: "#007AFF",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
