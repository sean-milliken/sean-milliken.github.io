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
  bio: "I'm a Computer Science major at the University of Pittsburgh, with a passion for technology.",
  current: { role: "Backend Developer", company: "Pitt Cloud Innovation Center" },
  about: [
    "Junior CS major at Pitt, and currently a Backend Developer for the Pitt AWS Cloud Innovation Center. I started coding in highschool and have been hooked on it ever since.",
    "Video games are what got me into coding initially, as I wanted to learn how games I loved playing were made behind the scenes. Now my technical interests include Distributed Systems, Cloud Computing, and Embedded Programming.",
    "In my free time I love watching movies, listening to music, playing video games, and playing poker"
  ],
  email: "seanpmilliken@gmail.com",
  linkedin: "https://www.linkedin.com/in/sean-milliken",
  github: "https://github.com/sean-milliken",
  resume: "/resume.pdf",
};

export const experience: Experience[] = [
  {
    company: "Pitt Cloud Innovation Center",
    role: "Backend Developer",
    start: "January 2026",
    end: "Present",
    blurb: "Developing Open Source solutions to real-world problems",
  },
  {
    company: "Dunwoody Village",
    role: "Information Technology Intern",
    start: "May 2025",
    end: "August 2025",
    blurb: "Assisted with daily IT operations and tech support",
  },
];

export const projects: Project[] = [
  {
    name: "PA Accreditation Manager",
    tagline: "AI-Powered Dashboard to help Universities manage their PA Accreditation status",
    url: "https://github.com/pitt-cic/PA-Accreditation-Manager",
  },
  {
    name: "Margin Guard",
    tagline: "Dashboard to help small businesses detect and mitigate supply chain disruptions",
    url: "https://github.com/sean-milliken/MarginGuard",
  },
];
