import React from 'react';
import { Code, Server, Database, Eye, Terminal, Cpu } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Backend & Web APIs",
      icon: <Server size={20} />,
      skills: ["Node.js", "Express.js", "REST API Design", "JavaScript (ES6+)", "Python", "JSON / JWT"]
    },
    {
      title: "Databases & Storage",
      icon: <Database size={20} />,
      skills: ["MongoDB", "MySQL", "Mongoose ORM", "DBMS Concepts", "Data Modeling", "Aggregation Pipelines"]
    },
    {
      title: "Computer Vision & ML",
      icon: <Eye size={20} />,
      skills: ["YOLOv11", "OpenCV", "Roboflow Annotation", "MOG2 Background Subtraction", "NumPy", "PyTorch Inference"]
    },
    {
      title: "DSA & Core CS",
      icon: <Cpu size={20} />,
      skills: ["Arrays & Strings", "HashMaps & Sets", "Two Pointers", "Sliding Window", "Searching & Sorting", "OOP Concepts"]
    },
    {
      title: "Developer Tools",
      icon: <Terminal size={20} />,
      skills: ["Git & GitHub", "Postman", "VS Code", "Raspberry Pi", "Linux Shell", "Roboflow Active Learning"]
    },
    {
      title: "Frontend & Full Stack",
      icon: <Code size={20} />,
      skills: ["React.js", "HTML5 & CSS3", "Modern Glassmorphism", "Canvas API", "Async/Fetch API", "Vite"]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Technical Arsenal</div>
          <h2 className="section-title">Skills & <span className="gradient-text">Tech Stack</span></h2>
          <p className="section-desc">
            Equipped with modern full-stack development, database engineering, and machine vision technologies.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-category-card glass-panel">
              <h3 className="category-title">
                {cat.icon} {cat.title}
              </h3>
              <div className="skills-tags">
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
