import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { Stack } from "expo-router";
import StockListItem from "@/src/components/StockListItem";

import { useQuery, gql } from "@apollo/client";

const query = gql`
  query quote($user_id: String!) {
    favoritesByUser_id(user_id: $user_id) {
      id
      symbol
      user_id
      quote {
        name
        close
        percent_change
        symbol
      }
    }
  }
`;

export default function TabTwoScreen() {
  const { data, loading, error } = useQuery(query, { variables: { user_id: "vadim" } });

  if (loading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch data</Text>;

  const stocks = data.favoritesByUser_id.map((fav) => fav.quote);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Favorite" }} />
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
