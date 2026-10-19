import React, { useState } from "react";
import { Link } from "react-router-dom";
import { articlesData } from "../data/articlesData";
import { Article } from "../types";
import { Search, Clock, User, ArrowRight, Tag, BookOpen } from "lucide-react";

export default function Insights() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allTags = ["All", "AI", "RAG", "Architecture", "Automation", "Security", "React", "Node.js"];

  const filteredArticles = articlesData.filter(art => {
    const matchesTag = selectedTag === "All" || art.tags.includes(selectedTag);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.tags.some(t => t.toLowerCase().includes(q));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="insights-page">
      {/* Insights Hero Header */}
      <section className="page-hero-header">
        <div className="eyebrow-badge">Technical Publications</div>
        <h1>Technology Insights & Engineering Hub</h1>
        <p className="page-hero-desc">
          In-depth architectural breakdowns, lessons from shipping production AI, and practical guides
          to building reliable full-stack software. Written by engineers, for engineers and tech leaders.
        </p>

        {/* Search & Tag Filter */}
        <div className="insights-controls-bar">
          <div className="search-input-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search insights by topic, framework, or architectural pattern..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search articles"
            />
          </div>

          <div className="filter-chips-row" role="group" aria-label="Filter insight topics">
            {allTags.map(tag => (
              <button
                type="button"
                key={tag}
                className={`filter-chip ${selectedTag === tag ? "active" : ""}`}
                aria-pressed={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="insights-grid-section">
        {filteredArticles.length === 0 ? (
          <div className="empty-search-state">
            <p>No articles match your query. Try a different search keyword or category.</p>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map(art => (
              <article key={art.id} className="article-card">
                <div className="article-card-meta">
                  <span className="art-category-pill">{art.category}</span>
                  <div className="art-read-time">
                    <Clock size={13} />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3>{art.title}</h3>
                <p className="art-summary">{art.summary}</p>

                <div className="art-tags-row">
                  {art.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag-pill">#{tag}</span>
                  ))}
                </div>

                <div className="art-card-foot">
                  <div className="art-author-info">
                    <User size={14} />
                    <span>{art.author.name}</span>
                  </div>
                  <Link to={`/insights/${art.slug}`} className="read-more-link">
                    Read Publication <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
