import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Education from "@/sections/Education";
import Faq from "@/sections/Faq";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Offer from "@/sections/Offer";
import Protocol from "@/sections/Protocol";
import Services from "@/sections/Services";
import Symptoms from "@/sections/Symptoms";
import Vitals from "@/sections/Vitals";
import WhyMe from "@/sections/WhyMe";
import Work from "@/sections/Work";

export default function Page() {
  return (
    <>
      <Hero />
      <Vitals />
      <Symptoms />
      <WhyMe />
      <Services />
      <Work />
      <Protocol />
      <About />
      <Education />
      <Offer />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
