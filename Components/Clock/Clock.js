import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { nowToHHMM } from "../Service/DateService";
import styles from "./ClockStyle";

export function Clock() {
  const [time, setTime] = useState(nowToHHMM());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(nowToHHMM());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Text style={styles.time}>{time}</Text>;
}
