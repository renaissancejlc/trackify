

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bubbleCount = 35;
    const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 20 + 20,
      hue: 125 + Math.random() * 50, // greenish Spotify hue
      opacity: 0,
      speedX: Math.random() * 0.3 - 0.15,
      speedY: Math.random() * 0.2 + 0.05,
    }));

    const draw = () => {
      ctx.fillStyle = "#f8fbf9"; // light cloudy background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach(bubble => {
        const gradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, `hsla(${bubble.hue}, 70%, 60%, ${bubble.opacity})`);
        gradient.addColorStop(1, `hsla(${bubble.hue}, 70%, 60%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        bubble.x += bubble.speedX;
        bubble.y -= bubble.speedY;

        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    bubbles.forEach((bubble, i) => {
      gsap.to(bubble, {
        opacity: Math.random() * 0.3 + 0.1,
        scrollTrigger: {
          trigger: canvas,
          start: 'top center',
          end: 'bottom top',
          scrub: 1,
        },
        delay: i * 0.05,
        duration: 2,
        ease: 'power2.out',
      });
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default HomeBackground;