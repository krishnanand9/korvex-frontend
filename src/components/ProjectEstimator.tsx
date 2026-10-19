import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECT_TYPES, COMPLEXITY_LEVELS, REQUIREMENT_OPTIONS, BUDGET_RANGES, TIMELINE_OPTIONS, ProjectTypeOption } from "../data/estimatorData";
import { ArrowRight, Check, RefreshCw, Calculator, Sparkles, Send, Info } from "lucide-react";

export default function ProjectEstimator() {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<ProjectTypeOption>(PROJECT_TYPES[1]); // Default: Full-Stack Web App
  const [selectedComplexity, setSelectedComplexity] = useState(COMPLEXITY_LEVELS[1]); // Default: Intermediate
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>(["auth", "admin-dashboard", "responsive"]);
  const [selectedBudget, setSelectedBudget] = useState<string>(BUDGET_RANGES[1]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(TIMELINE_OPTIONS[1]);

  const toggleRequirement = (id: string) => {
    setSelectedRequirements(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  // Compute calculated estimate
  const chosenReqObjects = REQUIREMENT_OPTIONS.filter(r => selectedRequirements.includes(r.id));
  const addedCost = chosenReqObjects.reduce((acc, curr) => acc + curr.costImpactUSD, 0);
  const addedWeeks = chosenReqObjects.reduce((acc, curr) => acc + curr.weekImpact, 0);

  const minUSD = Math.round((selectedType.baseMinUSD + addedCost) * selectedComplexity.multiplier);
  const maxUSD = Math.round((selectedType.baseMaxUSD + addedCost * 1.3) * selectedComplexity.multiplier);
  const estimatedWeeks = Math.max(2, Math.round((selectedType.baseWeeks + addedWeeks) * (selectedComplexity.id === "advanced" ? 1.4 : selectedComplexity.id === "intermediate" ? 1.15 : 1.0)));

  // Currency approximations (USD to INR @ ~83)
  const minINR = (minUSD * 83).toLocaleString("en-IN");
  const maxINR = (maxUSD * 83).toLocaleString("en-IN");

  const transferToEnquiry = () => {
    const summaryText = `Project Type: ${selectedType.title}\nComplexity: ${selectedComplexity.name}\nKey Requirements: ${chosenReqObjects.map(r => r.name).join(", ")}\nEstimated Scope: ${estimatedWeeks} weeks (${selectedTimeline})\nTarget Budget: ${selectedBudget}`;
    navigate("/contact", {
      state: {
        category: selectedType.recommendedCategory,
        budget: `${minUSD.toLocaleString()} - ${maxUSD.toLocaleString()} USD (approx ₹${minINR} - ₹${maxINR})`,
        timeline: `${estimatedWeeks} weeks (${selectedTimeline})`,
        description: `I would like to discuss building a ${selectedType.title} (${selectedComplexity.name} complexity).\n\nKey Requirements:\n• ${chosenReqObjects.map(r => r.name).join("\n• ")}\n\nPreliminary Timeline: ~${estimatedWeeks} weeks\nTarget Budget Range: ${selectedBudget}`,
      },
    });
  };

  return (
    <div className="estimator-container">
      <div className="estimator-card">
        {/* Step Indicator Header */}
        <div className="estimator-steps-nav" aria-label="Estimator progress">
          {[
            { num: 1, label: "Type" },
            { num: 2, label: "Complexity" },
            { num: 3, label: "Features" },
            { num: 4, label: "Timeline" },
            { num: 5, label: "Summary" },
          ].map(s => (
            <button
              key={s.num}
              type="button"
              className={`step-nav-btn ${step === s.num ? "active" : ""} ${step > s.num ? "completed" : ""}`}
              onClick={() => setStep(s.num)}
            >
              <span className="step-circle">{step > s.num ? <Check size={12} /> : s.num}</span>
              <span className="step-label">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step 1: Project Type */}
        {step === 1 && (
          <div className="estimator-step-body">
            <div className="step-heading">
              <span className="step-badge">Step 1 of 5</span>
              <h3>Select Project Category</h3>
              <p>What core product or system are you looking to architect?</p>
            </div>
            <div className="estimator-grid">
              {PROJECT_TYPES.map(type => (
                <button
                  type="button"
                  key={type.id}
                  className={`estimator-option-card ${selectedType.id === type.id ? "selected" : ""}`}
                  onClick={() => setSelectedType(type)}
                >
                  <div className="option-header">
                    <h4>{type.title}</h4>
                    {selectedType.id === type.id && <Check className="check-icon" size={18} />}
                  </div>
                  <p>{type.description}</p>
                  <div className="option-foot">
                    <span>Baseline from ${type.baseMinUSD.toLocaleString()}</span>
                    <span>~{type.baseWeeks}wks</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="step-actions">
              <div />
              <button type="button" className="btn" onClick={() => setStep(2)}>
                Next: Select Complexity <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Complexity */}
        {step === 2 && (
          <div className="estimator-step-body">
            <div className="step-heading">
              <span className="step-badge">Step 2 of 5</span>
              <h3>Select System Complexity</h3>
              <p>Consider the concurrency, user role variations, and business rule depth required.</p>
            </div>
            <div className="complexity-grid">
              {COMPLEXITY_LEVELS.map(level => (
                <button
                  type="button"
                  key={level.id}
                  className={`complexity-card ${selectedComplexity.id === level.id ? "selected" : ""}`}
                  onClick={() => setSelectedComplexity(level)}
                >
                  <div className="comp-badge">{level.multiplier}x Scale Factor</div>
                  <h4>{level.name}</h4>
                  <p>{level.description}</p>
                </button>
              ))}
            </div>
            <div className="step-actions">
              <button type="button" className="btn ghost" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="button" className="btn" onClick={() => setStep(3)}>
                Next: Choose Features <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Requirements */}
        {step === 3 && (
          <div className="estimator-step-body">
            <div className="step-heading">
              <span className="step-badge">Step 3 of 5</span>
              <h3>Choose Technical Features & Capabilities</h3>
              <p>Select all modules that will form your core application scope.</p>
            </div>
            <div className="features-grid">
              {REQUIREMENT_OPTIONS.map(req => {
                const isChecked = selectedRequirements.includes(req.id);
                return (
                  <button
                    type="button"
                    key={req.id}
                    className={`feature-check-card ${isChecked ? "checked" : ""}`}
                    onClick={() => toggleRequirement(req.id)}
                  >
                    <div className="check-box">{isChecked && <Check size={14} />}</div>
                    <div className="feature-text">
                      <span className="feature-title">{req.name}</span>
                      <span className="feature-desc">{req.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="step-actions">
              <button type="button" className="btn ghost" onClick={() => setStep(2)}>
                Back
              </button>
              <button type="button" className="btn" onClick={() => setStep(4)}>
                Next: Budget & Timeline <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Budget & Timeline */}
        {step === 4 && (
          <div className="estimator-step-body">
            <div className="step-heading">
              <span className="step-badge">Step 4 of 5</span>
              <h3>Target Budget & Desired Launch Schedule</h3>
              <p>Help us understand your business timeline and budgetary alignment.</p>
            </div>
            <div className="budget-timeline-group">
              <div className="bt-col">
                <label className="bt-label">Target Budget Alignment</label>
                <div className="chips-list">
                  {BUDGET_RANGES.map(b => (
                    <button
                      type="button"
                      key={b}
                      className={`chip-select ${selectedBudget === b ? "active" : ""}`}
                      onClick={() => setSelectedBudget(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bt-col">
                <label className="bt-label">Target Launch Milestone</label>
                <div className="chips-list">
                  {TIMELINE_OPTIONS.map(t => (
                    <button
                      type="button"
                      key={t}
                      className={`chip-select ${selectedTimeline === t ? "active" : ""}`}
                      onClick={() => setSelectedTimeline(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="step-actions">
              <button type="button" className="btn ghost" onClick={() => setStep(3)}>
                Back
              </button>
              <button type="button" className="btn" onClick={() => setStep(5)}>
                Generate Estimate Summary <Calculator size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Summary */}
        {step === 5 && (
          <div className="estimator-step-body summary-view">
            <div className="step-heading">
              <span className="step-badge success">Calculated Scope Baseline</span>
              <h3>Project Scope & Estimation Summary</h3>
              <p>Transparent indicative calculation based on your selected specifications.</p>
            </div>

            <div className="summary-banner">
              <div className="summary-metric">
                <span className="metric-label">Indicative Investment Range</span>
                <span className="metric-val">${minUSD.toLocaleString()} – ${maxUSD.toLocaleString()} USD</span>
                <span className="metric-sub">Approx ₹{minINR} – ₹{maxINR} INR</span>
              </div>
              <div className="summary-metric">
                <span className="metric-label">Estimated Delivery Timeline</span>
                <span className="metric-val">~{estimatedWeeks} Weeks</span>
                <span className="metric-sub">Aligned with {selectedTimeline.split("(")[0]}</span>
              </div>
            </div>

            <div className="summary-breakdown">
              <div className="breakdown-card">
                <h4>Selected Scope Specifications</h4>
                <ul className="spec-list">
                  <li><strong>Category:</strong> {selectedType.title}</li>
                  <li><strong>Architecture Complexity:</strong> {selectedComplexity.name} ({selectedComplexity.multiplier}x scale)</li>
                  <li><strong>Included Modules ({chosenReqObjects.length}):</strong> {chosenReqObjects.map(r => r.name).join(", ") || "Core foundation only"}</li>
                  <li><strong>Target Launch:</strong> {selectedTimeline}</li>
                </ul>
              </div>

              <div className="breakdown-card disclaimer">
                <h4><Info size={16} /> Important Assumptions</h4>
                <p>
                  This estimate represents an indicative baseline derived from standard engineering velocity and architectural requirements.
                  It is <strong>not a binding quotation</strong>. Final scopes, custom third-party integrations, and milestone commitments
                  are established through an architecture alignment session with our engineering team.
                </p>
              </div>
            </div>

            <div className="summary-actions">
              <button type="button" className="btn ghost" onClick={() => setStep(1)}>
                <RefreshCw size={14} /> Reconfigure Parameters
              </button>
              <button type="button" className="btn primary-cta" onClick={transferToEnquiry}>
                Transfer to Enquiry Form <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
