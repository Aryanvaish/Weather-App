"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import WeatherDetails from "./WeatherDetails";

export default function WeatherIntro() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null);
  const [geoResolved, setGeoResolved] = useState(false);
  const [manualLocation, setManualLocation] = useState("");

  const manualInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!navigator.permissions) return;

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      setPermissionState(result.state);

      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setGeoResolved(true);
            setPermissionState("granted");
          },
          () => setGeoResolved(true)
        );
      }

      if (result.state === "denied") {
        setGeoResolved(true);
        setPermissionState("denied");
      }
    });
  }, []);

  function onCheckWeather() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoResolved(true);
        setPermissionState("granted");
      },
      () => {
        setGeoResolved(true);
        setPermissionState("denied");
      }
    );
  }

  function handleManualLocation() {
    const value = manualLocation.trim();
    if (!value) return;

    setManualLocation("");

    if (value.includes(",")) {
      const [lat, lon] = value.split(",").map(Number);
      if (!isNaN(lat) && !isNaN(lon)) {
        setCoords({ lat, lng: lon });
        requestAnimationFrame(() => manualInputRef.current?.focus());
        return;
      }
    }

    sessionStorage.setItem("manual-city", value);
    setCoords(null);
    requestAnimationFrame(() => manualInputRef.current?.focus());
  }

  const showInstructions = geoResolved && permissionState === "denied";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-white/3 to-white/2 backdrop-blur p-5 sm:p-8 border border-white/6"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold">Skylytics 🌤</h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/70">
          Feel the weather before you step out
        </p>

        <div className="mt-6">
          {!geoResolved && (
            <button
              onClick={onCheckWeather}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 font-semibold"
            >
              Check Weather
            </button>
          )}

          <motion.div layout className="">
            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  key="instructions"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden rounded-xl bg-gradient-to-b from-white/3 to-white/2 border border-red-400/10"
                >
                  <div className="p-4">
                    <p className="font-semibold mb-3">Enable Location Access</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/5 p-3 rounded-md">
                        <p className="font-medium">Mobile Chrome</p>
                        <p className="text-xs text-white/60">
                          Lock → Site settings → Location → Allow
                        </p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-md">
                        <p className="font-medium">Desktop Chrome</p>
                        <p className="text-xs text-white/60">
                          Lock → Permissions → Location → Allow
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {geoResolved && <WeatherDetails lat={coords?.lat} lng={coords?.lng} />}

            {geoResolved && (
              <div className="space-y-2">
                <input
                  ref={manualInputRef}
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleManualLocation()}
                  placeholder="City / Country or lat,lon"
                  className="w-full px-3 py-2 rounded-lg bg-white/3 text-sm sm:text-base mt-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleManualLocation}
                  className="w-full py-2.5 rounded-lg bg-blue-500 font-medium"
                >
                  Search
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
