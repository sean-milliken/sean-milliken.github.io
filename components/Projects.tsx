import { profile, projects } from "@/app/content";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-h">
      <h2 id="projects-h">projects</h2>
      <ol className="project-list">
        {projects.map((p, i) => (
          <li key={i} className="project-item">
            <span className="project-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}/
            </span>
            <div>
              <h3>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.name} <span aria-hidden="true">↗</span>
                </a>
              </h3>
              <p className="muted">{p.tagline}</p>
            </div>
          </li>
        ))}
      </ol>
      <p>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          more on GitHub ↗
        </a>
      </p>
    </section>
  );
}
