import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useAppTranslation } from "@/hooks/use-translation";

export function ModalScreen() {
  const { t } = useAppTranslation();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.languageSwitcherContainer}>
        <LanguageSwitcher />
      </View>
      <ThemedText type="title">{t("modal.title")}</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">{t("modal.goHome")}</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  languageSwitcherContainer: {
    position: "absolute",
    top: 60,
    right: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
