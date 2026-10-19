import React from "react";
import ProjectEstimator from "../components/ProjectEstimator";

export default function EstimatorPage() {
  return (
    <div className="estimator-page-view">
      <section className="page-hero-header">
        <div className="eyebrow-badge">Interactive Scope Calculator</div>
        <h1>Smart Project Estimator</h1>
        <p className="page-hero-desc">
          Configure your software or AI project specifications step-by-step. Receive an instant indicative
          timeline, investment range, and preliminary scope breakdown that transfers directly into your enquiry.
        </p>
      </section>

      <section className="estimator-body-section">
        <ProjectEstimator />
      </section>
    </div>
  );
}
