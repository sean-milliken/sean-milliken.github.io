// ─────────────────────────────────────────────────────────────
// All site content lives here. Search for "TODO" to find placeholders.
// ─────────────────────────────────────────────────────────────

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  blurb: string;
  url?: string;
};

export type Project = {
  name: string;
  tagline: string;
  url: string;
};

export const profile = {
  name: "Sean Milliken",
  bio: "TODO: One or two sentences about who you are and what you like to build.",
  current: { role: "TODO: Role", company: "TODO: Company" },
  about: [
    "TODO: A short paragraph about your background — school, major, what got you into this.",
    "TODO: A second paragraph about what you're interested in, or what you do outside of work.",
  ],
  email: "TODO@example.com",
  linkedin: "https://www.linkedin.com/in/TODO",
  github: "https://github.com/sean-milliken",
  resume: "/resume.pdf",
};

export const experience: Experience[] = [
  {
    company: "TODO: Company A",
    role: "TODO: Role title",
    start: "TODO",
    end: "Present",
    blurb: "TODO: One line on what you did or the team you were on.",
  },
  {
    company: "TODO: Company B",
    role: "TODO: Role title",
    start: "TODO",
    end: "TODO",
    blurb: "TODO: One line on what you did or the team you were on.",
  },
  {
    company: "TODO: Company C",
    role: "TODO: Role title",
    start: "TODO",
    end: "TODO",
    blurb: "TODO: One line on what you did or the team you were on.",
  },
];

export const projects: Project[] = [
  {
    name: "TODO: Project one",
    tagline: "TODO: What it is, in one line.",
    url: "https://github.com/sean-milliken",
  },
  {
    name: "TODO: Project two",
    tagline: "TODO: What it is, in one line.",
    url: "https://github.com/sean-milliken",
  },
  {
    name: "TODO: Project three",
    tagline: "TODO: What it is, in one line.",
    url: "https://github.com/sean-milliken",
  },
];
