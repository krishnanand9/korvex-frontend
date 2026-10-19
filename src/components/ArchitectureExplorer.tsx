import React, { useState } from "react";
import { architectureData } from "../data/architectureData";
import { ArchitectureNode } from "../types";
import { ShieldCheck, Cpu, Database, Network, Cloud, Lock, Layout, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ArchitectureExplorer() {
  const [activeId, setActiveId] = useState<string>("frontend");
  const activeNode = architectureData.find(n => n.id === activeId) || architectureData[0];

  const getIcon = (id: string) => {
    switch (id) {
      case "frontend": return <Layout className="icon" size={20} />;
      case "backend-api": return <Cpu className="icon" size={20} />;
      case "auth-security": return <Lock className="icon" size={20} />;
      case "database": return <Database className="icon" size={20} />;
      case "ai-engine": return <Cpu className="icon" size={20} />;
      case "integrations": return <Network className="icon" size={20} />;
      case "cloud-devops": return <Cloud className="icon" size={20} />;
      default: return <Cpu className="icon" size={20} />;
    }
  };

  return (
    <div className="arch-explorer">
      <div className="arch-header">
        <p className="eyebrow">Interactive Blueprint</p>
        <h2>Production Software Architecture</h2>
        <p className="arch-sub">
          Explore how modern Korvex applications flow from edge client interfaces through secured microservices, 
          resilient persistence, and intelligent AI pipelines. Click any component below to inspect technical specifications.
        </p>
      </div>

      {/* Visual Flow Pipeline */}
      <div className="arch-pipeline-wrap">
        <div className="arch-pipeline" role="tablist" aria-label="System architecture tiers">
          {architectureData.map((node, index) => {
            const isSelected = node.id === activeId;
            return (
              <React.Fragment key={node.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`tier-panel-${node.id}`}
                  id={`tier-tab-${node.id}`}
                  className={`arch-node-btn ${isSelected ? "selected" : ""}`}
                  onClick={() => setActiveId(node.id)}
                >
                  <span className="arch-badge">{node.badge}</span>
                  <div className="arch-node-icon">{getIcon(node.id)}</div>
                  <span className="arch-node-title">{node.label}</span>
                  <span className="arch-node-sub">{node.subtitle.split("&")[0]}</span>
                </button>
                {index < architectureData.length - 1 && (
                  <div className="arch-flow-arrow" aria-hidden="true">
                    <span className="pulse-dot" />
                    <ArrowRight size={14} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Node Inspection Card */}
      <div
        id={`tier-panel-${activeNode.id}`}
        role="tabpanel"
        aria-labelledby={`tier-tab-${activeNode.id}`}
        className="arch-detail-panel"
      >
        <div className="arch-detail-top">
          <div className="arch-title-group">
            <span className="tier-tag">{activeNode.badge} · Component Inspection</span>
            <h3>{activeNode.label}</h3>
            <p className="subtitle">{activeNode.subtitle}</p>
          </div>
          <div className="arch-protocol-badges">
            {activeNode.protocols.map(p => (
              <span key={p} className="chip proto-chip">{p}</span>
            ))}
          </div>
        </div>

        <p className="arch-desc">{activeNode.description}</p>

        <div className="arch-meta-grid">
          <div className="arch-meta-col">
            <h4>Technology Stack</h4>
            <div className="tech-tags">
              {activeNode.technologies.map(t => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>

          <div className="arch-meta-col">
            <h4>Data Flow & Telemetry</h4>
            <p className="meta-text">{activeNode.dataFlow}</p>
          </div>

          <div className="arch-meta-col security">
            <h4><ShieldCheck size={16} /> Security & Integrity Standard</h4>
            <p className="meta-text">{activeNode.securityNotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
