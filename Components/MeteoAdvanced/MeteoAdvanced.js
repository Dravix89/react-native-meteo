import React from "react";
import { View, Text } from "react-native";
import styles from "./MeteoAdvancedStyle";

export function MeteoAdvanced({ windspeed, sunrise, sunset }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.info}>{sunrise}</Text>
        <Text style={styles.info}>{sunset}</Text>
        <Text style={styles.info}>{windspeed} km/h</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Aube</Text>
        <Text style={styles.label}>Crépuscule</Text>
        <Text style={styles.label}>Vent</Text>
      </View>
    </View>
  );
}

export default MeteoAdvanced;
