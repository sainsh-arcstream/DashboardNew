import React, { useRef, useEffect } from "react";
import "./Main.css";
import { Outlet } from "react-router-dom";
import SideNav from "../../Components/SideNav/SideNav";
import BottomNav from "../../Components/BottomNav/BottomNav";
function Main() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Sophisticated color palette matching the image
    const colors = [
      "rgba(139, 92, 246, 0.6)", // Purple
      "rgba(236, 72, 153, 0.5)", // Pink
      "rgba(59, 130, 246, 0.4)", // Blue
      "rgba(167, 139, 250, 0.7)", // Light purple
      "rgba(196, 181, 253, 0.3)", // Very light purple
    ];

    // Enhanced particle class with glow effects
  class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 40 + 40;
    this.originalSize = this.size;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = Math.random() * 0.8 + 0.2;
    this.pulse = Math.random() * 0.02 + 0.01;
    this.angle = Math.random() * Math.PI * 2;
    this.waveAmplitude = Math.random() * 3 ;   // how "blobby" the wave is
    this.waveFrequency = Math.random() * 3 ;   // number of waves around blob
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.pulse;

    // Pulsing effect
    this.size = this.originalSize + Math.sin(this.angle) * 2;

    // Bounce on boundaries
    if (this.x - this.size < 0 || this.x + this.size > canvas.width) {
      this.speedX = -this.speedX;
    }
    if (this.y - this.size < 0 || this.y + this.size > canvas.height) {
      this.speedY = -this.speedY;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    // Glow effect
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * 3
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fill();

    // === Blob Shape (inner core with wave) ===
    ctx.fillStyle = this.color;
    
    ctx.beginPath();
    const steps = 100; // smoothness
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      // radius modulated with sine wave
      const r =
        this.size +
        Math.sin(theta * this.waveFrequency + this.angle) *
          this.waveAmplitude;

      const px = this.x + r * Math.cos(theta);
      const py = this.y + r * Math.sin(theta);

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}


    // Create particles and orbs
    const particles = [];
    const orbs = [];
    const numParticles = 15 

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      // Create trailing effect instead of complete clear
      ctx.fillStyle = "rgba(11, 10, 20, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw orbs first (background layer)
      orbs.forEach((orb) => {
        orb.update();
        orb.draw();
      });

      // Draw particles on top
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Add subtle connections between nearby particles
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <canvas ref={canvasRef} id="canvas" />
      <div className="glass-card"></div>
      {/* Your content goes here */}
      <div className="outlet">
        <SideNav />
        <Outlet />
        {/* <BottomNav /> */}
      </div>
    </div>
  );
}

export default Main;
