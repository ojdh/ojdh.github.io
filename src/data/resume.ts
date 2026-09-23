// Structured resume content. Edit these objects to update the /resume page.

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
};

export type Education = {
  degree: string;
  school: string;
  period: string;
  detail?: string;
};

export type Certification = {
  name: string;
  period: string;
};

export const summary =
  'Senior Machine Learning Engineer with 4+ years shipping production NLP, LLM, and agentic AI systems, including five client AI systems built in the past year for government, engineering, industrial, and online-community clients. Takes agentic LLM applications from technical design to production: human-in-the-loop LangGraph pipelines, MCP tool servers, source-cited generation, and CI-gated evaluation. Earlier NLP work generated $1M+ in annual savings per deployment in healthcare and insurance. Deep hands-on experience across Azure, Databricks, and GCP, from self-hosted LLMs on multi-node GPU clusters to full-stack delivery.';

export const experience: Experience[] = [
  {
    role: 'Senior Machine Learning Developer',
    company: 'AltaML',
    period: 'Oct 2025 — Present',
    location: 'Edmonton, AB',
    bullets: [
      'Sole engineer, from technical design to release, on a rules-as-code eligibility engine for a provincial government: encoded 26 published regulatory rules as auditable predicates, traced every determination back to its source rule, streamed results in real time over SSE, and gated each release on an automated evaluation suite.',
      'Primary engineer on an agentic RFP-generation platform for an industrial services client that turns a scope of work into per-trade tender packages. Built a LangGraph pipeline with a human-in-the-loop estimator review and source-cited generation on FastAPI, async Postgres, and Next.js.',
      "Architected and led delivery of an AI report writer for an engineering consultancy. Authored the technical design, integrated document-extraction and document-generation services with an append-only provenance store, generated reports in the firm's branded Word templates, and shipped to staging, UAT, and production on Azure Container Apps with Entra ID authentication.",
      "Built four MCP servers on the company's proprietary agentic platform, spanning a data warehouse, forum read/write access, and a REST hub, with role-based access control. Added a ReAct investigation agent with citation guards and audit logging so LLM agents can triage spam and scams for an online community platform.",
      'Built evaluation and feedback loops into production LLM systems: user ratings sent to Arize as evals, AI-assisted section rewrites, and analysis of 300+ UAT user edits to pinpoint extraction errors. Profiled 33 production runs to find the source of slow requests, and made a specification matcher 18x faster with no change in output.',
      'Took an ML anomaly-detection pipeline to production for a government ministry on Databricks and Azure Functions, adding resilient session recovery, streamed queries, a scoring window narrowed from 12 to 4 months, and supervised evaluation orchestrated in LangGraph.',
      'Set engineering standards as technical reviewer across multiple client codebases, driving adoption of the shared platform, pre-deploy migration gates in CD, and parallel code review with AI agents.',
    ],
  },
  {
    role: 'Machine Learning Developer II',
    company: 'AltaML',
    period: 'May 2024 — Sept 2025',
    location: 'Edmonton, AB',
    bullets: [
      'Delivered end-to-end NLP systems generating $1M+ in annual operational savings per deployment across healthcare and insurance clients.',
      'Built scalable PySpark pipelines processing PDFs, images, and speech-to-text outputs, serving as the data foundation for downstream ML systems.',
      'Drove a 20% improvement in model accuracy through systematic feature engineering, dataset curation, and iterative experimentation.',
      'Led and mentored a 3-person team to deliver LLM-powered medical summarization systems into production, owning technical direction and stakeholder communication.',
    ],
  },
  {
    role: 'Machine Learning Developer',
    company: 'AltaML',
    period: 'May 2022 — Apr 2024',
    location: 'Edmonton, AB',
    bullets: [
      'Fine-tuned custom LLMs for configuration code generation and industrial narrative automation, reducing manual authoring time for domain-specific content.',
      'Developed ML and deep learning models for time-series forecasting and LiDAR point cloud classification across industrial and infrastructure clients.',
      'Delivered production solutions across Azure and GCP — adapting to client-mandated cloud environments while maintaining consistent delivery quality.',
    ],
  },
  {
    role: 'Client Solutions Engineer, EIT',
    company: 'Lifting Solutions Inc',
    period: 'Feb 2020 — Apr 2022',
    location: 'Edmonton, AB',
    bullets: [
      'Led preparation of technical and commercial proposals for international tenders for Oil and Gas equipment (Progressive Cavity Pumps and Endless Rods) across Oman, India, Australia, and Canada.',
      'Executed CAD $4M+ in orders within 2 years, standardizing project order execution processes across product lines.',
      'Collaborated with operations, marketing, supply chain, and executive stakeholders to solve business challenges during international expansion.',
    ],
  },
];

export const education: Education[] = [
  {
    degree: 'B.Sc., Mechanical Engineering Co-Op',
    school: 'University of Alberta, Edmonton, AB',
    period: 'Sept 2013 — Apr 2018',
    detail: 'GPA: 3.86/4.0',
  },
];

export const certifications: Certification[] = [
  { name: 'Microsoft Azure Data Scientist Associate', period: '2023 — Active' },
  { name: 'Google Cloud Professional Machine Learning Engineer', period: '2023 — Active' },
];

export const volunteer: Experience[] = [
  {
    role: 'Director',
    company: 'Edmonton Data Society',
    period: '2024 — Present',
    bullets: [
      "Led strategic planning and event programming for Edmonton's data science and ML practitioner community, fostering professional development and knowledge sharing across the local tech ecosystem.",
    ],
  },
];

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'PySpark', 'SQL'],
  },
  {
    title: 'LLM Ecosystem',
    items: [
      'Llama',
      'Mistral',
      'OpenAI API',
      'Anthropic API',
      'LangGraph',
      'MCP',
      'LiteLLM',
      'LangSmith',
      'Arize',
    ],
  },
  {
    title: 'ML & LLM Frameworks',
    items: ['Hugging Face Transformers', 'PyTorch', 'TensorFlow'],
  },
  {
    title: 'Architectures',
    items: ['RAG', 'Hybrid Search', 'Agentic Workflows', 'Human-in-the-Loop', 'Fine-Tuning', 'LLM Evaluation'],
  },
  {
    title: 'Web & Data',
    items: ['FastAPI', 'Next.js', 'Postgres', 'pgvector', 'SQLAlchemy', 'BigQuery', 'Playwright'],
  },
  {
    title: 'Infrastructure & MLOps',
    items: [
      'Databricks',
      'MLflow',
      'Docker',
      'Azure Container Apps',
      'Azure Functions',
      'Entra ID',
      'GitHub Actions',
      'GCP',
    ],
  },
];
