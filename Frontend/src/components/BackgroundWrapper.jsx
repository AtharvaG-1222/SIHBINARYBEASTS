import React, { useEffect, useRef } from "react";

export default function BackgroundWrapper({ children }) {
  const particlesRef = useRef(null);

  // Floating leaf/particle effect (same as LandingPage)
  useEffect(() => {
    const canvas = particlesRef.current;
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const leaves = [];

    for (let i = 0; i < 40; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 10 + Math.random() * 20,
        speed: 0.2 + Math.random() * 0.5,
        angle: Math.random() * 2 * Math.PI,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      leaves.forEach((leaf) => {
        leaf.y += leaf.speed;
        leaf.x += Math.sin(leaf.angle) * 0.5;
        leaf.angle += 0.01;

        if (leaf.y > height) leaf.y = -leaf.size;
        if (leaf.x > width) leaf.x = 0;
        if (leaf.x < 0) leaf.x = width;

        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.beginPath();
        ctx.arc(leaf.x, leaf.y, leaf.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Same background as landing */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-75"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>

      {/* Floating particles */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 z-10 pointer-events-none"
      ></canvas>

      {/* Page Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
