import axios from "axios";

export class MeteoAPI {
  static async fetchWeatherFromCoords(coords) {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current_weather=true&daily=sunrise,sunset`
    );
    return response.data;
  }

  static async fetchCityFromCoords(coords) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`,
        {
          headers: {
            "User-Agent": "TonAppName/1.0 (ton.email@example.com)",
          },
        }
      );

      const { city, village, town } = response.data.address;
      return city || village || town || "Ville Inconnue";
    } catch (error) {
      console.error("Erreur lors de la récupération de la ville:", error);
      return "Ville inconnue";
    }
  }

  static async fetchCoordsFromCity(city) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: city,
            format: "json",
            limit: 1,
          },
          headers: {
            "User-Agent": "TonAppName/1.0 (ton.email@example.com)",
          },
        }
      );

      if (response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon),
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des coordonnées :", error);
      return null;
    }
  }
}
