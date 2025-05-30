

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Pet-themed emojis: dogs, cats, birds, lizards, toys, etc.
const petEmojis = ['🐶', '🐱', '🦜', '🦎', '🦴', '🎾', '🐾'];

const PetBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Set initial canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Number of floating elements
    const emojiCount = 40;
    // Generate randomized pet elements
    const elements = Array.from({ length: emojiCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.3 + Math.random() * 0.5,
      floatOffset: Math.random() * 20,
      floatDirection: Math.random() < 0.5 ? 1 : -1,
      emoji: petEmojis[Math.floor(Math.random() * petEmojis.length)],
      size: 22 + Math.random() * 14,
      opacity: 0,
    }));

    // Animate opacity with scroll-triggered twinkle
    elements.forEach((el, i) => {
      gsap.to(el, {
        opacity: Math.random() * 0.6 + 0.3,
        scrollTrigger: {
          trigger: canvas,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        delay: i * 0.02,
        duration: 2,
        ease: 'power1.inOut',
      });
    });

    // Draw and animate floating elements
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      elements.forEach(el => {
        ctx.globalAlpha = el.opacity;
        ctx.font = `${el.size}px sans-serif`;
        ctx.fillText(el.emoji, el.x, el.y + Math.sin(el.floatOffset) * 5);
        ctx.globalAlpha = 1;

        // Gentle floating/bouncing animation
        el.floatOffset += el.speed * el.floatDirection;
        el.y += 0.05 * el.floatDirection;

        // Loop elements vertically
        if (el.y > canvas.height + 30) el.y = -30;
        if (el.y < -30) el.y = canvas.height + 30;
      });

      requestAnimationFrame(draw);
    };

    draw();

    // Responsive resizing
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

export default PetBackground;