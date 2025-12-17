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
};

export default function useWeather() {
    const [weather, setWeather] = useState<WeatherInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (lat: number, lon: number) => {
        try {
            setLoading(true);
            setError(null); 

            const key = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

            const response = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        lat,
                        lon,
                        units: "metric",
                        appid: key,
                    },
                }
            );

            const data = response.data;

            const weatherData: WeatherInfo = {
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
            };

            setWeather(weatherData);
        } catch (error) {
            setError("Failed to fetch weather. Please try again later.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { weather, loading, error, fetchWeather };
}
