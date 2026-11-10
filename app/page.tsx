import Nav from "@/components/Nav";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import Info from "@/components/Info";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="container">
        <Intro />
        <About />
        <Work />
        <Projects />
        <Info />
      </main>
      <Footer />
    </>
  );
}
