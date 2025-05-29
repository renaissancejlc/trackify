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

    const shootingStars: {
      x: number;
      y: number;
      length: number;
      speed: number;
      active: boolean;
      life: number;
    }[] = Array.from({ length: 3 }, () => ({
      x: 0,
      y: 0,
      length: 200,
      speed: 8,
      active: false,
      life: 0,
    }));

    const triggerShootingStar = () => {
      const star = shootingStars.find(s => !s.active);
      if (star) {
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height * 0.5;
        star.length = 150 + Math.random() * 100;
        star.speed = 6 + Math.random() * 4;
        star.life = 0;
        star.active = true;
      }
    };

    setInterval(triggerShootingStar, 5000);

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

      shootingStars.forEach(star => {
        if (star.active) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.length, star.y + star.length);
          ctx.stroke();

          star.x += star.speed;
          star.y -= star.speed;
          star.life += 1;

          if (star.life > 60) {
            star.active = false;
          }
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