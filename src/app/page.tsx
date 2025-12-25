import BackgroundMotion from "@/components/BackgroundMotion";
import WeatherIntro from "@/components/WeatherIntro";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <>
      <BackgroundMotion />
      <WeatherIntro />  
      <Analytics />
    </>
  );
}
