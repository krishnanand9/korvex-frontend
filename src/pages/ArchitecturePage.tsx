import React from "react";
import ArchitectureExplorer from "../components/ArchitectureExplorer";

export default function ArchitecturePage() {
  return (
    <div className="architecture-page-view">
      <section className="page-hero-header">
        <div className="eyebrow-badge">System Topology</div>
        <h1>Full-Stack & AI Architecture Explorer</h1>
        <p className="page-hero-desc">
          Inspect how our modern software systems flow from client-side reactive interfaces through
          secured API gateways, cryptographic session layers, durable storage, and internal AI engines.
        </p>
      </section>

      <section className="architecture-body-section">
        <ArchitectureExplorer />
      </section>
    </div>
  );
}
