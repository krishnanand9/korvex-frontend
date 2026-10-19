import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { Project, ProjectCategory } from "../types";
import { Search, Filter, ArrowRight, ExternalLink, Code2, Layers, Cpu, ShieldCheck } from "lucide-react";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "AI", "Software"];

  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      project.name.toLowerCase().includes(q) ||
      project.blurb.toLowerCase().includes(q) ||
      project.stack.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="portfolio-page">
      {/* Portfolio Header */}
      <section className="page-hero-header">
        <div className="eyebrow-badge">Verified Engineering</div>
        <h1>Engineered Solutions & Case Studies</h1>
        <p className="page-hero-desc">
          Explore our real internal prototypes, live community applications, and active client software systems.
          Every project is transparently labeled by its current delivery status.
        </p>

        {/* Filter and Search Bar */}
        <div className="portfolio-controls-bar">
          <div className="search-input-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by technology (e.g. Python, React, RAG, Express)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search projects"
            />
          </div>

          <div className="filter-chips-row" role="group" aria-label="Filter portfolio categories">
            {categories.map(cat => (
              <button
                type="button"
                key={cat}
                className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="portfolio-grid-wrap">
        {filteredProjects.length === 0 ? (
          <div className="empty-search-state">
            <p>No projects match your search criteria. Try a different keyword or category.</p>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map(p => (
              <article key={p.id} className="project-card large">
                <div className="project-card-header">
                  <span className={`status-pill ${p.status.toLowerCase().replace(/\s+/g, "-")}`}>
                    {p.status}
                  </span>
                  <span className="project-cat">{p.category}</span>
                </div>

                <h3>{p.name}</h3>
                <p className="project-blurb">{p.blurb}</p>

                <div className="project-problem-solution-preview">
                  <div className="preview-item">
                    <strong>Challenge:</strong> {p.problem}
                  </div>
                  <div className="preview-item">
                    <strong>Architecture:</strong> {p.architectureOverview}
                  </div>
                </div>

                <div className="project-stack-wrap">
                  {p.stack.map(tech => (
                    <span key={tech} className="stack-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-card-footer-actions">
                  <Link to={`/portfolio/${p.slug}`} className="btn btn-detail">
                    View Complete Case Study <ArrowRight size={14} />
                  </Link>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link-btn"
                      title="Visit live deployment"
                    >
                      <ExternalLink size={16} /> Live App
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
