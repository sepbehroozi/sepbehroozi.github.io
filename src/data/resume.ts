// Single source of truth for editable site content. Update this file to change
// what appears on the homepage.

export type ContactKind = 'github' | 'linkedin' | 'email';

export interface ContactLink {
  kind: ContactKind;
  href: string;
  label: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Stat {
  value: string;
  label: string;
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
    location: string;
    tagline: string;
    photo: string;
    contact: ContactLink[];
  };
  stats: Stat[];
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
    role: 'Senior iOS Software Engineer',
    location: 'Berlin, Germany',
    tagline:
      'I ship reliable iOS apps at scale — automating the release lifecycle, tracing performance regressions, and keeping crash-free rate high for tens of millions of monthly users.',
    photo: '/photo.jpg',
    contact: [
      { kind: 'email', href: 'mailto:sep.behroozi@gmail.com', label: 'Email' },
      { kind: 'github', href: 'https://github.com/sepbehroozi', label: 'GitHub' },
      { kind: 'linkedin', href: 'https://www.linkedin.com/in/sepehrbehroozi/', label: 'LinkedIn' },
    ],
  },
  stats: [
    { value: '10+', label: 'years iOS' },
    { value: '9', label: 'apps in release' },
    { value: '20M', label: 'monthly active users' },
    { value: '99.95%', label: 'crash-free users' },
    { value: 'weekly', label: 'release cadence' },
  ],
  about:
    "iOS engineer with 10+ years shipping and publishing apps at scale. At Delivery Hero I automate the release lifecycle for 9 apps serving ~20M monthly active users — moving the train from biweekly to weekly, raising crash-free users from 99.7% to 99.95%, and building the on-call and alerting infrastructure that keeps it that way. Several years deep in Swift, with solid hands-on Objective-C, and lately I've been shipping AI tooling that helps engineers develop, review, and ship faster.",
  experience: [
    {
      company: 'Delivery Hero SE',
      role: 'Senior iOS Software Engineer',
      location: 'Berlin, Germany',
      range: { start: '2021-02', end: 'present' },
      bullets: [
        'Automated the release flow for 9 apps shipping to ~20M monthly active users, taking the release train from biweekly to weekly using Fastlane, Bash, and Swift scripts on Bitrise.',
        'Lead engineer for error-monitoring standards and alerting; raised crash-free users from 99.7% to 99.95%.',
        'Established the 24/7 client on-call rotation for iOS and Android across verticals, built on that monitoring and alerting infrastructure.',
        'Drove the reduction of app-hang rate across domains, using CPU and Time Profiler, OSLog, and OSSignposter to measure and mitigate performance regressions.',
        'Shipped AI skills and MCP tooling for design-system migration, incident investigation, and PR review guidance.',
      ],
    },
    {
      company: 'Ayan Co.',
      role: 'Senior iOS Software Engineer',
      location: 'Tehran, Iran',
      range: { start: '2018-06', end: '2021-02' },
      bullets: [
        'Built payment applications including Ghabzino (utility bill payment inquiries) and Khalafi (traffic fine inquiry and payment).',
        'Lead developer for the iOS client of the MyTehran app.',
      ],
    },
    {
      company: 'Alibaba.ir',
      role: 'iOS Software Engineer',
      location: 'Tehran, Iran',
      range: { start: '2019-10', end: '2019-12' },
      bullets: [
        'Worked on the Alibaba online itinerary app — flight, bus, and train ticket booking and itinerary management.',
      ],
    },
    {
      company: 'Asanbar.ir',
      role: 'iOS Software Engineer',
      location: 'Tehran, Iran',
      range: { start: '2018-02', end: '2018-05' },
      bullets: [
        'Worked on a freight booking and tracking app pairing freight owners with truck and transit drivers.',
      ],
    },
    {
      company: 'Dunro',
      role: 'iOS Software Engineer',
      location: 'Tehran, Iran',
      range: { start: '2016-05', end: '2018-02' },
      bullets: [
        'Worked on a local business discovery and location-based social network app, with check-ins and venue ratings.',
      ],
    },
  ],
  education: [
    {
      institution: 'University of Zanjan',
      degree: 'B.Sc. in Computer Software Engineering',
      range: { start: '2010', end: '2015' },
      notes: 'Zanjan, Iran',
    },
  ],
  skillGroups: [
    { label: 'Languages', items: ['Swift', 'SwiftUI', 'Objective-C', 'Reactive Programming', 'Swift Concurrency'] },
    { label: 'Release & CI/CD', items: ['Fastlane', 'Bitrise', 'Bash', 'Multi-variant release automation'] },
    { label: 'Reliability', items: ['Error monitoring', 'Alerting', 'On-call design', 'Crash & app-hang reduction'] },
    { label: 'Performance', items: ['Xcode Instruments', 'CPU & Time Profiler', 'OSLog', 'OSSignposter'] },
    { label: 'Also', items: ['AI tooling & MCP', 'High-scale problem solving', 'Cross-team communication'] },
  ],
  resumePdf: '/resume.pdf',
};
