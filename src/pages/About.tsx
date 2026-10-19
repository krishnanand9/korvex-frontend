import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Cpu, Code2, Eye, Terminal, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { site } from "../data";

export default function About() {
  return (
    <div className="about-page">
      {/* About Hero Header */}
      <section className="page-hero-header">
        <div className="eyebrow-badge">Who We Are</div>
        <h1>Engineered with Integrity. Built for What&apos;s Next.</h1>
        <p className="page-hero-desc">
          Korvex Technologies is an engineering-first technology practice dedicated to building durable,
          high-performance software and artificial intelligence systems that move ambitious businesses forward.
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="about-dual-section">
        <div className="about-pillar-card">
          <div className="pillar-tag">Our Vision</div>
          <h2>Software That Endures</h2>
          <p>
            We envision a software ecosystem where digital products are built to last rather than discarded after hype cycles.
            By combining strict architectural principles, deep type safety, and disciplined AI integration, we deliver
            systems that scale gracefully and maintain operational clarity year after year.
          </p>
        </div>

        <div className="about-pillar-card">
          <div className="pillar-tag">Our Mission</div>
          <h2>Bridging Ambition and Engineering</h2>
          <p>
            Our mission is to empower ambitious founders, growing enterprises, and established operators with
            custom-engineered software, intelligent workflow automations, and grounded AI applications that deliver
            measurable, verified business utility.
          </p>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section className="sec-wrap">
        <div className="sec-header">
          <p className="eyebrow">Core Tenets</p>
          <h2>Our Engineering Philosophy</h2>
          <p className="sec-sub">
            The fundamental principles that govern how we design, write, test, and ship code.
          </p>
        </div>

        <div className="philosophy-grid">
          <div className="phil-card">
            <div className="phil-icon"><Code2 size={24} /></div>
            <h3>Type Safety & Explicit Contracts</h3>
            <p>
              We reject brittle, weakly-typed foundations. By enforcing end-to-end TypeScript contracts and schema validation
              with Zod and Pydantic, regressions are caught during compilation rather than in production by your customers.
            </p>
          </div>

          <div className="phil-card">
            <div className="phil-icon"><Cpu size={24} /></div>
            <h3>Grounded, Deterministic AI</h3>
            <p>
              AI should be useful, not unpredictable. We architect dual-engine pipelines that combine the semantic power of
              LLMs with deterministic business logic and vector citation verification, ensuring zero hallucinations.
            </p>
          </div>

          <div className="phil-card">
            <div className="phil-icon"><ShieldCheck size={24} /></div>
            <h3>Defensive Security & Privacy</h3>
            <p>
              Security is woven into every sprint: rate limiting, honeypot spam protection, timing-attack mitigation,
              and strict isolation of sensitive business data.
            </p>
          </div>

          <div className="phil-card">
            <div className="phil-icon"><Eye size={24} /></div>
            <h3>Radical Transparency</h3>
            <p>
              No vanity metrics, no fabricated testimonials, no fake client logos. You speak directly with senior engineers,
              review clean Git commits, and retain 100% intellectual property ownership upon completion.
            </p>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="sec-wrap alt-bg">
        <div className="commitments-container">
          <div className="sec-header">
            <p className="eyebrow">Our Guarantee</p>
            <h2>Commitment to Quality & Security</h2>
          </div>

          <div className="commitments-list">
            <div className="commitment-item">
              <CheckCircle2 size={20} className="check-icon" />
              <div>
                <strong>Zero Vendor Lock-In:</strong> Every repository is delivered with Docker containerization, clear environment variable guides, and automated CI/CD scripts so you can host wherever you choose.
              </div>
            </div>
            <div className="commitment-item">
              <CheckCircle2 size={20} className="check-icon" />
              <div>
                <strong>Full Source Code Ownership:</strong> Your business owns 100% of all intellectual property, source files, schemas, and design assets upon milestone sign-off.
              </div>
            </div>
            <div className="commitment-item">
              <CheckCircle2 size={20} className="check-icon" />
              <div>
                <strong>Rigorous Pre-Launch QA:</strong> Automated end-to-end testing, responsive cross-device validation, and performance benchmarking before every release.
              </div>
            </div>
            <div className="commitment-item">
              <CheckCircle2 size={20} className="check-icon" />
              <div>
                <strong>Responsible AI Ethics:</strong> We ensure training data privacy, implement prompt injection guardrails, and mandate clear attribution for AI-generated artifacts.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="sec-wrap about-cta-wrap">
        <div className="cta-banner-card">
          <h2>Let&apos;s Build Something Meaningful Together</h2>
          <p>
            Ready to partner with an engineering practice that values precision, security, and velocity?
          </p>
          <div className="cta-btn-row">
            <Link to="/contact" className="btn btn-primary-hero">
              Discuss a Project <ArrowRight size={16} />
            </Link>
            <Link to="/portfolio" className="btn ghost">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
