import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { View, Text } from "./Themed";
import { LineGraph, GraphPoint } from "react-native-graph";
import { MonoText } from "./StyledText";
import { useQuery, gql } from "@apollo/client";

type GraphProps = {
  // graphPoints: GraphPoint[];
  symbol: string | string[];
};

const query = gql`
  query quote($symbol: String, $interval: String) {
    time_series(symbol: $symbol, interval: $interval) {
      meta {
        currency
        exchange
        exchange_timezone
        interval
        symbol
        mic_code
        type
      }
      values {
        close
        datetime
        high
        low
        open
        volume
      }
      status
    }
  }
`;

const Graph = ({ symbol }: GraphProps) => {
  const { data, error, loading } = useQuery(query, { variables: { symbol, interval: "1day" } });
  const [selectPoint, setSelectPoint] = useState<GraphPoint>();

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Something went wrong with the graph</Text>;

  const { time_series: timeSeries } = data;

  const points: GraphPoint[] = timeSeries.values.map((value) => ({
    date: new Date(value.datetime),
    value: +value.close,
  }));

  const onPointSelected = (point: GraphPoint) => {
    setSelectPoint(point);
  };

  const latestPoint = `${points.at(-1)?.value.toFixed(1)}`;
  const latestPointDate = `${points.at(-1)?.date.toDateString()}`;

  return (
    <View>
      <MonoText style={{ fontSize: 20, fontWeight: "bold", color: "#017560" }}>
        ${selectPoint?.value.toFixed(1) ?? latestPoint}
      </MonoText>

      <Text style={{ color: "grey" }}>{selectPoint?.date.toDateString() ?? latestPointDate}</Text>

      <LineGraph
        style={{ width: "100%", height: 300 }}
        points={points}
        animated={true}
        color={"#017560"}
        gradientFillColors={["#0175605D", "#7476df00"]}
        enablePanGesture={true}
        onPointSelected={onPointSelected}
        enableIndicator
        indicatorPulsating
      />
    </View>
  );
};

export default Graph;
