"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WeatherIntro() {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [permissionState, setPermissionState] = useState<PermissionState | null>(null);
    const [hasDeclined, setHasDeclined] = useState(false);

    useEffect(() => {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
            setPermissionState(result.state);

            result.onchange = () => {
                setPermissionState(result.state);

                if (result.state === "granted") {
                    navigator.geolocation.getCurrentPosition((pos) => {
                        setCoords({
                            lat: pos.coords.latitude,
                            lng: pos.coords.longitude,
                        });
                        setHasDeclined(false);
                    });
                }
            };
        });
    }, []);

    function onCheckWeather() {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setHasDeclined(false);
            },
            () => {
                setCoords(null);
                setHasDeclined(true);
            }
        );
    }

    const hideButton =
        hasDeclined || permissionState === "denied" || coords !== null;

    const showInstructions =
        hasDeclined || permissionState === "denied";

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#0f1629] text-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-lg rounded-2xl bg-white/5 backdrop-blur-2xl shadow-xl border border-white/10 text-center p-10"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-5xl font-bold mb-5 tracking-tight"
                >
                    Skylytics 🌤
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="text-white/70 text-lg mb-10 leading-relaxed"
                >
                    Feel the weather before you step out <br /> smart • sleek • real-time
                </motion.p>

                {!hideButton && (
                    <motion.button
                        onClick={onCheckWeather}
                        whileTap={{ scale: 0.94 }}
                        whileHover={{ scale: 1.04 }}
                        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300 cursor-pointer"
                    >
                        Check Weather
                    </motion.button>
                )}

                <AnimatePresence>
                    {showInstructions && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.4 }}
                            className="mt-6 p-5 rounded-xl bg-white/5 backdrop-blur-xl border border-red-300/20 shadow-lg"
                        >
                            <p className="text-white font-semibold mb-1 text-lg">
                                Enable Location Access
                            </p>

                            <p className="text-white text-sm mb-5">
                                Follow these steps to enable location:
                            </p>

                            <p className="text-white text-sm mb-3">
                                <strong className="mb-1 block">Mobile Chrome:</strong>
                                Tap the lock icon → Site settings → Location → Allow
                            </p>

                            <p className="text-white text-sm">
                                <strong className="mb-1 block">Desktop Chrome:</strong>
                                Click the lock icon → Permissions → Location → Allow
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {coords && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4 }}
                            className="mt-6 text-white/60 text-sm"
                        >
                            {coords.lat.toFixed(4)} • {coords.lng.toFixed(4)}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
