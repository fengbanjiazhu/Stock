import { StyleSheet } from "react-native";

import { Text, View } from "@/src/components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text>Tab two</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
