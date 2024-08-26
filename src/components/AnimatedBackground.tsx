'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  shape: 'circle' | 'bracket' | 'pen' | 'gear';
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    console.log('AnimatedBackground useEffect running');
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Unable to get 2D context');
      return;
    }
    console.log('Canvas context created successfully');

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: 0, y: 0 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 200);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 1 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          shape: ['circle', 'bracket', 'pen', 'gear'][Math.floor(Math.random() * 4)] as Particle['shape'],
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      switch (particle.shape) {
        case 'circle':
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          break;
        case 'bracket':
          ctx.moveTo(particle.x - particle.radius, particle.y - particle.radius);
          ctx.lineTo(particle.x + particle.radius, particle.y - particle.radius);
          ctx.lineTo(particle.x + particle.radius, particle.y + particle.radius);
          ctx.lineTo(particle.x - particle.radius, particle.y + particle.radius);
          break;
        case 'pen':
          ctx.moveTo(particle.x, particle.y - particle.radius);
          ctx.lineTo(particle.x + particle.radius, particle.y + particle.radius);
          ctx.lineTo(particle.x - particle.radius, particle.y + particle.radius);
          break;
        case 'gear':
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x1 = particle.x + Math.cos(angle) * particle.radius;
            const y1 = particle.y + Math.sin(angle) * particle.radius;
            const x2 = particle.x + Math.cos(angle) * (particle.radius * 1.5);
            const y2 = particle.y + Math.sin(angle) * (particle.radius * 1.5);
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          break;
      }
      // Adjust colors based on the theme
      if (theme === 'dark') {
        ctx.fillStyle = 'rgba(255, 195, 0, 0.3)'; // USMC Gold with 30% opacity for dark mode
      } else {
        ctx.fillStyle = 'rgba(204, 0, 0, 0.3)'; // USMC Scarlet with 30% opacity for light mode
      }
      ctx.fill();
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Adjust line colors based on the theme
            if (theme === 'dark') {
              ctx.strokeStyle = `rgba(255, 195, 0, ${0.2 - distance / 500})`; // USMC Gold with fading opacity for dark mode
            } else {
              ctx.strokeStyle = `rgba(204, 0, 0, ${0.2 - distance / 500})`; // USMC Scarlet with fading opacity for light mode
            }
            ctx.stroke();
          }
        }
      }
    };

    const updateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Repel from mouse
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          particle.vx += dx / distance * 0.1;
          particle.vy += dy / distance * 0.1;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      drawLines();
      particles.forEach(drawParticle);
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    resizeCanvas();
    console.log('Canvas resized');
    createParticles();
    console.log('Particles created:', particles.length);
    animate();
    console.log('Animation started');

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Add theme as a dependency

  return (
    <div className="fixed inset-0 z-0">
      <canvas ref={canvasRef} className="w-full h-full opacity-70" />
    </div>
  );
};

export default AnimatedBackground;