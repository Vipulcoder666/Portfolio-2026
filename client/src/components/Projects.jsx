import React, { useState, useEffect } from 'react';
import { ExternalLink, Code2, Eye, Sparkles, X, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.projects);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Computer Vision & ML', 'Computer Vision & Embedded ML', 'Full Stack & Web Automation', 'Computer Vision & Full-Stack'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Featured Portfolio</div>
          <h2 className="section-title">Production <span className="gradient-text">Projects</span></h2>
          <p className="section-desc">
            Explore industrial computer vision deployments, automated software solutions, and full-stack web platforms built for enterprise clients.
          </p>
        </div>

        <div className="filter-bar">
          {['All', 'Computer Vision & ML', 'Full Stack & Web Automation'].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((proj) => (
            <div key={proj.id} className="project-card glass-panel">
              <div className="project-img-wrapper">
                <img src={proj.image} alt={proj.title} />
                <div className="project-overlay">{proj.category}</div>
              </div>

              <div className="project-body">
                <div className="project-client">{proj.client}</div>
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.description}</p>

                <div className="project-tech">
                  {proj.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span key={tIdx} className="tech-pill">{tech}</span>
                  ))}
                  {proj.technologies.length > 4 && (
                    <span className="tech-pill">+{proj.technologies.length - 4} more</span>
                  )}
                </div>

                <div className="project-actions">
                  <button 
                    onClick={() => setSelectedProject(proj)} 
                    className="btn-primary" 
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '8px 16px' }}
                  >
                    <Eye size={16} /> View Details & Metrics
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <X size={20} />
            </button>

            <div style={{ marginBottom: '20px' }}>
              <span className="section-tag" style={{ fontSize: '0.75rem' }}>{selectedProject.client}</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, marginTop: '8px', marginBottom: '8px' }}>
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{selectedProject.description}</p>
            </div>

            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '280px', marginBottom: '24px' }}>
              <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-cyan)' }}>
              Engineering Highlights & Results
            </h3>
            <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
              {selectedProject.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)' }}>
              Technologies Employed
            </h3>
            <div className="skills-tags" style={{ marginBottom: '24px' }}>
              {selectedProject.technologies.map((t, idx) => (
                <span key={idx} className="skill-tag">{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://github.com/Vipulcoder666" target="_blank" rel="noreferrer" className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                <Code2 size={18} /> GitHub Repository
              </a>
              <a href="#contact" onClick={() => setSelectedProject(null)} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                Inquire Similar Solution
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
