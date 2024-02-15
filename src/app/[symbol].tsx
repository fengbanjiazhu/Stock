import { View, Text } from "@/src/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import top5 from "@/assets/data/top5.json";
import StockListItem from "../components/StockListItem";

const StockDetails = () => {
  const { symbol } = useLocalSearchParams();

  const stock = top5[symbol];

  if (!stock) {
    return <Text>Could not found the symbol : {symbol}</Text>;
  }

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: `${symbol} details`, headerBackTitleVisible: false }} />
      <StockListItem stock={stock} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
});

export default StockDetails;
