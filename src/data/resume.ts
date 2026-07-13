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
  'Senior Machine Learning Engineer with 4+ years delivering production NLP, LLM, and agentic AI systems in healthcare and insurance domains. Proven track record of building scalable ML pipelines, self-hosting open-source LLMs on multi-node GPU clusters, and driving measurable operational impact across cross-functional teams. Experienced across Azure, Databricks, and GCP environments with a strong foundation in distributed systems and end-to-end ML delivery.';

export const experience: Experience[] = [
  {
    role: 'Senior Machine Learning Developer',
    company: 'AltaML',
    period: 'Oct 2025 — Present',
    location: 'Edmonton, AB',
    bullets: [
      "Architected agentic AI workflows on the company's proprietary platform using LangGraph and MCP (Model Context Protocol), enabling LLM agents to autonomously orchestrate multi-step tasks across external APIs and services — reducing manual intervention in complex workflows.",
      'Owned backend integration for a client-facing community platform, designing OAuth2/JWT authentication flows, token lifecycle management, and user attribution across distributed service layers to meet enterprise security requirements.',
      'Applied distributed systems patterns — including Postgres-backed task queues, server-sent events, and idempotent write-back with human-in-the-loop checkpoints — to harden ML pipelines for production reliability.',
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
    items: ['Python', 'PySpark', 'SQL'],
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
      'LangSmith',
    ],
  },
  {
    title: 'ML & LLM Frameworks',
    items: ['Hugging Face Transformers', 'PyTorch', 'TensorFlow'],
  },
  {
    title: 'Architectures',
    items: ['RAG', 'Hybrid Search', 'Agentic Workflows', 'Fine-Tuning'],
  },
  {
    title: 'Infrastructure & MLOps',
    items: ['Databricks', 'MLflow', 'Docker', 'Azure', 'GCP'],
  },
];
