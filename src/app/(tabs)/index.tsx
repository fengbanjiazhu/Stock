import { StyleSheet, FlatList, ActivityIndicator } from "react-native";

import { Text, View } from "@/src/components/Themed";
import { Stack } from "expo-router";
import StockListItem from "@/src/components/StockListItem";

import { useQuery, gql } from "@apollo/client";

import top5 from "@/assets/data/top5.json";

// export type StockDataItem = ReturnType<typeof>

const query = gql`
  query quote($symbol: String) {
    quotes(symbol: $symbol) {
      name
      value {
        name
        symbol
        close
        percent_change
      }
    }
  }
`;

export default function TabOneScreen() {
  const { data, loading, error } = useQuery(query, {
    variables: { symbol: "AAPL,IBM,AMZN,META,GOOG,MSFT,NVDA" },
  });

  if (loading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch data</Text>;

  const stocks = data.quotes.map((query) => query.value);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Stocks" }} />
      <FlatList
        data={stocks}
        renderItem={({ item }) => <StockListItem stock={item} />}
        contentContainerStyle={{ gap: 20, padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
