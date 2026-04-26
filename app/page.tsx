import Hero from "@/components/Hero";
import FloatingLogo from '@/components/FloatingLogo';
import WhoWeAre from "@/components/WhoWeAre";
import PlanesPromo from "@/components/PlanesPromo";
import BarberCarousel from "@/components/BarberCarousel";
import StylesShowcase from "@/components/StylesShowcase";
import GallerySection from "@/components/GallerySection";
import Contact from "@/components/Contact";
import FloatingBookingButton from "@/components/FloatingBookingButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { barbersData } from "@/data/barbers";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
     
      <WhoWeAre variant="preview" />
      <PlanesPromo />
      <BarberCarousel barbers={barbersData} />
       <StylesShowcase />
      {/*<GallerySection variant="preview" />*/}
      <Contact />
      <Footer />
      <FloatingBookingButton />
    </main>
  );
}
