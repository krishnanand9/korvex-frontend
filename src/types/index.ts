export type ProjectCategory = "AI" | "Software" | "Automation" | "SaaS";

export type ProjectStatus = "Live" | "In development" | "Prototype" | "Case study";

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  blurb: string;
  fullDescription: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  architectureOverview: string;
  challenges: string;
  metrics?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  problem: string;
  solution: string;
  deliverables: string[];
  useCases: string[];
  techApproach: string;
  deliveryProcess: string[];
  icon: string;
  relatedProjects: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  summary: string;
  content: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  subtitle: string;
  badge: string;
  description: string;
  technologies: string[];
  protocols: string[];
  securityNotes: string;
  dataFlow: string;
}

export interface EnquiryPayload {
  name: string;
  email: string;
  company?: string;
  country: string;
  category: string;
  budget?: string;
  timeline?: string;
  description: string;
  consent: boolean;
  website?: string;
}

export interface EnquiryRecord extends EnquiryPayload {
  id: string;
  receivedAt: string;
  status: "new" | "reviewing" | "contacted" | "archived";
  analysis?: {
    mode: "llm" | "rules" | "fallback";
    summary: string;
    suggested_track: string;
    complexity: "low" | "medium" | "high";
    priority: "normal" | "high";
    follow_up_questions?: string[];
  };
  notes?: string;
  updatedAt?: string;
}

export interface EstimatorConfig {
  categories: {
    id: string;
    title: string;
    basePriceMin: number;
    basePriceMax: number;
    baseWeeks: number;
    description: string;
  }[];
  complexityMultipliers: {
    basic: { factor: number; label: string; desc: string };
    intermediate: { factor: number; label: string; desc: string };
    advanced: { factor: number; label: string; desc: string };
  };
  featureOptions: {
    id: string;
    name: string;
    priceImpact: number;
    weekImpact: number;
    description: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  mode?: "llm" | "rules" | "fallback";
}
