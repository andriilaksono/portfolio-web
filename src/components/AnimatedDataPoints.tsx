import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DataPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

export const AnimatedDataPoints = () => {
  const [points, setPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(187, 38%, 49%)",  // cyan
      "hsl(38, 70%, 55%)",   // amber
      "hsl(260, 30%, 45%)",  // purple
      "hsl(160, 35%, 45%)",  // green
    ];

    const generated = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
    }));

    setPoints(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {points.map((point) => (
        <motion.div
          key={point.id}
          className="absolute rounded-full data-point"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: point.size,
            height: point.size,
            backgroundColor: point.color,
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 10, -15, 0],
            opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            delay: point.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Connecting lines SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 38%, 49%)" />
            <stop offset="100%" stopColor="hsl(160, 35%, 45%)" />
          </linearGradient>
        </defs>
        {points.slice(0, 10).map((point, i) => {
          const nextPoint = points[(i + 1) % 10];
          if (!nextPoint) return null;
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${point.x}%`}
              y1={`${point.y}%`}
              x2={`${nextPoint.x}%`}
              y2={`${nextPoint.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};
