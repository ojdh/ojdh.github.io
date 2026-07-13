// Structured resume content. Edit these objects to update the /resume page.
// All entries below are PLACEHOLDERS — replace with your real history.

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

export const summary =
  // TODO: replace with your professional summary.
  'Software and machine learning engineer with experience shipping data-driven products end to end — from model development to production deployment.';

export const experience: Experience[] = [
  {
    role: 'Machine Learning Engineer', // TODO
    company: 'AltaML', // TODO
    period: '2023 — Present', // TODO
    location: 'Edmonton, Canada',
    bullets: [
      'Placeholder bullet — describe a key accomplishment with measurable impact.',
      'Placeholder bullet — a technology or system you built and the outcome.',
    ],
  },
  {
    role: 'Previous Role', // TODO
    company: 'Previous Company', // TODO
    period: '2021 — 2023', // TODO
    bullets: [
      'Placeholder bullet — what you owned and delivered.',
      'Placeholder bullet — collaboration or leadership highlight.',
    ],
  },
];

export const education: Education[] = [
  {
    degree: 'B.Sc. in Computer Science', // TODO
    school: 'University Name', // TODO
    period: '2017 — 2021', // TODO
    detail: 'Optional: honours, focus area, or notable coursework.',
  },
];

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'SQL', 'Bash'], // TODO
  },
  {
    title: 'ML & Data',
    items: ['PyTorch', 'scikit-learn', 'pandas', 'MLflow'], // TODO
  },
  {
    title: 'Platform',
    items: ['Docker', 'GitHub Actions', 'Azure', 'PostgreSQL'], // TODO
  },
];
