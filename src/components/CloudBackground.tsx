import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CloudBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cloudCount = 20;
    const clouds = Array.from({ length: cloudCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 50 + 50,
      speed: Math.random() * 0.3 + 0.2,
      opacity: 0, // start hidden
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clouds.forEach(cloud => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          10,
          cloud.x,
          cloud.y,
          cloud.size
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${cloud.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
        ctx.fill();

        cloud.x += cloud.speed;
        if (cloud.x - cloud.size > canvas.width) {
          cloud.x = -cloud.size;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    // Animate cloud opacity on scroll
    clouds.forEach((cloud, i) => {
      gsap.to(cloud, {
        opacity: Math.random() * 0.2 + 0.1,
        scrollTrigger: {
          trigger: canvas,
          start: 'top center+=100',
          end: 'bottom top',
          scrub: 1,
        },
        delay: i * 0.05,
        duration: 1.5,
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

export default CloudBackground;