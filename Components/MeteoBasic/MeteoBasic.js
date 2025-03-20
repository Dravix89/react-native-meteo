import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./MeteoBasicStyle";
import { Clock } from "../Clock/Clock"; // Importer le composant Clock

export function MeteoBasic({ city, temperature, interpretation }) {
  return (
    <>
      <View style={styles.clock}>
        <Clock style={styles.clockText} />
      </View>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.weather_label}>{interpretation?.label}</Text>
      <View style={styles.temperature_box}>
        <Text style={styles.temperature}>{temperature}°</Text>
        <Image style={styles.image} source={interpretation?.image} />
      </View>
    </>
  );
}

export default MeteoBasic;
