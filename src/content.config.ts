import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Publications. One markdown file per paper in src/content/publications/.
 * The markdown body (below the frontmatter) is optional — if present it
 * renders as a short abstract under the entry.
 *
 * A typo here fails the build with a clear message instead of silently
 * producing a broken page.
 */
const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    /** Full author list, in order. Your own name is bolded automatically. */
    authors: z.array(z.string()),
    /** Journal, conference, or workshop. */
    venue: z.string(),
    /**
     * Venue acronym (TVCG, VRST, CHI…). Shown on the generated tile when an
     * entry has no `thumb`, which reads far better than title initials.
     */
    short: z.string().optional(),
    /** Groups the entry under a year heading. */
    year: z.number().int(),
    /** Optional: "March", "Vol. 12, No. 3", etc. Shown next to the venue. */
    detail: z.string().optional(),
    /** Optional thumbnail in /public/img/. Falls back to a generated tile. */
    thumb: z.string().optional(),
    /** Buttons under the entry. */
    links: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .default([]),
    /** Optional badge, e.g. "Best Paper" or "Oral". */
    badge: z.string().optional(),
    /** Lower numbers sort first within a year. */
    order: z.number().default(0),
  }),
});

/**
 * Academic journey. One markdown file per position in src/content/journey/.
 * Rendered as a horizontally scrolling track.
 */
const journey = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journey' }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    /** Human-readable, e.g. "2023 — present". */
    period: z.string(),
    /** Used for sorting only. Newest first. */
    start: z.number().int(),
    /** Optional logo in /public/img/. Falls back to the org's initials. */
    logo: z.string().optional(),
    blurb: z.string().optional(),
  }),
});

export const collections = { publications, journey };
