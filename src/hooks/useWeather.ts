import { useState } from "react";
import axios from "axios";

export type WeatherInfo = {
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  cloudiness: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  location: string;
  tempMin: number;
  tempMax: number;
};

export default function useWeather() {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setWeatherData(data: any) {
    setWeather({
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      cloudiness: data.clouds.all,
      visibility: data.visibility,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      location: data.name,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
    });
  }

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);

      console.log("🌤️ API CALL (lat/lon):", lat, lon);

      const response = await axios.get(API_URL, {
        params: {lat, lon, units: "metric", appid: API_KEY,
        },
      });

      console.log("✅ API SUCCESS:", response.status, response.data.name);

      setWeatherData(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("❌ API ERROR:", err?.response?.status, err?.message);
      setError("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log("🏙️ API CALL (city):", query);

      const response = await axios.get(API_URL, {
        params: {
          q: query,
          units: "metric",
          appid: API_KEY,
        },
      });

      console.log("✅ API SUCCESS:", response.status, response.data.name);

      setWeatherData(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("❌ CITY ERROR:", err?.response?.status, err?.message);
      setError("City or country not found");
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather, fetchWeatherByCity,};
}
