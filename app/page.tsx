import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ProcessScroll } from "@/components/process-scroll";
import { LogoMarquee } from "@/components/logo-marquee";
import { Capabilities } from "@/components/capabilities";
import { Work } from "@/components/work";
import { Testimonials } from "@/components/testimonials";
import { Stack } from "@/components/stack";
import { Team } from "@/components/team";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProcessScroll />
        <LogoMarquee />
        <Capabilities variant="brutalist" />
        <Work />
        <Testimonials />
        <Stack />
        {/* <Team /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
