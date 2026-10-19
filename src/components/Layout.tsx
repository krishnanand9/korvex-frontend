import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Shield, Cpu, Terminal, ExternalLink } from "lucide-react";
import AIAssistant from "./AIAssistant";
import { site } from "../data";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Work" },
  { to: "/architecture", label: "Architecture" },
  { to: "/estimator", label: "Estimator" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="korvex-app">
      {/* Sticky Global Navigation Bar */}
      <header className="global-nav">
        <div className="nav-inner">
          <Link to="/" className="brand-logo" aria-label="Korvex Technologies Home">
            <img src="/logo.png" alt="Korvex Technologies Logo" width={38} height={38} className="logo-img" />
            <div className="brand-text">
              <span className="brand-name">KORVEX</span>
              <span className="brand-sub">TECHNOLOGIES</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-menu" aria-label="Main Navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <Link to="/contact" className="btn btn-nav-cta">
              Discuss a Project <ArrowRight size={14} />
            </Link>
            <button
              type="button"
              className="mobile-burger-btn"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="mobile-drawer" role="dialog" aria-label="Mobile Navigation Menu">
            <nav className="mobile-links">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="btn mobile-cta"
                onClick={() => setMobileOpen(false)}
              >
                Discuss a Project <ArrowRight size={16} />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main id="main-content" className="main-content">
        <Outlet />
      </main>

      {/* Real AI Website Assistant (Persistent across all routes) */}
      <AIAssistant />

      {/* Production Footer */}
      <footer className="global-footer">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img src="/logo.png" alt="Korvex Technologies Logo" width={32} height={32} />
              <span className="brand-name">KORVEX TECHNOLOGIES</span>
            </div>
            <p className="footer-tagline">“{site.tagline}”</p>
            <p className="footer-desc">
              Engineering bespoke digital products, mission-critical web applications,
              and grounded AI systems for high-growth businesses.
            </p>
            <div className="footer-contact-direct">
              <span className="contact-label">Engineering Inquiries</span>
              <a href={`mailto:${site.email}`} className="email-link">{site.email}</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h5>Navigation</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Work & Case Studies</Link></li>
              <li><Link to="/architecture">Architecture Explorer</Link></li>
              <li><Link to="/estimator">Smart Estimator</Link></li>
              <li><Link to="/insights">Technology Insights</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Discuss a Project</Link></li>
            </ul>
          </div>

          {/* Services Col */}
          <div className="footer-links-col">
            <h5>Core Capabilities</h5>
            <ul>
              <li><Link to="/services#ai-applications">AI Application Development</Link></li>
              <li><Link to="/services#llm-rag-systems">LLM Integration & RAG</Link></li>
              <li><Link to="/services#custom-software">Custom Software & Web Apps</Link></li>
              <li><Link to="/services#workflow-automation">Workflow Automation</Link></li>
              <li><Link to="/services#api-integrations">API & Cloud Integrations</Link></li>
              <li><Link to="/services#saas-mvp">SaaS Product Architecture</Link></li>
            </ul>
          </div>

          {/* Verification & Admin Col */}
          <div className="footer-links-col">
            <h5>Integrity & Security</h5>
            <p className="sec-note">
              Deterministic architectures, transparent pricing models, and zero unverified marketing claims.
            </p>
            <div className="admin-access-box">
              <Link to="/admin" className="admin-link">
                <Terminal size={14} /> Staff / Admin Portal
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Korvex Technologies. All rights reserved.</p>
          <div className="footer-bottom-meta">
            <span>Built with React 18, TypeScript, Three.js, Node.js & FastAPI</span>
            <span className="divider">·</span>
            <Link to="/about">Security & Quality Commitments</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
