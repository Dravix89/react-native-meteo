import React from "react";
import { SafeAreaView, ImageBackground } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./Pages/Home/Home";
import backgroundImg from "./assets/background.png";
import { styles } from "./AppStyle";

export default function App() {
  return (
    <SafeAreaProvider>
      <ImageBackground source={backgroundImg} style={styles.imgBackground}>
        <SafeAreaView style={styles.container}>
          <Home />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}
