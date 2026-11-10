"use client";

import { useEffect, useState } from "react";
import { profile } from "@/app/content";
import ThemeToggle from "./ThemeToggle";

const sections = ["about", "work", "projects"] as const;

export default function Nav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section counts as active when it crosses the upper-middle of the viewport.
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav">
      <nav className="container nav-inner" aria-label="Primary">
        <a href="#top" className="nav-name">
          {profile.name.split(" ")[0].toLowerCase()}
        </a>
        <ul className="nav-links">
          {sections.map((id) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}>
                {id}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">
              resume ↓
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`}>email ↗</a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
