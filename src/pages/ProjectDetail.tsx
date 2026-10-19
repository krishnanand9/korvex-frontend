import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, ExternalLink, ShieldCheck, Terminal, Layers } from "lucide-react";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = projectsData.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="project-not-found-wrap">
        <h2>Case Study Not Found</h2>
        <p>The requested project could not be found or may have been updated.</p>
        <Link to="/portfolio" className="btn">
          <ArrowLeft size={16} /> Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Back Navigation Bar */}
      <div className="detail-top-nav">
        <Link to="/portfolio" className="back-link">
          <ArrowLeft size={16} /> Back to All Projects
        </Link>
        <span className="detail-status-badge">
          Status: <strong className={project.status.toLowerCase().replace(/\s+/g, "-")}>{project.status}</strong>
        </span>
      </div>

      {/* Case Study Hero */}
      <header className="case-study-hero">
        <div className="eyebrow-badge">{project.category} Engineering Case Study</div>
        <h1>{project.name}</h1>
        <p className="case-hero-desc">{project.fullDescription}</p>

        <div className="case-study-meta-bar">
          <div className="meta-cell">
            <span className="meta-label">Category</span>
            <span className="meta-value">{project.category}</span>
          </div>
          <div className="meta-cell">
            <span className="meta-label">Delivery Status</span>
            <span className="meta-value">{project.status}</span>
          </div>
          <div className="meta-cell">
            <span className="meta-label">Core Tech</span>
            <span className="meta-value">{project.stack.slice(0, 3).join(", ")}</span>
          </div>
          {project.liveUrl && (
            <div className="meta-cell">
              <span className="meta-label">Verified Link</span>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="live-link">
                Live App <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Case Study Sections */}
      <div className="case-study-body">
        {/* Problem and Solution */}
        <section className="case-study-section split">
          <div className="case-card problem">
            <h3>The Problem Statement</h3>
            <p>{project.problem}</p>
          </div>
          <div className="case-card solution">
            <h3>The Architectural Solution</h3>
            <p>{project.solution}</p>
          </div>
        </section>

        {/* Technical Architecture Overview */}
        <section className="case-study-section">
          <div className="case-card architecture">
            <div className="card-header-icon">
              <Cpu size={22} />
              <h3>System Architecture & Topology</h3>
            </div>
            <p className="arch-text">{project.architectureOverview}</p>

            <div className="tech-stack-block">
              <h4>Technology Stack & Libraries</h4>
              <div className="tags-row">
                {project.stack.map(tech => (
                  <span key={tech} className="stack-pill">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features & Capabilities */}
        <section className="case-study-section">
          <div className="case-card features">
            <h3>Key Features & Implemented Capabilities</h3>
            <ul className="features-checklist">
              {project.features.map((feat, i) => (
                <li key={i}>
                  <CheckCircle2 size={18} className="feat-check" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Engineering Challenges & Decisions */}
        <section className="case-study-section">
          <div className="case-card challenges">
            <h3>Key Engineering Challenges & Decisions</h3>
            <p>{project.challenges}</p>
          </div>
        </section>

        {/* Metrics if present */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="case-study-section">
            <div className="case-card metrics">
              <h3>Verified Benchmark Results</h3>
              <ul className="metrics-list">
                {project.metrics.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Bottom CTA for Similar Project */}
        <section className="case-study-cta-box">
          <div className="cta-box-content">
            <h3>Looking to build a system like {project.name}?</h3>
            <p>
              Our senior engineering team can tailor a similar architecture to your business requirements,
              whether you need high-scale full-stack development or grounded AI.
            </p>
            <div className="cta-box-actions">
              <Link
                to="/contact"
                state={{
                  category: project.category === "AI" ? "AI assistant / LLM" : "Custom web application",
                  description: `I am interested in architecting a system with capabilities similar to ${project.name} (${project.stack.join(", ")}).`,
                }}
                className="btn"
              >
                Discuss a Similar Project <ArrowRight size={16} />
              </Link>
              <Link to="/estimator" className="btn ghost">
                Scope with Project Estimator
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
