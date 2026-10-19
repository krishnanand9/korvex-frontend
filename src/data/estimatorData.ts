export interface ProjectTypeOption {
  id: string;
  title: string;
  description: string;
  baseMinUSD: number;
  baseMaxUSD: number;
  baseWeeks: number;
  recommendedCategory: string;
}

export interface FeatureOption {
  id: string;
  name: string;
  description: string;
  costImpactUSD: number;
  weekImpact: number;
}

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: "business-website",
    title: "Business Website",
    description: "High-performance marketing website with 3D elements, SEO optimization, and interactive enquiry capture.",
    baseMinUSD: 2500,
    baseMaxUSD: 5000,
    baseWeeks: 2,
    recommendedCategory: "Custom web application",
  },
  {
    id: "fullstack-web-app",
    title: "Full-Stack Web Application",
    description: "Dynamic web application with reactive frontend, custom backend API, and database persistence.",
    baseMinUSD: 5000,
    baseMaxUSD: 12000,
    baseWeeks: 4,
    recommendedCategory: "Custom web application",
  },
  {
    id: "ai-assistant-chatbot",
    title: "AI Assistant or Chatbot",
    description: "Task-oriented conversational assistant integrated with your knowledge base, database, or CRM.",
    baseMinUSD: 4000,
    baseMaxUSD: 9000,
    baseWeeks: 3,
    recommendedCategory: "AI assistant / LLM",
  },
  {
    id: "ai-rag-application",
    title: "AI / RAG Application",
    description: "Enterprise retrieval-augmented generation engine with vector database indexing and zero-hallucination guardrails.",
    baseMinUSD: 7000,
    baseMaxUSD: 16000,
    baseWeeks: 6,
    recommendedCategory: "RAG / document search",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "End-to-end event-driven pipeline connecting disparate SaaS platforms, custom webhooks, and queues.",
    baseMinUSD: 3000,
    baseMaxUSD: 8000,
    baseWeeks: 3,
    recommendedCategory: "Workflow automation",
  },
  {
    id: "saas-product",
    title: "SaaS Product / MVP",
    description: "Multi-tenant software with subscription billing, user authentication, and core domain features.",
    baseMinUSD: 8000,
    baseMaxUSD: 20000,
    baseWeeks: 8,
    recommendedCategory: "SaaS / MVP",
  },
  {
    id: "custom-software",
    title: "Custom Enterprise Software",
    description: "Bespoke operational system tailored to unique enterprise business logic and legacy integrations.",
    baseMinUSD: 10000,
    baseMaxUSD: 25000,
    baseWeeks: 10,
    recommendedCategory: "Custom web application",
  },
];

export const COMPLEXITY_LEVELS = [
  {
    id: "basic",
    name: "Basic",
    multiplier: 1.0,
    description: "Standard workflow, straightforward user flows, established design patterns.",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    multiplier: 1.35,
    description: "Multiple user roles, custom data models, moderate external integrations.",
  },
  {
    id: "advanced",
    name: "Advanced",
    multiplier: 1.8,
    description: "High concurrency, complex business rules, multi-service orchestration, strict SLA.",
  },
];

export const REQUIREMENT_OPTIONS: FeatureOption[] = [
  {
    id: "auth",
    name: "User Authentication & Roles",
    description: "Secure login, OAuth/SSO, password reset, and role-based access control.",
    costImpactUSD: 900,
    weekImpact: 1,
  },
  {
    id: "admin-dashboard",
    name: "Admin Management Dashboard",
    description: "Internal operations portal to view analytics, manage records, and export data.",
    costImpactUSD: 1400,
    weekImpact: 1.5,
  },
  {
    id: "payments",
    name: "Payment Gateway Integration",
    description: "Stripe/Razorpay subscription billing, one-off charges, and automated invoicing.",
    costImpactUSD: 1200,
    weekImpact: 1,
  },
  {
    id: "third-party-apis",
    name: "Third-Party API Integrations",
    description: "Connecting external CRMs, ERPs, email systems, and public data feeds.",
    costImpactUSD: 1100,
    weekImpact: 1,
  },
  {
    id: "ai-capabilities",
    name: "AI & Machine Learning Capabilities",
    description: "LLM completions, semantic vector retrieval, or intelligent data parsing.",
    costImpactUSD: 2200,
    weekImpact: 2,
  },
  {
    id: "realtime",
    name: "Real-Time / WebSocket Features",
    description: "Live collaborative updates, instant notifications, and reactive feeds.",
    costImpactUSD: 1300,
    weekImpact: 1,
  },
  {
    id: "responsive",
    name: "Mobile Responsive & PWA Support",
    description: "Optimized mobile viewports, touch controls, and offline-capable service workers.",
    costImpactUSD: 800,
    weekImpact: 0.5,
  },
  {
    id: "analytics",
    name: "Analytics & Telemetry Tracking",
    description: "Custom user behavior tracking, funnel conversion reporting, and error logging.",
    costImpactUSD: 600,
    weekImpact: 0.5,
  },
];

export const BUDGET_RANGES = [
  "Under $5,000 USD (or under 4 Lakh INR)",
  "$5,000 - $10,000 USD (4 - 8 Lakh INR)",
  "$10,000 - $20,000 USD (8 - 16 Lakh INR)",
  "$20,000 - $40,000 USD (16 - 32 Lakh INR)",
  "$40,000+ USD (Enterprise Scope)",
];

export const TIMELINE_OPTIONS = [
  "Immediate (Within 2–4 weeks)",
  "Standard (1–2 months)",
  "Quarterly (2–4 months)",
  "Flexible / Long-term roadmap",
];
