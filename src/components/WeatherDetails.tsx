"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import useWeather from "@/hooks/useWeather";

type Props = {
  lat?: number;
  lng?: number;
};

export default function WeatherDetails({ lat, lng }: Props) {
  const { weather, error, fetchWeather, fetchWeatherByCity } = useWeather();
  const lastQueryRef = useRef<string | null>(null);

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      const key = `${lat},${lng}`;
      if (lastQueryRef.current === key) return;
      lastQueryRef.current = key;
      fetchWeather(lat, lng);
      return;
    }

    const city = sessionStorage.getItem("manual-city");
    if (city && lastQueryRef.current !== city) {
      lastQueryRef.current = city;
      fetchWeatherByCity(city);
      sessionStorage.removeItem("manual-city");
    }
  }, [lat, lng, fetchWeather, fetchWeatherByCity]);

  function formatTime(unix: number) {
    return new Date(unix * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="mt-6">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-400 mb-4 sm:mb-6 text-sm sm:text-base"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="p-4 sm:p-5 rounded-xl bg-white/5">
              <div className="flex justify-between items-center flex-wrap lg:gap-0 gap-3">
                <div>
                  <p className="font-semibold text-m sm:text-base">
                    {weather.location}
                  </p>
                  <p className="text-white/60 capitalize text-xs sm:text-sm">
                    {weather.description}
                  </p>
                </div>
                <p className="text-3xl sm:text-4xl font-bold">
                  {weather.temperature}°C
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/5 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-center">
              <div>
                <p className="text-white/60">Feels like</p>
                <p>{weather.feelsLike}°C</p>
              </div>
              <div>
                <p className="text-white/60">Humidity</p>
                <p>{weather.humidity}%</p>
              </div>
              <div>
                <p className="text-white/60">Wind</p>
                <p>{weather.windSpeed} m/s</p>
              </div>
              <div>
                <p className="text-white/60">Clouds</p>
                <p>{weather.cloudiness}%</p>
              </div>
              <div>
                <p className="text-white/60">Min / Max</p>
                <p>
                  {weather.tempMin}°C / {weather.tempMax}°C
                </p>
              </div>
              <div>
                <p className="text-white/60">Sunrise</p>
                <p>{formatTime(weather.sunrise)}</p>
              </div>
              <div>
                <p className="text-white/60">Sunset</p>
                <p>{formatTime(weather.sunset)}</p>
              </div>
              <div>
                <p className="text-white/60">Visibility</p>
                <p>{weather.visibility / 1000} km</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
