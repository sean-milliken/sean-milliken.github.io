import { profile } from "@/app/content";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-h">
      <h2 id="about-h">about</h2>
      {profile.about.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  );
}
