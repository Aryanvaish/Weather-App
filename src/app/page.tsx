import Intro from "@/components/intro";
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <>
      <Intro />
      <Analytics />
    </>
  );
}
