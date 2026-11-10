import { experience } from "@/app/content";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-h">
      <h2 id="work-h">work</h2>
      <ol className="work-list">
        {experience.map((job, i) => (
          <li key={i} className="work-item">
            <div className="work-head">
              <h3>
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <span className="muted dates">
                {job.start} – {job.end}
              </span>
            </div>
            <p className="role">{job.role}</p>
            <p className="muted">{job.blurb}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
