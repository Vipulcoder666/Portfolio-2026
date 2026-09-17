import React from 'react';
import { Terminal, Briefcase, Code, User, Send, DollarSign } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar glass-panel">
      <a href="#hero" className="nav-brand">
        <div className="brand-icon">VS</div>
        <span>Vipul<span className="gradient-text">.dev</span></span>
      </a>

      <ul className="nav-links">
        <li><a href="#about" className="nav-link"><User size={16} /> About</a></li>
        <li><a href="#experience" className="nav-link"><Briefcase size={16} /> Experience</a></li>
        <li><a href="#skills" className="nav-link"><Terminal size={16} /> Skills</a></li>
        <li><a href="#projects" className="nav-link"><Code size={16} /> Projects</a></li>
        <li><a href="#freelance" className="nav-link"><DollarSign size={16} /> Freelance</a></li>
      </ul>

      <a href="#contact" className="btn-primary">
        <Send size={16} /> Hire Me
      </a>
    </nav>
  );
}
