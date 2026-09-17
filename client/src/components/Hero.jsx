import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, Award, ShieldCheck, Cpu, Terminal, Zap } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [punchlineIndex, setPunchlineIndex] = useState(0);

  const roles = [
    "Software Engineer",
    "Full-Stack MERN Specialist",
    "Computer Vision & ML Developer",
    "Python & REST API Specialist"
  ];

  const punchlines = [
    "I can automate anything.",
    "Kuch bhi automate kar dunga."
  ];

  // Role rotator
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Punchline Rotator (English <-> Hinglish)
  useEffect(() => {
    const timer = setInterval(() => {
      setPunchlineIndex((prev) => (prev + 1) % punchlines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // HTML5 Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 18), 70);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#00f2fe' : '#7f00ff'
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particle links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${1 - dist / 130 * 0.85})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="container hero-content">
        <div>
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span>Available for Software Engineering Roles & Freelance Work</span>
          </div>

          <h1 className="hero-name">
            Hi, I'm <br />
            <span className="gradient-text">Vipul Shrivastav</span>
          </h1>

          <div className="hero-subtitle">
            <span style={{ color: 'var(--accent-cyan)' }}>I am a </span>
            <span className="gradient-text-alt">{roles[roleIndex]}</span>
          </div>

          {/* Dynamic Punchline Rotator (English <-> Hinglish) */}
          <div className="automate-punchline-card glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} className="gradient-text" />
              <span className="punchline-label">AUTOMATION PHILOSOPHY:</span>
            </div>
            <div className="punchline-text-wrapper">
              <span className="punchline-quote">"{punchlines[punchlineIndex]}"</span>
              <span className="blinking-cursor">|</span>
            </div>
          </div>

          <p className="hero-bio">
            Software Engineer skilled in building production-grade MERN web applications, REST APIs, and industrial Computer Vision systems (YOLOv11, OpenCV). Delivered high-precision detection & counting pipelines deployed for enterprise automotive manufacturing and quick-commerce clients.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Featured Work <ArrowRight size={18} />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-secondary">
              <Download size={18} /> Download Resume
            </a>
          </div>
        </div>

        <div className="hero-card glass-panel">
          <div className="hero-card-header">
            <div className="avatar">
              <div className="avatar-placeholder">VS</div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Vipul Shrivastav</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Software Engineer @ SmarDen Automation</p>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontFamily: 'var(--font-code)', marginTop: '2px' }}>New Delhi, India</p>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-val">91.9%</div>
              <div className="metric-lbl">mAP (Industrial CV)</div>
            </div>
            <div className="metric-item">
              <div className="metric-val">99%</div>
              <div className="metric-lbl">Model Precision</div>
            </div>
            <div className="metric-item">
              <div className="metric-val">100+</div>
              <div className="metric-lbl">LeetCode Solved</div>
            </div>
            <div className="metric-item">
              <div className="metric-val">5★</div>
              <div className="metric-lbl">HackerRank Badge</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
