import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Hobbies from "@/components/Hobbies";
import FocusAreas from "@/components/FocusAreas";
import Featured from "@/components/Featured";
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
        <Hobbies />
        <FocusAreas />
        <Featured />
        <LocalTime />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
