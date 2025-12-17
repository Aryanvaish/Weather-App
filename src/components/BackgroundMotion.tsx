"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMotion() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

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
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
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
          left: "8%",
          top: "6%",
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
