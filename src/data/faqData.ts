export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Engineering" | "AI & Data" | "Engagement";
}

export const faqData: FAQItem[] = [
  {
    category: "General",
    question: "What makes Korvex Technologies different from typical software agencies?",
    answer: "We are engineer-led and architecture-first. Rather than selling cookie-cutter templates or exaggerated AI buzzwords, we engineer production-ready, custom software with strict type contracts, deterministic guardrails, and real business utility. We don't claim unverified client logos or fabricate vanity metrics.",
  },
  {
    category: "AI & Data",
    question: "How do you prevent AI assistants and RAG systems from hallucinating?",
    answer: "We enforce strict retrieval boundaries. In our RAG architectures, models are instructed to respond exclusively using cited passages from your verified vector index. If the knowledge corpus does not contain the answer, the model acknowledges the boundary rather than inventing responses. We also employ schema validation (Zod/Pydantic) to reject non-conforming responses.",
  },
  {
    category: "Engineering",
    question: "Who owns the intellectual property and source code?",
    answer: "You do. Upon project completion and milestone sign-off, full intellectual property, source code, deployment scripts, and architectural assets belong entirely to your company with no proprietary lock-in.",
  },
  {
    category: "Engagement",
    question: "How do preliminary estimates from the Project Estimator work?",
    answer: "The Smart Project Estimator generates an indicative scope and budget baseline based on historical engineering complexity. It serves as a transparent planning starting point. Official delivery agreements and milestones are formalized only after a technical alignment call where we review your specific integrations and requirements.",
  },
  {
    category: "Engineering",
    question: "What technology stack do you primarily build with?",
    answer: "Our core full-stack foundation comprises React 18 with TypeScript, Vite, Node.js/Express, Python/FastAPI for AI and data services, PostgreSQL, MongoDB, and Redis. We prioritize modern, strongly-typed, widely-supported technologies with active security ecosystems.",
  },
  {
    category: "Engagement",
    question: "How do you handle ongoing maintenance and support after launch?",
    answer: "We offer dedicated monthly maintenance agreements covering 24/7 uptime monitoring, dependency upgrades, database tuning, security patches, and incremental feature sprints. You have direct access to engineers who built the system.",
  },
  {
    category: "AI & Data",
    question: "Can our AI application integrate with our existing database and tools?",
    answer: "Yes. We specialize in building secure API bridges and ETL pipelines that safely ingest data from PostgreSQL, MongoDB, Salesforce, HubSpot, or internal REST APIs into dedicated vector stores without exposing your raw credentials.",
  },
];
