import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  clock: {
    marginBottom: 5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    marginRight: 10,
  },
  clockText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  city: {
    fontSize: 30,
    fontWeight: "bold",
    // textAlign: "center",
    justifyContent: "flex-start",
    marginLeft: 20,
    color: "#fff",
    marginBottom: 10,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  weather_label: {
    fontSize: 20,
    textAlign: "right",
    color: "#fff",
    marginTop: 10,
    paddingRight: 25,
    marginBottom: -45,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  temperature_box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  temperature: {
    fontSize: 120,
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: 15,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    backgroundColor: "transparent",
    marginLeft: 30,
    marginTop: 5,
  },
});

export default styles;
