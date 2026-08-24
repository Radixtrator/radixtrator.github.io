/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE FIRST.
 *  Everything that identifies you lives here. Publications and
 *  the academic journey live in src/content/ as separate files.
 * ─────────────────────────────────────────────────────────────
 */

export type SocialIcon =
  | 'mail'
  | 'scholar'
  | 'github'
  | 'linkedin'
  | 'orcid'
  | 'bluesky'
  | 'cv';

export const site = {
  /** Shown in the header and the browser tab. */
  name: 'Lucas Plabst',
  /** One line under your name. Keep it short. */
  tagline: 'PhD Candidate · Systems & Machine Learning',
  /** Meta description for search engines and link previews. */
  description:
    'Research page of Your Name — publications, projects, and academic background in distributed systems and machine learning.',

  /**
   * Your name exactly as it appears in author lists. Any author
   * string matching this is rendered bold automatically.
   */
  authorName: 'Lucas Plabst',

  /**
   * The full-screen opening panel. Set `enabled: false` to drop it and land
   * visitors straight on the about section.
   */
  splash: {
    enabled: true,
    /** Small mono line above your name. */
    eyebrow: 'Example University · Distributed Systems Group',
  },

  /** Square image in /public/img/. Set to null to hide the portrait. */
  portrait: '/img/portrait.svg' as string | null,

  /** Small mono line under the portrait. Set either to null to hide. */
  location: 'Boulder, Colorado' as string | null,
  status: 'Open to collaborations' as string | null,

  /** Hero paragraphs. Each string is its own <p>. */
  intro: [
    'I am a PhD candidate at <strong>Example University</strong>, working in the <a href="https://example.edu">Distributed Systems Group</a> on the boundary between large-scale systems and machine learning. Before that I was a research engineer at <strong>Example Lab</strong>, and I completed my MSc at <strong>Example Institute of Technology</strong>.',
    'My work asks how learned components behave once they leave the benchmark and enter a real system — where inputs drift, budgets are finite, and failure is not a number on a leaderboard. Lately that has meant scheduling under uncertainty, and making inference cheap enough to be boring.',
    'Away from the desk I climb badly, run slowly, and maintain an unreasonable number of half-finished side projects. If any of this overlaps with what you are working on, send me a note.',
  ],

  /** Short mono chips under the intro. */
  interests: [
    'Distributed systems',
    'Efficient inference',
    'Scheduling',
    'Systems for ML',
    'Reproducibility',
  ],

  /** In-page navigation. `href` must match a section id in index.astro. */
  nav: [
    { name: 'About', href: '#about' },
    { name: 'Publications', href: '#publications' },
    { name: 'Journey', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ],

  /** Icon row under the intro. Delete any line you do not need. */
  socials: [
    { label: 'Email', icon: 'mail' as SocialIcon, href: 'mailto:you@example.edu' },
    {
      label: 'Scholar',
      icon: 'scholar' as SocialIcon,
      href: 'https://scholar.google.com/citations?user=CHANGEME',
    },
    { label: 'GitHub', icon: 'github' as SocialIcon, href: 'https://github.com/yourusername' },
    {
      label: 'LinkedIn',
      icon: 'linkedin' as SocialIcon,
      href: 'https://www.linkedin.com/in/yourusername',
    },
    { label: 'ORCID', icon: 'orcid' as SocialIcon, href: 'https://orcid.org/0000-0000-0000-0000' },
    { label: 'CV', icon: 'cv' as SocialIcon, href: '/cv.pdf' },
  ],

  /** Footer block. */
  contact: {
    email: 'you@example.edu',
    address: [
      'Department of Computer Science',
      'Example University',
      '1234 Example Street, Boulder, CO 80301',
    ],
    signoff: 'Mail is answered slowly, but always answered.',
  },
} as const;
