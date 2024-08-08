"use client"

import React, { useEffect, useRef } from 'react';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const points: { x: number; y: number; vx: number; vy: number }[] = [];
    const numPoints = 100;
    const maxDistance = 100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate points
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#c9c6c6b5';
      points.forEach(point => {
        // Update point position
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x <= 0 || point.x >= canvas.width) point.vx *= -1;
        if (point.y <= 0 || point.y >= canvas.height) point.vy *= -1;

        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 1.5);
        ctx.fill();
      });

      // Draw lines
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          if (dist < maxDistance) {
            ctx.strokeStyle = `rgba(0, 0, 0, ${1 - dist / maxDistance})`;
            ctx.lineWidth = 0.2; // Further adjust line width
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach(point => {
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 1);
        ctx.fill();
      });

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          if (dist < maxDistance) {
            ctx.strokeStyle = `rgba(0, 0, 0, ${1 - dist / maxDistance})`;
            ctx.lineWidth = 0.2; // Further adjust line width
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      points.forEach(point => {
        const dist = Math.hypot(point.x - mouseX, point.y - mouseY);
        if (dist < maxDistance) {
          ctx.strokeStyle = `rgba(255, 0, 0, ${1 - dist / maxDistance})`;
          ctx.lineWidth = 0.2; // Further adjust line width
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

export default BackgroundCanvas;