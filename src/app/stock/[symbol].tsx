import { View, Text } from "@/src/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";

import StockListItem from "../../components/StockListItem";
import Graph from "@/src/components/Graph";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query quote($symbol: String) {
    quote(symbol: $symbol) {
      name
      symbol
      close
      percent_change
    }
  }
`;

const StockDetails = () => {
  const { symbol } = useLocalSearchParams();
  const { data, error, loading } = useQuery(query, { variables: { symbol } });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Could not found the symbol : {symbol}</Text>;
  }

  const stock = data.quote;

  console.log(stock);

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: `${symbol} details`, headerBackTitleVisible: false }} />
      <StockListItem stock={stock} />
      <Graph />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
});

export default StockDetails;
