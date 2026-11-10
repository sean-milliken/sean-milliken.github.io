import { profile } from "@/app/content";

export default function Intro() {
  return (
    <section id="top" className="intro">
      <div className="intro-text">
        <h1>{profile.name}</h1>
        <p className="lede">{profile.bio}</p>
        <p className="current">
          <span className="muted">currently —</span> {profile.current.role} @{" "}
          <strong>{profile.current.company}</strong>
        </p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="headshot"
        src="/headshot.jpg"
        alt={`Portrait of ${profile.name}`}
        width={640}
        height={800}
      />
    </section>
  );
}
