import React, { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
  Code2,
  Database,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  Bot,
  Zap,
  Terminal,
} from "lucide-react";
import { servicesData } from "../data/servicesData";
import { projectsData } from "../data/projectsData";
import { faqData } from "../data/faqData";
import { steps, site } from "../data";
import ArchitectureExplorer from "../components/ArchitectureExplorer";
import { WebGLErrorBoundary } from "../components/WebGLErrorBoundary";

const Hero3D = lazy(() => import("../components/Hero3D"));

const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Home() {
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredProjects = projectsData.filter(
    p => projectFilter === "All" || p.category === projectFilter
  );

  return (
    <div className="home-page">
      {/* 1. ANIMATED 3D HERO */}
      <section className="hero-section" aria-label="Hero">
        <div className="hero-visual-container">
          <WebGLErrorBoundary
            fallback={
              <div className="hero-fallback-visual">
                <img src="/logo.png" alt="Korvex Core" className="fallback-logo-core" />
                <div className="ambient-radial-glow" />
              </div>
            }
          >
            {reducedMotion ? (
              <div className="hero-fallback-visual">
                <img src="/logo.png" alt="Korvex Core" className="fallback-logo-core" />
                <div className="ambient-radial-glow" />
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className="hero-loading-core">
                    <img src="/logo.png" alt="Loading 3D Scene" className="pulse-logo" />
                  </div>
                }
              >
                <Hero3D />
              </Suspense>
            )}
          </WebGLErrorBoundary>
        </div>

        <div className="hero-content-wrap">
          <motion.div
            className="hero-copy-block"
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="eyebrow-badge">
              <span className="dot" />
              <span>Full-Stack Engineering × Artificial Intelligence</span>
            </div>

            <h1 className="hero-headline">Engineered for What&apos;s Next.</h1>

            <p className="hero-description">
              We build intelligent digital products, scalable software, and AI-powered solutions
              that help ambitious businesses move forward.
            </p>

            <div className="hero-cta-group">
              <Link to="/contact" className="btn btn-primary-hero">
                Discuss a Project <ArrowRight size={16} />
              </Link>
              <a href="#work" className="btn btn-secondary-hero">
                Explore Our Work
              </a>
            </div>

            {/* Quick Metrics Bar (Genuine engineering capabilities) */}
            <div className="hero-signals">
              <div className="signal-item">
                <span className="signal-num">100%</span>
                <span className="signal-label">TypeScript & Type-Safe APIs</span>
              </div>
              <div className="signal-divider" />
              <div className="signal-item">
                <span className="signal-num">RAG</span>
                <span className="signal-label">Zero-Hallucination Guardrails</span>
              </div>
              <div className="signal-divider" />
              <div className="signal-item">
                <span className="signal-num">Production</span>
                <span className="signal-label">Direct Engineer Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUSTED CAPABILITIES (No fabricated logos) */}
      <section className="capabilities-ribbon" aria-label="Core Engineering Pillars">
        <div className="ribbon-inner">
          <div className="ribbon-title">
            <span>Engineering Tenets:</span>
          </div>
          <div className="ribbon-tags">
            <span className="ribbon-item">Deterministic AI Guardrails</span>
            <span className="ribbon-sep">✦</span>
            <span className="ribbon-item">Full-Stack Type Integrity</span>
            <span className="ribbon-sep">✦</span>
            <span className="ribbon-item">Zero Proprietary Lock-In</span>
            <span className="ribbon-sep">✦</span>
            <span className="ribbon-item">Multi-Tenant Cloud Scale</span>
            <span className="ribbon-sep">✦</span>
            <span className="ribbon-item">Security-First API Hardening</span>
          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW */}
      <section id="services" className="sec-wrap">
        <div className="sec-header">
          <p className="eyebrow">End-to-End Capabilities</p>
          <h2>Engineering Services</h2>
          <p className="sec-sub">
            From single-tenant operational web applications to high-throughput vector RAG systems,
            every solution is architected for long-term maintainability and velocity.
          </p>
        </div>

        <div className="services-grid">
          {servicesData.slice(0, 6).map(s => (
            <article key={s.id} className="service-card">
              <div className="service-card-top">
                <div className="service-icon-box">
                  <Code2 size={22} />
                </div>
                <span className="service-category-tag">{s.deliverables[0]}</span>
              </div>
              <h3>{s.title}</h3>
              <p className="service-problem">{s.shortDesc}</p>
              <div className="service-deliverables">
                <span className="del-label">Key Deliverables:</span>
                <ul>
                  {s.deliverables.slice(0, 3).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="service-card-foot">
                <Link to={`/services#${s.id}`} className="card-link">
                  Detailed Specifications <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="sec-footer-cta">
          <Link to="/services" className="btn ghost">
            View All 10 Engineering Practices <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS PORTFOLIO */}
      <section id="work" className="sec-wrap alt-bg">
        <div className="sec-header">
          <p className="eyebrow">Verified Implementations</p>
          <h2>Featured Work & Case Studies</h2>
          <p className="sec-sub">
            Explore our real internal prototypes, live community applications, and active client software systems.
            Accurately labeled by current delivery status.
          </p>

          <div className="filter-chips-row" role="group" aria-label="Filter portfolio projects">
            {["All", "AI", "Software"].map(cat => (
              <button
                type="button"
                key={cat}
                className={`filter-chip ${projectFilter === cat ? "active" : ""}`}
                aria-pressed={projectFilter === cat}
                onClick={() => setProjectFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.slice(0, 4).map(p => (
            <article key={p.id} className="project-card">
              <div className="project-card-header">
                <span className={`status-pill ${p.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {p.status}
                </span>
                <span className="project-cat">{p.category}</span>
              </div>

              <h3>{p.name}</h3>
              <p className="project-blurb">{p.blurb}</p>

              <div className="project-highlights">
                <span className="highlight-label">Architecture Highlights:</span>
                <p className="highlight-text">{p.architectureOverview}</p>
              </div>

              <div className="project-stack-wrap">
                {p.stack.map(tech => (
                  <span key={tech} className="stack-tag">{tech}</span>
                ))}
              </div>

              <div className="project-card-action">
                <Link to={`/portfolio/${p.slug}`} className="project-detail-link">
                  View Technical Case Study <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="sec-footer-cta">
          <Link to="/portfolio" className="btn">
            Explore Full Portfolio & Blueprints <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 5. AI & AUTOMATION SHOWCASE */}
      <section className="sec-wrap ai-showcase-section">
        <div className="ai-showcase-grid">
          <div className="ai-showcase-copy">
            <div className="eyebrow-badge">
              <Bot size={14} />
              <span>Grounded Artificial Intelligence</span>
            </div>
            <h2>AI That Solves Real Workflow Bottlenecks</h2>
            <p>
              Instead of superficial prompt wrappers, we engineer custom AI architectures that index your private
              company documentation with vector embeddings, enforce strict JSON output schemas, and provide transparent
              fallbacks when external models experience downtime.
            </p>
            <ul className="ai-feature-checklist">
              <li>
                <CheckCircle2 size={18} className="check-icon" />
                <div>
                  <strong>Retrieval-Augmented Generation (RAG):</strong> Sub-second semantic search over internal documentation with source citations.
                </div>
              </li>
              <li>
                <CheckCircle2 size={18} className="check-icon" />
                <div>
                  <strong>Structured Function Calling:</strong> Direct integration with internal REST APIs, databases, and ticketing systems.
                </div>
              </li>
              <li>
                <CheckCircle2 size={18} className="check-icon" />
                <div>
                  <strong>Privacy & Isolation:</strong> Enterprise-grade data protection ensuring proprietary data is never used to train public models.
                </div>
              </li>
            </ul>
            <div className="ai-actions-row">
              <Link to="/services#llm-rag-systems" className="btn">
                RAG Architecture Details <ArrowRight size={16} />
              </Link>
              <Link to="/estimator" className="btn ghost">
                Estimate an AI Project
              </Link>
            </div>
          </div>

          <div className="ai-showcase-visual">
            <div className="ai-terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="terminal-title">korvex-rag-pipeline :: vector-query.ts</span>
              </div>
              <div className="terminal-body">
                <pre>
                  <code>
{`// Korvex RAG Query & Citation Verification
async function queryKnowledgeHub(prompt: string) {
  const embedding = await generateVector(prompt);
  const matchedChunks = await vectorStore.query({
    vector: embedding,
    topK: 4,
    minSimilarity: 0.82
  });

  // Strict hallucination guardrail validation
  if (!matchedChunks.length) {
    return { grounded: false, fallback: "No verified record found." };
  }

  const completion = await llmClient.evaluate({
    model: "claude-sonnet-5-5",
    context: matchedChunks,
    strictJsonSchema: TriageSchema
  });

  return { grounded: true, answer: completion.text, citations: matchedChunks.sources };
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE ARCHITECTURE EXPLORER */}
      <section className="sec-wrap alt-bg">
        <ArchitectureExplorer />
      </section>

      {/* 7. DEVELOPMENT PROCESS TIMELINE */}
      <section className="sec-wrap">
        <div className="sec-header">
          <p className="eyebrow">Disciplined Delivery</p>
          <h2>Our 7-Step Engineering Methodology</h2>
          <p className="sec-sub">
            Predictable, transparent sprints from initial requirements scoping to zero-downtime production cutovers.
          </p>
        </div>

        <div className="methodology-steps">
          {steps.map((stepTitle, idx) => {
            const [num, title] = stepTitle.split(". ");
            return (
              <div key={idx} className="step-card">
                <span className="step-number">0{num}</span>
                <h4>{title}</h4>
                <p>
                  {idx === 0 && "In-depth discovery session analyzing business workflows, operational bottlenecks, and ROI goals."}
                  {idx === 1 && "Complete component, schema, and API specification before writing a single line of code."}
                  {idx === 2 && "Interactive responsive prototypes and design tokens adhering to strict accessibility standards."}
                  {idx === 3 && "Bi-weekly sprint increments with staging review links and continuous integration testing."}
                  {idx === 4 && "Automated vulnerability scans, unit/E2E test suites, and load testing under peak traffic."}
                  {idx === 5 && "Zero-downtime automated deployment to edge infrastructure with continuous health monitoring."}
                  {idx === 6 && "Proactive dependency upgrades, database indexing, and feature evolutions based on metrics."}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. WHY CHOOSE KORVEX */}
      <section className="sec-wrap alt-bg">
        <div className="sec-header">
          <p className="eyebrow">The Korvex Standard</p>
          <h2>Why Ambitious Teams Choose Korvex</h2>
          <p className="sec-sub">
            We operate as an extension of your leadership and technical staff with complete transparency.
          </p>
        </div>

        <div className="differentiators-grid">
          <div className="diff-card">
            <div className="diff-icon"><ShieldCheck size={26} /></div>
            <h3>Direct Senior Engineers</h3>
            <p>
              No communication lost across layers of non-technical account managers. You speak directly with the full-stack and AI engineers designing your architecture.
            </p>
          </div>
          <div className="diff-card">
            <div className="diff-icon"><Code2 size={26} /></div>
            <h3>100% IP & Code Ownership</h3>
            <p>
              You receive full intellectual property ownership of all source code, deployment scripts, database schemas, and documentation upon project completion.
            </p>
          </div>
          <div className="diff-card">
            <div className="diff-icon"><Database size={26} /></div>
            <h3>Production-Hardened Stacks</h3>
            <p>
              We build exclusively on battle-tested technologies (React, TypeScript, Node.js, FastAPI, PostgreSQL) designed for ten years of operational stability.
            </p>
          </div>
          <div className="diff-card">
            <div className="diff-icon"><Zap size={26} /></div>
            <h3>Transparent Pricing & Scope</h3>
            <p>
              No hidden fees, no opaque contractor markups. Milestone-based deliverables with defined acceptance criteria and realistic timelines.
            </p>
          </div>
        </div>
      </section>

      {/* 9. TECHNOLOGY STACK GRID */}
      <section className="sec-wrap">
        <div className="sec-header">
          <p className="eyebrow">Battle-Tested Technologies</p>
          <h2>Modern Technology Stack</h2>
          <p className="sec-sub">
            Selected for high developer velocity, type safety, low latency, and robust enterprise support.
          </p>
        </div>

        <div className="stack-categories-grid">
          <div className="stack-cat-card">
            <h4>Frontend & Client</h4>
            <div className="tech-pill-group">
              <span className="tech-pill">React 18</span>
              <span className="tech-pill">TypeScript</span>
              <span className="tech-pill">Vite</span>
              <span className="tech-pill">Three.js / R3F</span>
              <span className="tech-pill">Framer Motion</span>
              <span className="tech-pill">TailwindCSS</span>
            </div>
          </div>

          <div className="stack-cat-card">
            <h4>Backend & Microservices</h4>
            <div className="tech-pill-group">
              <span className="tech-pill">Node.js</span>
              <span className="tech-pill">Express</span>
              <span className="tech-pill">Python 3.14</span>
              <span className="tech-pill">FastAPI</span>
              <span className="tech-pill">REST & GraphQL</span>
              <span className="tech-pill">WebSockets</span>
            </div>
          </div>

          <div className="stack-cat-card">
            <h4>AI, LLMs & Vector Search</h4>
            <div className="tech-pill-group">
              <span className="tech-pill">Claude 3.5 Sonnet</span>
              <span className="tech-pill">OpenAI GPT-4o</span>
              <span className="tech-pill">ChromaDB</span>
              <span className="tech-pill">Pinecone</span>
              <span className="tech-pill">RAG Pipelines</span>
              <span className="tech-pill">Pydantic / Zod</span>
            </div>
          </div>

          <div className="stack-cat-card">
            <h4>Data & Cloud Infrastructure</h4>
            <div className="tech-pill-group">
              <span className="tech-pill">PostgreSQL</span>
              <span className="tech-pill">MongoDB</span>
              <span className="tech-pill">Redis</span>
              <span className="tech-pill">Docker</span>
              <span className="tech-pill">Nginx</span>
              <span className="tech-pill">GitHub Actions CI/CD</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="sec-wrap alt-bg">
        <div className="sec-header">
          <p className="eyebrow">Clear Answers</p>
          <h2>Frequently Asked Questions</h2>
          <p className="sec-sub">
            Everything you need to know about engaging Korvex for your next software or AI project.
          </p>
        </div>

        <div className="faq-accordion">
          {faqData.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <span className="faq-q-text">{item.question}</span>
                  <ChevronDown className={`chevron-icon ${isOpen ? "rotate" : ""}`} size={18} />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. PROJECT ENQUIRY CTA BANNER */}
      <section className="sec-wrap home-cta-banner">
        <div className="cta-banner-card">
          <div className="cta-glow" />
          <p className="eyebrow">Ready for What&apos;s Next?</p>
          <h2>Let&apos;s Architect Your Vision</h2>
          <p className="cta-desc">
            Whether you need a custom SaaS platform, a reliable RAG pipeline, or enterprise workflow automation,
            our senior engineers are ready to scope your project.
          </p>
          <div className="cta-btn-row">
            <Link to="/contact" className="btn btn-primary-hero">
              Discuss a Project <ArrowRight size={16} />
            </Link>
            <Link to="/estimator" className="btn ghost">
              Configure Project Estimator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
