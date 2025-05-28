import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 40;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 12 + 6,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 0.4 + 0.2,
      opacity: 0,
      hue: Math.random() < 0.5 ? 90 + Math.random() * 40 : 20 + Math.random() * 20, // green or brown
    }));

    const draw = () => {
      // Sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGradient.addColorStop(0, "#b3e5fc"); // light blue sky
      skyGradient.addColorStop(0.6, "#fdf8ef"); // fade to ground color
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        const xOffset = Math.cos(p.angle) * p.size;
        const yOffset = Math.sin(p.angle) * p.size;

        const gradient = ctx.createRadialGradient(
          p.x + xOffset,
          p.y + yOffset,
          0,
          p.x,
          p.y,
          p.size
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 70%, 60%, ${p.opacity})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 70%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.angle += 0.005;
        p.x += p.speed * 0.5;
        p.y += Math.cos(p.angle) * 0.25;

        if (p.x > canvas.width + p.size) {
          p.x = -p.size;
          p.y = Math.random() * canvas.height;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    particles.forEach((p, i) => {
      gsap.to(p, {
        opacity: Math.random() * 0.4 + 0.2,
        scrollTrigger: {
          trigger: canvas,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        delay: i * 0.02,
        duration: 2,
        ease: 'sine.inOut',
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

export default AnimalBackground;