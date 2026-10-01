import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Experience from "@/components/Experience";
import Hobbies from "@/components/Hobbies";
import FocusAreas from "@/components/FocusAreas";
import Featured from "@/components/Featured";
import Projects from "@/components/Projects";
import LocalTime from "@/components/LocalTime";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Journey />
        <Experience />
        <Hobbies />
        <FocusAreas />
        <Featured />
        <Projects />
        <LocalTime />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
