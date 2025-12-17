import BackgroundMotion from "@/components/BackgroundMotion";
import Intro from "@/components/intro";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <>
    <BackgroundMotion />
      <Intro />
      <Analytics />
    </>
  );
}
