import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { articlesData } from "../data/articlesData";
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Share2, Check, BookOpen } from "lucide-react";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const article = articlesData.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="project-not-found-wrap">
        <h2>Publication Not Found</h2>
        <p>The requested article could not be located in our publication index.</p>
        <Link to="/insights" className="btn">
          <ArrowLeft size={16} /> Return to Insights Hub
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const relatedArticles = articlesData
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 2);

  return (
    <div className="article-detail-page">
      {/* Top Navigation */}
      <div className="detail-top-nav">
        <Link to="/insights" className="back-link">
          <ArrowLeft size={16} /> Back to All Publications
        </Link>
        <button type="button" className="share-btn" onClick={handleShare}>
          {copied ? <Check size={14} className="copied-icon" /> : <Share2 size={14} />}
          <span>{copied ? "Link Copied!" : "Share Article"}</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="article-header">
        <div className="header-meta-row">
          <span className="art-category-pill">{article.category}</span>
          <span className="meta-item"><Clock size={14} /> {article.readTime}</span>
          <span className="meta-item"><Calendar size={14} /> {article.publishedAt}</span>
        </div>

        <h1>{article.title}</h1>
        <p className="article-summary-lead">{article.summary}</p>

        <div className="author-box">
          <div className="author-avatar"><User size={20} /></div>
          <div className="author-meta">
            <span className="author-name">{article.author.name}</span>
            <span className="author-role">{article.author.role}</span>
          </div>
        </div>
      </header>

      {/* Article Body Content */}
      <article className="article-body-content">
        {article.content.map((paragraph, index) => {
          // Detect headers or lists
          if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ") || paragraph.startsWith("3. ") || paragraph.startsWith("4. ")) {
            return (
              <div key={index} className="callout-point">
                <p>{paragraph}</p>
              </div>
            );
          }
          if (paragraph.startsWith("• ")) {
            return (
              <li key={index} className="article-bullet-item">
                {paragraph.replace("• ", "")}
              </li>
            );
          }
          return <p key={index} className="article-p">{paragraph}</p>;
        })}

        <div className="article-tags-bottom">
          <span className="tags-label">Categorized under:</span>
          {article.tags.map(tag => (
            <span key={tag} className="tag-pill">#{tag}</span>
          ))}
        </div>
      </article>

      {/* Related Publications */}
      {relatedArticles.length > 0 && (
        <section className="related-articles-section">
          <h3>Related Engineering Insights</h3>
          <div className="related-grid">
            {relatedArticles.map(rel => (
              <div key={rel.id} className="related-card">
                <span className="rel-cat">{rel.category}</span>
                <h4>{rel.title}</h4>
                <p>{rel.summary}</p>
                <Link to={`/insights/${rel.slug}`} className="read-more-link">
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Article Footer CTA */}
      <section className="article-footer-cta">
        <div className="cta-banner-card">
          <h3>Discuss this architecture with our engineering team</h3>
          <p>
            Have questions about implementing RAG pipelines, schema validation, or event-driven automation in your stack?
          </p>
          <div className="cta-btn-row">
            <Link to="/contact" className="btn btn-primary-hero">
              Discuss a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
