import React, { useEffect, useState } from "react";
import styles from "./Home.style";
import {
  Image,
  ImageBackground,
  Keyboard,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";
import MeteoBasic from "../../Components/MeteoBasic/MeteoBasic";
import { getWeatherInterpretation } from "../../Components/Service/MeteoService";
import MeteoAdvanced from "../../Components/MeteoAdvanced/MeteoAdvanced";
import backgroundImg from "../../assets/background.png";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { MeteoAPI } from "..//..//API/Meteo";
// _________________________________________Mes Import____________________________________________

export default function Home() {
  const [coords, setCoords] = useState({ lat: 48.85, lng: 2.35 });
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (coords) {
      fetchWeather(coords);
      fetchCity(coords);
    }
  }, [coords]);

  // ______________________________ Ma fonction fetchWeather
  async function fetchWeather(coordinates) {
    try {
      const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(
        coordinates
      );

      // Ajoute le log ici pour vérifier la réponse
      console.log(weatherResponse);
      setCurrentWeather(weatherResponse.current_weather);

      // Ajout du traitement pour Aube (sunrise) et Crépuscule (sunset)
      if (weatherResponse?.daily?.sunrise && weatherResponse?.daily?.sunset) {
        setSunrise(
          weatherResponse.daily.sunrise[0]?.substring(11, 16) || "N/A"
        );
        setSunset(weatherResponse.daily.sunset[0]?.substring(11, 16) || "N/A");
      } else {
        setSunrise("Données non disponibles");
        setSunset("Données non disponibles");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
      setSunrise("Erreur");
      setSunset("Erreur");
    }
  }

  // ______________________________Fonction pour obtenir la position de l'utilisateur
  async function getUserCoords() {
    let { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } else {
      setCoords({ lat: "48.85", lng: "2.35" }); // Paris par défaut
    }
  }

  async function fetchCity(coordinates) {
    const cityResponse = await MeteoAPI.fetchCityFromCoords(coordinates);
    setCity(cityResponse);
  }

  // Appeler la fonction pour obtenir la position de l'utilisateur au montage du composant
  useEffect(() => {
    getUserCoords();
  }, []);

  // ___________________________________________________________
  async function searchCityWeather() {
    if (!searchQuery.trim()) return;

    try {
      const response = await MeteoAPI.fetchCoordsFromCity(searchQuery);
      if (response) {
        setCoords(response);
      } else {
        console.error("Ville non trouvée");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche de la ville:", error);
    }
  }

  return (
    <ImageBackground source={backgroundImg} style={styles.imgBackground}>
      <View style={styles.container}>
        {/* Afficher les coordonnées GPS */}
        {/* <Text style={styles.text}>
          Latitude: {coords.lat}, Longitude: {coords.lng}
        </Text> */}

        {/* Afficher les 3 sections (Basic, Search & Advanced) */}
        {currentWeather ? (
          <>
            <View style={styles.meteo_basic}>
              <MeteoBasic
                temperature={Math.round(currentWeather.temperature)}
                city={city || "Chargement..."}
                interpretation={getWeatherInterpretation(
                  currentWeather.weathercode
                )}
              />
            </View>
            {/* <View style={styles.searchbar}></View> */}
            {/* _________________________________________________ */}
            {/* Barre de recherche */}
            <View style={styles.searchbar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher Une Ville..."
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                }}
                onSubmitEditing={() => {
                  searchCityWeather();
                }}
              />
            </View>

            {/* ______________________________ */}
            <View style={styles.meteo_advanced}>
              <MeteoAdvanced
                windspeed={currentWeather?.windspeed}
                winddirection={currentWeather?.winddirection}
                sunrise={sunrise}
                sunset={sunset}
              />
            </View>
          </>
        ) : null}
      </View>
    </ImageBackground>
  );
}
