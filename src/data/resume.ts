// Single source of truth for editable site content. Update this file to change
// what appears on the homepage.

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
    pronouns?: string;
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
    name: 'Sepehr Behroozi',
    pronouns: 'he/him/his',
    role: 'Senior iOS Engineer',
    tagline:
      'Berlin-based iOS engineer working on mobile platform infrastructure and AI-assisted development at Delivery Hero.',
    photo: '/photo.jpg',
    contact: [
      { kind: 'github', href: 'https://github.com/sepbehroozi', label: 'GitHub' },
      { kind: 'linkedin', href: 'https://www.linkedin.com/in/sepbehroozi/', label: 'LinkedIn' },
    ],
  },
  about:
    "For the past four years I've been on the Mobile Infrastructure team at Delivery Hero, building the release automation, performance monitoring, and core frameworks (Networking, Configurations, Logging) used across Foodpanda, Foodora, and Yemeksepeti — three apps that share a codebase and serve 20M+ active users. Since 2025 I've been part of our AI Workgroup, helping shape how engineers use AI agents to develop, review code, and ship features to production.",
  experience: [
    {
      company: 'Delivery Hero SE',
      role: 'Senior iOS Engineer',
      location: 'Berlin, Germany',
      range: { start: '2021-02', end: 'present' },
      bullets: [
        'Mobile Infrastructure team responsible for release automation across Foodpanda, Foodora, and Yemeksepeti — three apps sharing a codebase and serving 20M+ active users.',
        'Monitor errors and configure automated alerts for spikes; track performance metrics like time-to-interactive and AppHangs to drive optimizations.',
        'Develop the foundational frameworks the apps are built on: Networking, Configurations, and Logging.',
        'Since 2025, part of the AI Workgroup shaping our AI-assisted development infrastructure so engineers can use AI agents to develop, review, and ship features to production.',
      ],
    },
    {
      company: 'Ayan Co.',
      role: 'Senior iOS Software Engineer',
      location: 'Tehran, Iran',
      range: { start: '2018-06', end: '2021-02' },
      bullets: [
        'Worked on iOS apps including Utility Bill Payment and Traffic Fine Inquiry.',
        'Lead engineer on the MyTehran iOS app — the official Tehran Municipality app — building several screens with SwiftUI alongside the existing Swift/UIKit codebase.',
        'Set up GitLab CI pipelines for automatic test execution at PR level and nightly app release candidates.',
      ],
    },
    {
      company: 'Alibaba.ir',
      role: 'iOS Software Engineer',
      location: 'Tehran, Iran',
      range: { start: '2019-10', end: '2019-12' },
      bullets: [
        'Part of a six-person iOS team on the Alibaba Itinerary app — flight, bus, and train ticket booking and itinerary management.',
        'Worked primarily in Swift and UIKit.',
      ],
    },
    {
      company: 'Asanbar.ir',
      role: 'Senior iOS Software Engineer',
      location: 'Tehran, Iran',
      range: { start: '2018-02', end: '2018-05' },
      bullets: [
        'Led the Asanbar Mobile team of four (two iOS, two Android) while working as the third iOS developer on the team.',
        'Asanbar was a freight booking platform pairing freight owners with truck and transit drivers; we shipped two distinct apps — one for owners, one for drivers.',
        'The driver app included real-time location sharing with the freight owner and on-map route calculation. Built in Swift and UIKit.',
      ],
    },
    {
      company: 'Dunro',
      role: 'iOS Software Engineer',
      location: 'Tehran, Iran',
      range: { start: '2016-05', end: '2018-02' },
      bullets: [
        'Local-business discovery app with check-ins, social interactions, and venue ratings/reviews.',
        'Worked across a Swift + UIKit codebase that still included some Objective-C from earlier iterations.',
      ],
    },
  ],
  education: [
    {
      institution: 'University of Zanjan',
      degree: 'B.Sc. in Computer Software Engineering',
      range: { start: '2011-02', end: '2016-01' },
      notes: 'Zanjan, Iran',
    },
  ],
  skillGroups: [
    { label: 'Languages', items: ['Swift', 'Objective-C'] },
    { label: 'iOS', items: ['SwiftUI', 'UIKit', 'Core Frameworks'] },
    { label: 'Workflow', items: ['Git', 'CI/CD', 'Test Automation', 'Agentic Development'] },
  ],
  resumePdf: '/resume.pdf',
};
