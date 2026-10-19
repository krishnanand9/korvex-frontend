// Unified data export with backwards compatibility
export * from "./data/servicesData";
export * from "./data/projectsData";
export * from "./data/articlesData";
export * from "./data/architectureData";
export * from "./data/estimatorData";
export * from "./data/faqData";

export const site = {
  name: "Korvex Technologies",
  tagline: "Engineered for What's Next.",
  email: "korvextechnologies73@gmail.com",
  brandPositioning: "Premium software engineering, Artificial Intelligence, workflow automation, cloud solutions, and digital products.",
  metaDescription: "Korvex Technologies engineers intelligent digital products, scalable custom software, and AI-powered solutions for ambitious businesses.",
};

export const steps = [
  "1. Understand & Scope",
  "2. Technical Architecture",
  "3. Interface & Workflow Design",
  "4. Agile Modular Build",
  "5. Security & QA Validation",
  "6. Production Cloud Deployment",
  "7. Proactive Support & Evolution",
];

export const categories = [
  "Custom web application",
  "SaaS / MVP",
  "AI assistant / LLM",
  "RAG / document search",
  "Workflow automation",
  "APIs & integrations",
  "Cloud infrastructure",
  "Maintenance & engineering support",
];

// Backwards compatibility aliases for existing components
import { servicesData } from "./data/servicesData";
import { projectsData } from "./data/projectsData";

export const services = servicesData.map(s => ({
  title: s.title,
  problem: s.problem,
  deliver: s.deliverables.join(", "),
  id: s.id,
}));

export const projects = projectsData.map(p => ({
  name: p.name,
  category: p.category,
  status: p.status,
  blurb: p.blurb,
  stack: p.stack,
  slug: p.slug,
}));
