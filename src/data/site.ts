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
  tagline: 'UX Researcher · Augmented Reality & HCI',
  /** Meta description for search engines and link previews. */
  description:
    'Research page of Lucas Plabst — publications, projects, and background in human–computer interaction, augmented reality notifications, and safety-critical XR.',

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
    eyebrow: 'MeasuringU · Denver, Colorado',
  },

  /** Square image in /public/img/. Set to null to hide the portrait. */
  portrait: '/img/portrait.svg' as string | null,

  /** Small mono line under the portrait. Set either to null to hide. */
  location: 'Longmont, Colorado' as string | null,
  status: 'Open to collaborations' as string | null,

  /** Hero paragraphs. Each string is its own <p>. */
  intro: [
    'I am a UX researcher at <strong>MeasuringU</strong> in Denver, where I plan and moderate research sessions for Fortune 500 clients and turn what participants actually do into something their product teams can act on. Before that I completed a binational cotutelle doctorate in computer science at the <a href="https://www.uni-wuerzburg.de">University of Würzburg</a> and <a href="https://www.colostate.edu">Colorado State University</a>.',
    'My research is about notifications in augmented reality: when a headset should interrupt you, how the message ought to be presented, and what the interruption costs the task you were in the middle of. That question has taken me through patient monitoring for anaesthesiologists, AR-guided CPR with Cornell Tech, and cognitive load in VR assembly training for the Office of Naval Research.',
    'Underneath all of it is ten-plus years of building AR and VR software and eight years of qualitative, quantitative, and mixed-methods research — usually in that order, because I would rather prototype the study than argue about it. If any of this overlaps with what you are working on, send me a note.',
  ],

  /** Short mono chips under the intro. */
  interests: [
    'Augmented reality',
    'Notifications & interruptions',
    'User research',
    'Cognitive load',
    'Safety-critical HCI',
    'VR training',
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
    { label: 'Email', icon: 'mail' as SocialIcon, href: 'mailto:hello@lucasplabst.com' },
    {
      label: 'Scholar',
      icon: 'scholar' as SocialIcon,
      href: 'https://scholar.google.com/citations?user=BZbwH-kAAAAJ&hl=en',
    },
    { label: 'GitHub', icon: 'github' as SocialIcon, href: 'https://github.com/Radixtrator' },
    {
      label: 'LinkedIn',
      icon: 'linkedin' as SocialIcon,
      href: 'https://www.linkedin.com/in/lucasplabst',
    },
    { label: 'ORCID', icon: 'orcid' as SocialIcon, href: 'https://orcid.org/0000-0002-9656-1827' },
    // Drop the PDF at public/cv.pdf and uncomment.
    // { label: 'CV', icon: 'cv' as SocialIcon, href: '/cv.pdf' },
  ],

  /** Footer block. */
  contact: {
    email: 'hello@lucasplabst.com',
    address: ['Longmont, Colorado', 'United States'],
    signoff: 'Mail is answered slowly, but always answered.',
  },
} as const;
