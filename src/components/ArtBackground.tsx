import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ArtBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const strokeCount = 30;
    const strokes = Array.from({ length: strokeCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 60 + 40,
      hue: Math.floor(Math.random() * 360),
      opacity: 0,
      dx: Math.random() * 0.4 - 0.2,
      dy: Math.random() * 0.4 - 0.2,
    }));

    const draw = () => {
      ctx.fillStyle = "#fdfdfd"; // light canvas-like background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      strokes.forEach(stroke => {
        const gradient = ctx.createRadialGradient(
          stroke.x,
          stroke.y,
          10,
          stroke.x,
          stroke.y,
          stroke.size
        );
        gradient.addColorStop(0, `hsla(${stroke.hue}, 90%, 70%, ${stroke.opacity})`);
        gradient.addColorStop(1, `hsla(${stroke.hue}, 90%, 70%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(stroke.x, stroke.y, stroke.size, 0, Math.PI * 2);
        ctx.fill();

        stroke.x += stroke.dx;
        stroke.y += stroke.dy;

        // Wrap around edges
        if (stroke.x < -stroke.size) stroke.x = canvas.width + stroke.size;
        if (stroke.x > canvas.width + stroke.size) stroke.x = -stroke.size;
        if (stroke.y < -stroke.size) stroke.y = canvas.height + stroke.size;
        if (stroke.y > canvas.height + stroke.size) stroke.y = -stroke.size;
      });

      requestAnimationFrame(draw);
    };

    draw();

    // Animate stroke opacity with scroll
    strokes.forEach((stroke, i) => {
      gsap.to(stroke, {
        opacity: Math.random() * 0.4 + 0.2,
        scrollTrigger: {
          trigger: canvas,
          start: 'top center+=100',
          end: 'bottom top',
          scrub: 1,
        },
        delay: i * 0.03,
        duration: 1.5,
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

export default ArtBackground;
