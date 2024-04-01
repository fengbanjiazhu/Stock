import { StyleSheet, Pressable } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { MonoText } from "./StyledText";
import { Link } from "expo-router";
import { useMutation, gql } from "@apollo/client";

import { type StockListItem } from "../types/types";

const mutation = gql`
  mutation MyMutation($symbol: String!, $user_id: String!) {
    insertFavorites(symbol: $symbol, user_id: $user_id) {
      id
      symbol
      user_id
    }
  }
`;

const formatDataString = (str: string, tofixed: number = 1): number => {
  const data = +parseFloat(str).toFixed(tofixed);
  return data;
};

function StockListItem({ stock }: StockListItem) {
  const {} = useMutation(mutation, {
    variables: {
      symbol: stock.symbol,
      user_id: "vadim",
    },
  });
  const closePrice = formatDataString(stock.close);
  const change = formatDataString(stock.percent_change);
  const positive = change > 0;

  const onFavorite = function () {
    console.log("Pressed");
  };

  return (
    <Link href={`/stock/${stock.symbol}`} asChild>
      <Pressable style={styles.root}>
        {/* Left */}
        <View style={{ flex: 1 }}>
          <Text style={styles.symbol}>
            {stock.symbol}
            {"  "} <AntDesign onPress={onFavorite} name="staro" size={18} color="grey" />
          </Text>

          <Text style={{ color: "grey" }}>{stock.name}</Text>
        </View>

        {/* Right */}
        <View style={{ alignItems: "flex-end" }}>
          <MonoText>{closePrice}</MonoText>
          <MonoText style={{ color: positive ? "green" : "red" }}>
            {positive ? "+" : ""}
            {change}%
          </MonoText>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
  },
  symbol: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
});

export default StockListItem;
