import { profile } from "@/app/content";

export default function Info() {
  const links = [
    { label: "email", href: `mailto:${profile.email}`, text: profile.email, external: false },
    { label: "github", href: profile.github, text: profile.github.replace(/^https?:\/\//, ""), external: true },
    {
      label: "linkedin",
      href: profile.linkedin,
      text: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      external: true,
    },
  ];

  return (
    <section id="info" aria-labelledby="info-h">
      <h2 id="info-h">info</h2>
      <ul className="info-list">
        {links.map((l) => (
          <li key={l.label}>
            <span className="muted info-label">{l.label}</span>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                {l.text}
              </a>
            ) : (
              <a href={l.href}>{l.text}</a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
