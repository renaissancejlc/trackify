

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TarotBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const starCount = 100;
    const stars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      opacity: 0,
      twinkleSpeed: Math.random() * 0.05 + 0.01,
    }));

    const draw = () => {
      ctx.fillStyle = "#0d021a"; // deep mystical purple background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // subtle twinkle
        star.opacity += star.twinkleSpeed;
        if (star.opacity >= 1 || star.opacity <= 0) {
          star.twinkleSpeed *= -1;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    stars.forEach((star, i) => {
      gsap.to(star, {
        opacity: Math.random() * 0.6 + 0.2,
        scrollTrigger: {
          trigger: canvas,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        delay: i * 0.01,
        duration: 2,
        ease: 'power1.inOut',
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

export default TarotBackground;