// Single source of truth for editable site content. Update this file to change
// what appears on the homepage. Replace the placeholder content below with
// your real resume information before launch.

export type ContactKind = 'github' | 'linkedin';

export interface ContactLink {
  kind: ContactKind;
  href: string;
  label: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface DateRange {
  start: string; // 'YYYY' or 'YYYY-MM'
  end: string | 'present'; // 'YYYY' or 'YYYY-MM' or 'present'
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  range: DateRange;
  bullets: string[];
  links?: { label: string; href: string }[];
}

export interface Education {
  institution: string;
  degree: string;
  range: DateRange;
  notes?: string;
}

export interface Resume {
  identity: {
    name: string;
    role: string;
    tagline: string;
    photo: string;
    contact: ContactLink[];
  };
  about?: string;
  experience: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  resumePdf: string;
}

export const resume: Resume = {
  identity: {
    name: 'Sep Behroozi',
    role: 'Software Engineer',
    tagline:
      'I build mobile apps and developer tooling. Currently shipping iOS and Android apps under my own name.',
    photo: '/photo.jpg',
    contact: [
      { kind: 'github', href: 'https://github.com/sepbehroozi', label: 'GitHub' },
      { kind: 'linkedin', href: 'https://www.linkedin.com/in/sepbehroozi/', label: 'LinkedIn' },
    ],
  },
  about:
    'Replace this paragraph with a short narrative about yourself — a few sentences ' +
    'about what you focus on, what you care about in a team, and what you are working on now.',
  experience: [
    {
      company: 'Placeholder Co.',
      role: 'Senior Software Engineer',
      location: 'Remote',
      range: { start: '2023', end: 'present' },
      bullets: [
        'Replace with a real achievement-oriented bullet.',
        'Aim for outcomes and metrics where possible.',
      ],
    },
    {
      company: 'Earlier Co.',
      role: 'Software Engineer',
      range: { start: '2019', end: '2023' },
      bullets: ['Replace with another concrete achievement bullet.'],
    },
  ],
  education: [
    {
      institution: 'Your University',
      degree: 'B.Sc. in Computer Science',
      range: { start: '2015', end: '2019' },
    },
  ],
  skillGroups: [
    { label: 'Languages', items: ['Swift', 'Kotlin', 'TypeScript', 'Go'] },
    { label: 'Mobile', items: ['iOS / SwiftUI', 'Android / Jetpack Compose'] },
    { label: 'Backend & Tooling', items: ['Node.js', 'Postgres', 'Docker', 'GitHub Actions'] },
  ],
  resumePdf: '/resume.pdf',
};
