import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import { ServiceItem } from "../types";
import {
  Code2,
  Cpu,
  Layers,
  Database,
  Bot,
  GitBranch,
  Network,
  Cloud,
  ShieldCheck,
  Layout,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function Services() {
  const [filter, setFilter] = useState<string>("All");
  const location = useLocation();

  useEffect(() => {
    // If navigated with hash e.g. #llm-rag-systems, scroll into view
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2": return <Code2 size={24} />;
      case "Layout": return <Layout size={24} />;
      case "Cpu": return <Cpu size={24} />;
      case "Database": return <Database size={24} />;
      case "Bot": return <Bot size={24} />;
      case "GitBranch": return <GitBranch size={24} />;
      case "Network": return <Network size={24} />;
      case "Cloud": return <Cloud size={24} />;
      case "Layers": return <Layers size={24} />;
      case "ShieldCheck": return <ShieldCheck size={24} />;
      default: return <Code2 size={24} />;
    }
  };

  const filteredServices = servicesData.filter(s => {
    if (filter === "All") return true;
    if (filter === "Software") return ["custom-software", "fullstack-web", "saas-mvp"].includes(s.id);
    if (filter === "AI") return ["ai-applications", "llm-rag-systems", "ai-assistants"].includes(s.id);
    if (filter === "Cloud & Automation") return ["workflow-automation", "api-integrations", "cloud-infrastructure", "maintenance-support"].includes(s.id);
    return true;
  });

  return (
    <div className="services-page">
      {/* Services Hero Header */}
      <section className="page-hero-header">
        <div className="eyebrow-badge">Engineering Practices</div>
        <h1>Engineered for Scalability & Precision</h1>
        <p className="page-hero-desc">
          We architect bespoke software systems, grounded AI applications, and resilient cloud infrastructure.
          Every service is delivered with strict type safety, modular contracts, and zero vendor lock-in.
        </p>

        {/* Filter Chips */}
        <div className="filter-chips-row" role="group" aria-label="Filter service practices">
          {["All", "Software", "AI", "Cloud & Automation"].map(tab => (
            <button
              type="button"
              key={tab}
              className={`filter-chip ${filter === tab ? "active" : ""}`}
              aria-pressed={filter === tab}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Services Detailed Sections List */}
      <section className="services-detailed-list">
        {filteredServices.map((service, index) => (
          <article key={service.id} id={service.id} className="service-detail-block">
            <div className="service-block-header">
              <div className="header-meta">
                <span className="service-num">0{index + 1}</span>
                <div className="service-icon-wrapper">{getServiceIcon(service.icon)}</div>
                <h2>{service.title}</h2>
              </div>
              <Link
                to="/contact"
                state={{ category: service.title }}
                className="btn btn-service-cta"
              >
                Discuss This Service <ArrowRight size={15} />
              </Link>
            </div>

            <p className="service-short-desc">{service.shortDesc}</p>

            <div className="service-content-grid">
              {/* Problem & Solution */}
              <div className="service-content-col">
                <div className="info-card problem-card">
                  <h4>The Operational Challenge</h4>
                  <p>{service.problem}</p>
                </div>

                <div className="info-card solution-card">
                  <h4>Our Architectural Solution</h4>
                  <p>{service.solution}</p>
                </div>

                <div className="info-card tech-card">
                  <h4>Technical Approach</h4>
                  <p>{service.techApproach}</p>
                </div>
              </div>

              {/* Deliverables & Use Cases */}
              <div className="service-content-col">
                <div className="info-card deliverables-card">
                  <h4>Core Deliverables</h4>
                  <ul className="check-list">
                    {service.deliverables.map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="info-card usecases-card">
                  <h4>Typical Use Cases</h4>
                  <ul className="bullet-list">
                    {service.useCases.map((uc, i) => (
                      <li key={i}>{uc}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-card process-card">
                  <h4>Delivery Process</h4>
                  <ol className="mini-process-list">
                    {service.deliveryProcess.map((proc, i) => (
                      <li key={i}>{proc}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Estimator Callout */}
      <section className="sec-wrap services-estimator-callout">
        <div className="callout-card">
          <div className="callout-copy">
            <h3>Need an indicative budget and timeline for these services?</h3>
            <p>
              Use our interactive Smart Project Estimator to configure your feature scope and generate
              a preliminary investment baseline in seconds.
            </p>
          </div>
          <Link to="/estimator" className="btn btn-primary-hero">
            Open Project Estimator <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
