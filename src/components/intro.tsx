"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function WeatherIntro() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null);
  const [hasDeclined, setHasDeclined] = useState(false);
  const [manualLocation, setManualLocation] = useState("");
  const manualInputRef = useRef<HTMLInputElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!navigator.permissions) return;
    let mounted = true;
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (!mounted) return;
      setPermissionState(result.state);

      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setHasDeclined(false);
            console.log("granted");
          },
          () => {}
        );
      }

      result.onchange = () => {
        setPermissionState(result.state);
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition((pos) => {
            setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setHasDeclined(false);
            console.log("granted");
          });
        }
      };
    });

    return () => {
      mounted = false;
    };
  }, []);

  function onCheckWeather() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setHasDeclined(false);
      },
      () => {
        setCoords(null);
        setHasDeclined(true);
      }
    );
  }

  function openManualInput() {
    const el = document.getElementById("manual-location-input");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => manualInputRef.current?.focus(), 120);
  }

  function useManualLocation() {
    const val = manualLocation.trim();
    if (!val) {
      alert("Enter a location or coordinates.");
      return;
    }
    if (val.includes(",")) {
      const [a, b] = val.split(",").map((s) => parseFloat(s.trim()));
      if (!isNaN(a) && !isNaN(b)) {
        setCoords({ lat: a, lng: b });
        setHasDeclined(false);
        return;
      }
    }
    alert("Manual city input is not geocoded yet. Use coordinates 'lat,lon' or add geocoding later.");
  }

  function handlePointerMove(e: React.PointerEvent) {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setPointer({ x, y });
  }

  const hideButton = hasDeclined || permissionState === "denied" || coords !== null;
  const showInstructions = (hasDeclined || permissionState === "denied") && permissionState !== "granted";

  return (
    <div
      ref={rootRef}
      onPointerMove={handlePointerMove}
      className="relative flex items-center justify-center min-h-screen text-white px-6 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ mixBlendMode: "screen" }}>
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            filter: "blur(60px)",
            background:
              "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.25), rgba(59,130,246,0.05) 40%, transparent 60%)",
            transform: `translate3d(${(pointer.x - 0.5) * 40}px, ${(pointer.y - 0.5) * 40}px, 0)`,
            left: "8%",
            top: "4%",
            transition: "transform 0.12s linear",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            filter: "blur(90px)",
            background:
              "radial-gradient(circle at 70% 70%, rgba(99,102,241,0.18), rgba(99,102,241,0.03) 45%, transparent 70%)",
            transform: `translate3d(${(pointer.x - 0.5) * -40}px, ${(pointer.y - 0.5) * -30}px, 0)`,
            right: "-6%",
            bottom: "-12%",
            transition: "transform 0.12s linear",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-white/3 to-white/2 backdrop-blur-[6px] shadow-2xl border border-white/6 p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Skylytics <span className="inline-block ml-2 text-yellow-300">🌤</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-3 text-white/70 text-sm sm:text-base max-w-lg">
              Feel the weather before you step out — smart · sleek · real-time
            </motion.p>
          </div>
        </div>

        <div className="mt-6">
          {!hideButton && (
            <motion.button
              onClick={onCheckWeather}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
              aria-label="Check Weather"
            >
              Check Weather
            </motion.button>
          )}

          <AnimatePresence>
            {showInstructions && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }} className="mt-5 p-4 rounded-xl bg-gradient-to-b from-white/3 to-white/2 border border-red-400/10 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-7 h-7 text-red-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 9v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div>
                    <p className="font-semibold text-white">Enable Location Access</p>
                    <p className="text-sm text-white/75 mt-1">Allow location access in your browser to get precise weather for your area.</p>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/3 p-3 rounded-md">
                        <div className="font-medium text-white/90">Mobile Chrome</div>
                        <div className="text-white/60 text-xs mt-1">Tap the lock icon → Site settings → Location → Allow</div>
                      </div>
                      <div className="bg-white/3 p-3 rounded-md">
                        <div className="font-medium text-white/90">Desktop Chrome</div>
                        <div className="text-white/60 text-xs mt-1">Click the lock icon → Permissions → Location → Allow</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <button onClick={() => alert("Open your browser site settings (click the lock icon) and enable Location for this site.")} className="text-xs px-3 py-1 rounded-md bg-white/5 hover:bg-white/6 transition">
                        How to enable
                      </button>

                      <button onClick={openManualInput} className="text-xs px-3 py-1 rounded-md bg-white/5 hover:bg-white/6 transition">
                        Enter location manually
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {coords && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }} className="mt-5 p-4 rounded-xl bg-white/4 border border-white/6 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-white/80" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2C8 6 5 9.5 5 13a7 7 0 0 0 14 0c0-3.5-3-7-7-11z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="2.2" fill="currentColor" />
                  </svg>

                  <div>
                    <div className="text-sm text-white/90 font-medium">Location detected</div>
                    <div className="text-xs text-white/60">{coords.lat.toFixed(4)} · {coords.lng.toFixed(4)}</div>
                  </div>
                </div>

                <div className="text-xs text-white/60">Permissions: {permissionState ?? "unknown"}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <div id="manual-location-input" className="mt-5">
            <label className="block text-xs text-white/70 mb-2">Manual location (city or &quot;lat,lon&quot;)</label>
            <div className="flex gap-2">
              <input
                ref={manualInputRef}
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                placeholder="e.g., New Delhi or 28.6238,77.3083"
                className="flex-1 px-3 py-2 rounded-lg bg-white/3 placeholder:text-white/50 focus:outline-none"
              />
              <button onClick={useManualLocation} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium">
                Use
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
