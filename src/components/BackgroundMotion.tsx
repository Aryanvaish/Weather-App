"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMotion() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

  const timeRef = useRef(0);
  const [, forceRender] = useState(0);

  function handlePointerMove(e: React.PointerEvent) {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;

    target.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }

  useEffect(() => {
    let raf: number;

    const animate = () => {
      timeRef.current += 0.003;

      const driftX = Math.sin(timeRef.current) * 0.06;
      const driftY = Math.cos(timeRef.current * 0.8) * 0.06;

      current.current.x += (target.current.x + driftX - current.current.x) * 0.05;
      current.current.y += (target.current.y + driftY - current.current.y) * 0.05;

      forceRender((v) => v + 1);
      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  const x = current.current.x - 0.5;
  const y = current.current.y - 0.5;

  return (
    <div
      ref={rootRef}
      onPointerMove={handlePointerMove}
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <div
        style={{
          position: "absolute",
          width: 460,
          height: 460,
          borderRadius: "50%",
          filter: "blur(70px)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.35), rgba(59,130,246,0.05) 55%, transparent 70%)",
          transform: `translate3d(${x * 160}px, ${y * 160}px, 0) scale(1.05)`,
          left: "4%",
          top: "3%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          filter: "blur(100px)",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.28), rgba(99,102,241,0.04) 60%, transparent 75%)",
          transform: `translate3d(${x * -200}px, ${y * -140}px, 0) scale(1.1)`,
          right: "-8%",
          bottom: "-12%",
        }}
      />
    </div>
  );
}
