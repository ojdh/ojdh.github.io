// Single source of truth for identity + social links.
// Replaces the old Jekyll _config.yml / _data/contact.yml.

export const site = {
  name: 'Ojaswi Dhoubhadel',
  shortName: 'Ojaswi',
  // TODO: replace with your preferred public-facing tagline.
  tagline: 'Software & ML engineer, occasional photographer.',
  // TODO: 1-2 sentence intro shown in the hero.
  intro:
    'I build software and machine learning systems. Off the clock, I make photographs and write about what I learn.',
  email: 'ojaswi.365@gmail.com',
  url: 'https://ojdh.github.io',
  location: 'Edmonton, Canada',
} as const;

export type SocialLink = {
  label: string;
  href: string;
  // Inline SVG path data (24x24 viewBox) so we self-host icons, no CDN.
  icon: 'github' | 'linkedin' | 'email';
};

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/ojdh', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ojaswidhoubhadel',
    icon: 'linkedin',
  },
  { label: 'Email', href: `mailto:${site.email}`, icon: 'email' },
];

// Primary navigation, used by the header.
// Projects is hidden for now — re-add { label: 'Projects', href: '/projects' } to bring it back.
export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Photography', href: '/photography' },
  { label: 'Gear', href: '/gear' },
  { label: 'Blog', href: '/blog' },
];
