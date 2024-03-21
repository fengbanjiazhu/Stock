import React, { useState } from "react";
import { View, Text } from "./Themed";
import { LineGraph, GraphPoint } from "react-native-graph";
import { MonoText } from "./StyledText";

import timeseries from "../../assets/data/timeseries.json";

type GraphProps = {
  // graphPoints: GraphPoint[];
};

const Graph = ({}: GraphProps) => {
  const [selectPoint, setSelectPoint] = useState<GraphPoint>();

  // const points: GraphPoint[] = [
  //   {
  //     date: new Date(2024, 1, 1),
  //     value: 10,
  //   },
  // ];

  const points: GraphPoint[] = timeseries.values.map((value) => ({
    date: new Date(value.datetime),
    value: +value.close,
  }));

  const onPointSelected = (point: GraphPoint) => {
    setSelectPoint(point);
  };

  return (
    <View>
      <MonoText style={{ fontSize: 20, fontWeight: "bold", color: "#017560" }}>
        ${selectPoint?.value.toFixed(1) ?? "--"}
      </MonoText>

      <Text style={{ color: "grey" }}>{selectPoint?.date.toDateString() ?? "--:--:--"}</Text>

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
