# 🌤 Skylytics

Skylytics is a modern and interactive weather web app built using **Next.js**, **React**, and **Tailwind CSS**.  
It provides real-time weather updates using device geolocation or manual search, wrapped in a clean, responsive UI with smooth motion effects.

---

## 🚀 Features

📍 **Auto Location Detection** – Automatically fetches weather using device location.  
🔍 **Manual Search** – Search weather by city, country, or latitude/longitude.  
🌡 **Live Weather Data** – View accurate and up-to-date weather information including:
- Temperature  
- Feels like  
- Humidity  
- Wind speed  
- Cloud coverage  
- Sunrise & Sunset  
- Visibility  
- Min / Max temperature  

📱 **Fully Responsive UI** – Optimized for mobile, tablet, and desktop devices.  
⚡ **Optimized API Calls** – Prevents duplicate requests for better performance.

---

## 🛠️ Tech Stack

- **Next.js (App Router)** – Application framework  
- **React** – UI rendering  
- **TypeScript** – Type safety  
- **Tailwind CSS** – Styling and responsiveness  
- **Framer Motion** – Animations and transitions  
- **OpenWeather API** – Weather data source  

---

## 🧩 How It Works

1. On page load, Skylytics checks browser geolocation permission.  
2. If permission is granted, weather data is fetched using latitude and longitude.  
3. If permission is denied, clear instructions are shown and manual search is enabled.  
4. Weather data is fetched from the OpenWeather API.  
5. The UI updates instantly with smooth transitions and responsive layouts.

---

## 🌐 Live Demo

Check out the live app here: [Skylytics Live](https://aryanvaish-skylytics.vercel.app/)

