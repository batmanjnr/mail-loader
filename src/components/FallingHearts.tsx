import React, { useEffect, useState } from "react";

interface HeartItem {
  id: number;
  left: number; // percentage
  size: number; // pixels
  delay: number; // seconds (negative so they start pre-dispersed)
  duration: number; // seconds
  opacity: number;
  rotation: number;
  color: string;
  symbol: string;
  swayDistance: number; // horizontal sway drift
}

const SYMBOLS = ["❤️", "💖", "💝", "🌸", "💕", "✨"];
const COLORS = [
  "text-[#FF69B4]", // hot pink
  "text-[#FFB6C1]", // light pink
  "text-[#FFC0CB]", // pink
  "text-[#FF4500]/70", // warm orange-red
  "text-[#FF1493]", // deep pink
  "text-amber-400/60" // golden sparkle
];

export default function FallingHearts() {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  useEffect(() => {
    // Generate pre-calculated random values on the client to avoid SSR/hydration mismatch
    const generated: HeartItem[] = Array.from({ length: 36 }).map((_, i) => {
      const size = Math.floor(Math.random() * 16) + 12; // 12px to 28px
      const left = Math.random() * 100;
      const delay = Math.random() * -20; // negative delay so they are scattered instantly
      const duration = Math.random() * 8 + 10; // 10s to 18s for peaceful, smooth drift
      const opacity = Math.random() * 0.5 + 0.25; // 0.25 to 0.75
      const rotation = Math.random() * 360;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const swayDistance = Math.random() * 80 + 40; // 40px to 120px sway

      return {
        id: i,
        left,
        size,
        delay,
        duration,
        opacity,
        rotation,
        color,
        symbol,
        swayDistance
      };
    });
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {/* Dynamic Keyframes Injection */}
      <style>{`
        @keyframes fallAndSway {
          0% {
            transform: translateY(-10vh) translateX(0px) rotate(var(--init-rotation));
          }
          50% {
            transform: translateY(50vh) translateX(var(--sway-dist)) rotate(calc(var(--init-rotation) + 180deg));
          }
          100% {
            transform: translateY(110vh) translateX(0px) rotate(calc(var(--init-rotation) + 360deg));
          }
        }
        .falling-heart {
          will-change: transform;
          animation: fallAndSway var(--duration) linear infinite;
        }
      `}</style>

      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute falling-heart select-none ${heart.color}`}
          style={{
            left: `${heart.left}%`,
            top: "-5%",
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animationDelay: `${heart.delay}s`,
            // Set CSS custom properties for custom sway and duration
            ["--duration" as any]: `${heart.duration}s`,
            ["--sway-dist" as any]: `${heart.swayDistance}px`,
            ["--init-rotation" as any]: `${heart.rotation}deg`
          }}
        >
          {heart.symbol}
        </div>
      ))}
    </div>
  );
}
